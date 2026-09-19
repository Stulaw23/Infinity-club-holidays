import { ReplayEvent, TrackedError, RageClickIncident, BugReport } from '../types';

// Constants
const MAX_REPLAY_EVENTS = 150;
const RAGE_CLICK_WINDOW_MS = 850;
const RAGE_CLICK_THRESHOLD = 3;
const RAGE_CLICK_RADIUS_PX = 40;
const STORAGE_KEY_REPORTS = 'infinity_club_bug_reports';

type ObservabilitySubscriber = (data: {
  type: 'error' | 'rage_click' | 'event';
  error?: TrackedError;
  rageClick?: RageClickIncident;
  event?: ReplayEvent;
}) => void;

class ObservabilityService {
  private sessionStartTime: number = Date.now();
  private events: ReplayEvent[] = [];
  private errors: TrackedError[] = [];
  private rageClicks: RageClickIncident[] = [];
  private recentClicks: Array<{ time: number; x: number; y: number; element: HTMLElement }> = [];
  private subscribers: Set<ObservabilitySubscriber> = new Set();
  private isInitialized = false;
  private lastRageAlertTime = 0;

  constructor() {
    // Will initialize on first client load
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.sessionStartTime = Date.now();

    // 1. Listen for user interactions (Session Replay Engine)
    this.attachInteractionListeners();

    // 2. Listen for runtime errors & unhandled rejections
    this.attachErrorListeners();

    // 3. Monitor console.error
    this.attachConsoleInterceptors();

    // Record initial session start event
    this.recordEvent({
      id: `evt-${Date.now()}-init`,
      timestamp: 0,
      type: 'navigation',
      data: {
        url: window.location.href,
        referrer: document.referrer || 'direct',
        screen: `${window.innerWidth}x${window.innerHeight}`
      },
      message: 'Session recording started'
    });
  }

  // Subscribe to live telemetry
  public subscribe(subscriber: ObservabilitySubscriber) {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  private notify(payload: Parameters<ObservabilitySubscriber>[0]) {
    this.subscribers.forEach((fn) => {
      try {
        fn(payload);
      } catch (err) {
        console.warn('Observability subscriber error:', err);
      }
    });
  }

  // ----------------------------------------------------
  // 1. SESSION REPLAY RECORDING
  // ----------------------------------------------------
  public recordEvent(event: ReplayEvent) {
    this.events.push(event);
    if (this.events.length > MAX_REPLAY_EVENTS) {
      this.events.shift();
    }
    this.notify({ type: 'event', event });
  }

  public getSessionDurationSec(): number {
    return Math.max(1, Math.round((Date.now() - this.sessionStartTime) / 1000));
  }

  public getReplayEvents(): ReplayEvent[] {
    return [...this.events];
  }

  public getErrors(): TrackedError[] {
    return [...this.errors];
  }

  public getRageClicks(): RageClickIncident[] {
    return [...this.rageClicks];
  }

  private getElementDescriptor(el: HTMLElement | null): ReplayEvent['target'] | undefined {
    if (!el) return undefined;
    const tag = el.tagName ? el.tagName.toLowerCase() : 'unknown';
    const id = el.id || undefined;
    const className = el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : undefined;
    
    // Sanitize and mask text if it appears to be sensitive input
    let text = el.innerText || el.textContent || '';
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.type === 'password' || el.name?.includes('password')) {
        text = '••••••••';
      } else if (el.value) {
        // Redact email or phone details to protect PII
        text = el.value.length > 20 ? `${el.value.slice(0, 10)}... (masked)` : el.value;
      }
    } else {
      text = text.trim().slice(0, 60);
    }

    // Build a readable CSS selector
    let selector = tag;
    if (id) selector += `#${id}`;
    else if (className) {
      const firstClass = className.split(' ')[0];
      if (firstClass) selector += `.${firstClass}`;
    }

    return {
      tag,
      id,
      className,
      text: text || undefined,
      role: el.getAttribute('role') || undefined,
      selector
    };
  }

  private attachInteractionListeners() {
    // Click events + Rage click detection
    window.addEventListener('click', (e: MouseEvent) => {
      const target = (e.target as HTMLElement) || document.body;
      const now = Date.now();
      const x = e.clientX;
      const y = e.clientY;
      const relativeTime = now - this.sessionStartTime;

      // Normal click event
      const targetDesc = this.getElementDescriptor(target);
      const replayEvent: ReplayEvent = {
        id: `click-${now}`,
        timestamp: relativeTime,
        type: 'click',
        coords: { x, y },
        viewport: { width: window.innerWidth, height: window.innerHeight },
        target: targetDesc,
        message: `Click on <${targetDesc?.tag || 'element'}>: "${targetDesc?.text || targetDesc?.id || 'unlabeled'}"`
      };
      this.recordEvent(replayEvent);

      // Check for Rage Clicks
      this.evaluateRageClick(now, x, y, target, targetDesc);
    }, { capture: true, passive: true });

    // Throttled scroll listener
    let scrollTimeout: any = null;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        const now = Date.now();
        this.recordEvent({
          id: `scroll-${now}`,
          timestamp: now - this.sessionStartTime,
          type: 'scroll',
          scrollPos: { x: window.scrollX, y: window.scrollY },
          viewport: { width: window.innerWidth, height: window.innerHeight },
          message: `Scrolled to vertical offset ${Math.round(window.scrollY)}px`
        });
      }, 400);
    }, { passive: true });

    // Navigation & Hash changes
    window.addEventListener('hashchange', () => {
      const now = Date.now();
      this.recordEvent({
        id: `nav-${now}`,
        timestamp: now - this.sessionStartTime,
        type: 'navigation',
        data: { hash: window.location.hash },
        message: `Navigated to section: ${window.location.hash || 'home'}`
      });
    });
  }

  // ----------------------------------------------------
  // 2. RAGE CLICK DETECTION & UX FAILURE FLAGGING
  // ----------------------------------------------------
  private evaluateRageClick(
    now: number,
    x: number,
    y: number,
    target: HTMLElement,
    targetDesc: ReplayEvent['target'] | undefined
  ) {
    // Keep clicks only within the sliding time window
    this.recentClicks.push({ time: now, x, y, element: target });
    this.recentClicks = this.recentClicks.filter(
      (c) => now - c.time <= RAGE_CLICK_WINDOW_MS
    );

    // Group clicks targeting the same element or within proximity radius
    const cluster = this.recentClicks.filter((c) => {
      const sameElement = c.element === target || c.element.contains(target) || target.contains(c.element);
      const distance = Math.hypot(c.x - x, c.y - y);
      return sameElement || distance <= RAGE_CLICK_RADIUS_PX;
    });

    if (cluster.length >= RAGE_CLICK_THRESHOLD) {
      // Avoid firing duplicate alerts within 2.5 seconds for the same cluster
      if (now - this.lastRageAlertTime < 2500) return;
      this.lastRageAlertTime = now;

      const incident: RageClickIncident = {
        id: `rage-${now}`,
        timestamp: now - this.sessionStartTime,
        errorCode: 'ERR_RC_850',
        clickCount: cluster.length,
        timeWindowMs: RAGE_CLICK_WINDOW_MS,
        coords: { x, y },
        targetTag: targetDesc?.tag || target.tagName.toLowerCase(),
        targetText: targetDesc?.text,
        targetSelector: targetDesc?.selector,
        flaggedAsUXFailure: true
      };

      this.rageClicks.push(incident);

      // Record high-priority UX Failure Replay Event
      const rageEvent: ReplayEvent = {
        id: `rage-evt-${now}`,
        timestamp: now - this.sessionStartTime,
        type: 'rage_click',
        coords: { x, y },
        target: targetDesc,
        data: {
          errorCode: 'ERR_RC_850',
          clickCount: cluster.length,
          timeWindow: `${RAGE_CLICK_WINDOW_MS}ms`,
          status: 'UX_FAILURE_FLAGGED'
        },
        message: `⚠️ RAGE CLICK [ERR_RC_850]: User tapped ${cluster.length} times in ${RAGE_CLICK_WINDOW_MS}ms on "${targetDesc?.text || targetDesc?.selector || target.tagName}"`
      };

      this.recordEvent(rageEvent);
      this.notify({ type: 'rage_click', rageClick: incident, event: rageEvent });

      // Clear the cluster to avoid immediate re-trigger
      this.recentClicks = [];
    }
  }

  // ----------------------------------------------------
  // 3. ERROR TRACKING CONNECTED TO REPLAY
  // ----------------------------------------------------
  private attachErrorListeners() {
    window.addEventListener('error', (event: ErrorEvent) => {
      this.trackError({
        message: event.message || 'Unknown runtime script error',
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        type: 'runtime'
      });
    });

    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      let msg = 'Unhandled Promise Rejection';
      let stack: string | undefined;

      if (event.reason instanceof Error) {
        msg = event.reason.message;
        stack = event.reason.stack;
      } else if (typeof event.reason === 'string') {
        msg = event.reason;
      }

      this.trackError({
        message: msg,
        stack,
        type: 'unhandled_rejection'
      });
    });
  }

  private attachConsoleInterceptors() {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      try {
        const message = args
          .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
          .join(' ');
        
        // Avoid capturing our own internal logs
        if (!message.includes('[Observability]')) {
          this.trackError({
            message: message.slice(0, 300),
            type: 'console_error'
          });
        }
      } catch (e) {
        // Safe failover
      }
      originalConsoleError.apply(console, args);
    };
  }

  public trackError(details: {
    message: string;
    source?: string;
    lineno?: number;
    colno?: number;
    stack?: string;
    type: TrackedError['type'];
  }): TrackedError {
    const now = Date.now();
    const relativeTime = now - this.sessionStartTime;

    // Classify error and assign standardized Error Code
    let errorCode = 'ERR_RUNTIME_EX';
    let errorClassification: TrackedError['errorClassification'] = 'CRITICAL_SCRIPT_EXCEPTION';

    const msgLower = (details.message || '').toLowerCase();
    if (details.type === 'unhandled_rejection') {
      errorCode = 'ERR_PROMISE_REJ';
      errorClassification = 'UNHANDLED_ASYNC_REJECTION';
    } else if (details.type === 'console_error') {
      errorCode = 'ERR_CONSOLE_WARN';
      errorClassification = 'CONSOLE_LOGGED_ERROR';
    } else if (msgLower.includes('network') || msgLower.includes('offline') || (typeof navigator !== 'undefined' && !navigator.onLine)) {
      errorCode = 'ERR_NETWORK_DISRUPT';
      errorClassification = 'NETWORK_DISRUPTION';
    } else if (msgLower.includes('typeerror') || msgLower.includes('undefined') || msgLower.includes('null')) {
      errorCode = 'ERR_TYPE_UNCAUGHT';
      errorClassification = 'CRITICAL_SCRIPT_EXCEPTION';
    } else if (msgLower.includes('image') || msgLower.includes('404')) {
      errorCode = 'ERR_ASSET_404';
      errorClassification = 'IMAGE_LOAD_FAILURE';
    }

    const errorItem: TrackedError = {
      id: `err-${now}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: relativeTime,
      errorCode,
      errorClassification,
      message: details.message,
      source: details.source,
      lineno: details.lineno,
      colno: details.colno,
      stack: details.stack,
      type: details.type,
      associatedReplayEventsCount: this.events.length,
      sessionSnapshotId: `snap-${now}`
    };

    this.errors.push(errorItem);

    // Record an error event directly in the replay sequence!
    const errorReplayEvent: ReplayEvent = {
      id: `err-evt-${now}`,
      timestamp: relativeTime,
      type: 'error',
      message: `🚨 [${errorCode}] ${details.message}`,
      data: {
        errorCode,
        classification: errorClassification,
        type: details.type,
        stack: details.stack?.slice(0, 300)
      }
    };

    this.recordEvent(errorReplayEvent);
    this.notify({ type: 'error', error: errorItem, event: errorReplayEvent });

    return errorItem;
  }

  // ----------------------------------------------------
  // 4. BUG REPORT GENERATION, STEALTH CODES & DOSSIERS
  // ----------------------------------------------------
  public generateBugReport(params: {
    description: string;
    issueCategory: BugReport['issueCategory'];
    userName?: string;
    userEmail?: string;
  }): BugReport {
    // Compile error codes
    const allErrorCodesSet = new Set<string>();
    this.errors.forEach((e) => allErrorCodesSet.add(e.errorCode));
    this.rageClicks.forEach((r) => allErrorCodesSet.add(r.errorCode));

    if (allErrorCodesSet.size === 0) {
      allErrorCodesSet.add(`ERR_USER_${params.issueCategory.toUpperCase()}`);
    }

    const allErrorCodes = Array.from(allErrorCodesSet);
    const primaryErrorCode = allErrorCodes[0] || 'ERR_GENERAL_INQUIRY';

    // Generate innocent-looking stealth code for the client's travelers
    // e.g. "ICH-E85-7B" (where E85 stands for ERR_RC_850, completely disguised as a booking tracking code)
    const codeTag = primaryErrorCode.replace('ERR_', '').slice(0, 3).toUpperCase();
    const hash = Math.random().toString(36).slice(2, 5).toUpperCase();
    const stealthCode = `ICH-${codeTag}-${hash}`;

    const report: BugReport = {
      id: `BUG-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      stealthCode,
      primaryErrorCode,
      allErrorCodes,
      userName: params.userName || undefined,
      userEmail: params.userEmail || undefined,
      description: params.description,
      issueCategory: params.issueCategory,
      deviceInfo: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        viewport: { width: window.innerWidth, height: window.innerHeight },
        platform: typeof navigator !== 'undefined' ? (navigator as any).platform || 'web' : 'web',
        language: typeof navigator !== 'undefined' ? navigator.language : 'en',
        online: typeof navigator !== 'undefined' ? navigator.onLine : true
      },
      sessionDurationSec: this.getSessionDurationSec(),
      rageClicks: [...this.rageClicks],
      errors: [...this.errors],
      events: [...this.events],
      status: 'open'
    };

    this.saveBugReport(report);

    // Auto-compile and silently record developer dossier for Stuart
    const dossier = this.generateDeveloperDossier(report);
    this.dispatchToDeveloperSilent(dossier);

    return report;
  }

  public generateDeveloperDossier(report: BugReport) {
    return {
      ticketId: report.id,
      timestamp: report.createdAt,
      stealthCode: report.stealthCode,
      primaryErrorCode: report.primaryErrorCode,
      allErrorCodes: report.allErrorCodes,
      travelerName: report.userName,
      travelerContact: report.userEmail,
      travelerComplaint: report.description,
      developerRecipient: 'stuartlawrence176@gmail.com',
      systemDiagnostics: {
        device: report.deviceInfo.userAgent,
        viewport: `${report.deviceInfo.viewport.width}x${report.deviceInfo.viewport.height}`,
        online: report.deviceInfo.online,
        sessionDurationSec: report.sessionDurationSec,
        language: report.deviceInfo.language
      },
      rageClickCount: report.rageClicks.length,
      rageClickTargets: report.rageClicks.map((r) => r.targetText || r.targetSelector || r.targetTag),
      errors: report.errors.map((e) => ({
        code: e.errorCode,
        type: e.type,
        message: e.message,
        source: e.source ? `${e.source}:${e.lineno || 0}:${e.colno || 0}` : undefined,
        stack: e.stack
      })),
      replayBreadcrumbs: report.events.slice(-30).map((evt) => ({
        timeSec: Math.round(evt.timestamp / 1000),
        action: evt.type,
        target: evt.target?.text || evt.target?.selector || evt.message
      }))
    };
  }

  public dispatchToDeveloperSilent(dossier: any) {
    try {
      const STORAGE_KEY_DOSSIERS = 'infinity_club_developer_dossiers';
      const existingRaw = localStorage.getItem(STORAGE_KEY_DOSSIERS);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [dossier, ...existing].slice(0, 50);
      localStorage.setItem(STORAGE_KEY_DOSSIERS, JSON.stringify(updated));

      // Also attach to window object for developer console inspection
      if (typeof window !== 'undefined') {
        (window as any).__INFINITY_LATEST_DEV_DOSSIER__ = dossier;
        (window as any).__INFINITY_DEV_DOSSIERS__ = updated;
      }

      // Silent background beacon / fetch attempt (fails gracefully without error alert)
      if (typeof fetch !== 'undefined') {
        fetch('/api/telemetry/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dossier),
          keepalive: true
        }).catch(() => {
          // Expected in static preview, silently handled
        });
      }
    } catch (e) {
      // Never disrupt user experience
    }
  }

  public getDeveloperDossiers(): any[] {
    try {
      const raw = localStorage.getItem('infinity_club_developer_dossiers');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return [];
  }

  public saveBugReport(report: BugReport) {
    try {
      const existing = this.getSavedBugReports();
      const updated = [report, ...existing].slice(0, 30);
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist bug report in localStorage', e);
    }
  }

  public getSavedBugReports(): BugReport[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      // ignore
    }
    return [];
  }

  // Simulation helpers for testing the UX
  public triggerSimulatedRageClick() {
    const now = Date.now();
    const mockTarget = document.querySelector('button') || document.body;
    const targetDesc = this.getElementDescriptor(mockTarget as HTMLElement);
    
    // Push 4 simulated rapid clicks
    for (let i = 0; i < 4; i++) {
      this.recordEvent({
        id: `mock-click-${now}-${i}`,
        timestamp: (now - this.sessionStartTime) + (i * 80),
        type: 'click',
        coords: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        target: targetDesc,
        message: `Rapid click ${i + 1} on "${targetDesc?.text || 'Submit Button'}"`
      });
    }

    this.evaluateRageClick(
      now + 350,
      window.innerWidth / 2,
      window.innerHeight / 2,
      mockTarget as HTMLElement,
      targetDesc
    );
  }

  public triggerSimulatedError() {
    try {
      // Intentionally cause an error
      throw new Error('Simulated Payment Gateway Timeout: Failed to resolve booking inventory lock');
    } catch (err: any) {
      this.trackError({
        message: err.message,
        stack: err.stack,
        type: 'runtime'
      });
    }
  }
}

// Global Singleton
export const observability = new ObservabilityService();
