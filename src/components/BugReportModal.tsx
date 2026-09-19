import { useState, useEffect } from 'react';
import { 
  X, 
  PlayCircle, 
  AlertTriangle, 
  Flame, 
  CheckCircle2, 
  MessageCircle, 
  Download, 
  Copy, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  Smartphone,
  Lock,
  Unlock,
  Mail,
  HelpCircle,
  Headphones,
  Code2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { observability } from '../services/observability';
import SessionReplayPlayer from './SessionReplayPlayer';
import { BugReport, TrackedError, RageClickIncident, ReplayEvent, DeveloperDossier } from '../types';
import { BUSINESS_INFO } from '../data/travelData';

const DEVELOPER_EMAIL = 'stuartlawrence176@gmail.com';

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDevMode?: boolean;
}

export default function BugReportModal({ isOpen, onClose, initialDevMode = false }: BugReportModalProps) {
  // Mode toggle: False = Client / Traveler Mode (friendly, clean, zero technical jargon)
  //              True  = Developer / Agency Mode (Stuart & Cathy: raw error codes, stack traces, replay, dossier)
  const [isDevMode, setIsDevMode] = useState(initialDevMode);
  const [activeDevTab, setActiveDevTab] = useState<'dossier' | 'replay' | 'errors' | 'simulate'>('dossier');
  
  // Telemetry state snapshot
  const [events, setEvents] = useState<ReplayEvent[]>([]);
  const [errors, setErrors] = useState<TrackedError[]>([]);
  const [rageClicks, setRageClicks] = useState<RageClickIncident[]>([]);
  const [sessionDuration, setSessionDuration] = useState(1);

  // Traveler form inputs
  const [issueCategory, setIssueCategory] = useState<BugReport['issueCategory']>('broken_button');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // Submission status
  const [submittedReport, setSubmittedReport] = useState<BugReport | null>(null);
  const [developerDossier, setDeveloperDossier] = useState<DeveloperDossier | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Check URL query for dev mode on mount or open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('dev') === 'true' || urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsDevMode(true);
      }
    }
  }, [isOpen]);

  // Keyboard shortcut (Ctrl+Shift+D or Alt+D) to toggle Developer / Agency Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) || (e.altKey && (e.key === 'D' || e.key === 'd'))) {
        e.preventDefault();
        setIsDevMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load telemetry when modal opens
  useEffect(() => {
    if (isOpen) {
      setEvents(observability.getReplayEvents());
      setErrors(observability.getErrors());
      setRageClicks(observability.getRageClicks());
      setSessionDuration(observability.getSessionDurationSec());
      setSubmittedReport(null);
      setDeveloperDossier(null);
      setCopiedStatus(null);
    }
  }, [isOpen]);

  // Subscribe to live changes while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = observability.subscribe(() => {
      setEvents(observability.getReplayEvents());
      setErrors(observability.getErrors());
      setRageClicks(observability.getRageClicks());
      setSessionDuration(observability.getSessionDurationSec());
    });
    return unsubscribe;
  }, [isOpen]);

  if (!isOpen) return null;

  // Primary error code calculation
  const primaryErrorCode = errors.length > 0 
    ? errors[0].errorCode 
    : rageClicks.length > 0 
    ? rageClicks[0].errorCode 
    : 'ERR_GENERAL_FEEDBACK';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // Generates the report with stealth code (e.g. ICH-E85-4B) and compiles developer dossier
    const report = observability.generateBugReport({
      description: description.trim(),
      issueCategory,
      userName: userName.trim() || undefined,
      userEmail: userEmail.trim() || undefined
    });

    const dossier = observability.generateDeveloperDossier(report);
    setSubmittedReport(report);
    setDeveloperDossier(dossier);
  };

  // Traveler WhatsApp Action: Sends clean, respectful, non-technical text with subtle tracking ref
  const sendTravelerWhatsApp = () => {
    const stealthRef = submittedReport?.stealthCode || `ICH-REF-${Date.now().toString(36).slice(-4).toUpperCase()}`;
    const friendlyCategory = {
      broken_button: 'a button/link was not responding',
      form_error: 'having trouble with a booking form',
      display_bug: 'a display issue on the page',
      slow_performance: 'the page loading slowly',
      other: 'a question or feedback'
    }[issueCategory] || 'an issue';

    const text = `Hi Cathy! I was on infinityclubholidays.co.za and noticed ${friendlyCategory}.\n\n*My Note:* ${description || 'Need assistance with holiday enquiry'}\n*My Name:* ${userName || 'Visitor'}${userEmail ? `\n*Contact:* ${userEmail}` : ''}\n\n_Reference: ${stealthRef}_`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Developer Email Action: Directly emails Stuart Lawrence with full technical diagnostics
  const emailDeveloperStuart = () => {
    const activeDossier = developerDossier || (submittedReport ? observability.generateDeveloperDossier(submittedReport) : null);
    const stealthRef = submittedReport?.stealthCode || 'ICH-DIAG-LIVE';
    const subject = `[INFINITY TECH ALERT] Error Code: ${primaryErrorCode} (Ref: ${stealthRef})`;

    const errorDetails = errors.map((e, idx) => `
[Error #${idx + 1}]
Code: ${e.errorCode} (${e.errorClassification})
Message: ${e.message}
Source: ${e.source || 'inline'}:${e.lineno || 0}:${e.colno || 0}
Stack:
${e.stack || 'No stack trace'}
`).join('\n');

    const rageDetails = rageClicks.map((r, idx) => `
[Rage Click #${idx + 1}]
Code: ${r.errorCode}
Taps: ${r.clickCount} in ${r.timeWindowMs}ms
Target: ${r.targetText || r.targetSelector || r.targetTag}
Coords: (${r.coords.x}, ${r.coords.y})
`).join('\n');

    const body = `INFINITY CLUB HOLIDAYS - TECHNICAL DIAGNOSTIC REPORT
Recipient: Stuart Lawrence <${DEVELOPER_EMAIL}>
Timestamp: ${new Date().toISOString()}
Ticket Ref: ${submittedReport?.id || 'LIVE-CAPTURE'}
Stealth Ref: ${stealthRef}
Primary Error Code: ${primaryErrorCode}

--- CLIENT/TRAVELER SUMMARY ---
Reporter: ${userName || 'Anonymous'} (${userEmail || 'No contact provided'})
Category: ${issueCategory}
Customer Description: ${description || 'Not provided'}

--- SYSTEM ENVIRONMENT ---
Device / User-Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
Screen Viewport: ${typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}
Online Status: ${typeof navigator !== 'undefined' && navigator.onLine ? 'Connected (Online)' : 'Offline'}
Session Duration: ${sessionDuration} seconds

--- DETECTED ERROR CODES & EXCEPTIONS (${errors.length}) ---
${errorDetails || 'No unhandled runtime script exceptions.'}

--- DETECTED RAGE CLICKS (${rageClicks.length}) ---
${rageDetails || 'No rage clicks detected in this session.'}

--- RECENT INTERACTION BREADCRUMBS (${events.length} total) ---
${events.slice(-15).map(e => `• [${Math.round(e.timestamp / 1000)}s] ${e.type.toUpperCase()}: ${e.message || e.target?.text || e.target?.selector || 'action'}`).join('\n')}

========================================
Confidential Developer Dossier for Stuart Lawrence
`;

    const mailtoUrl = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleDownloadDossier = () => {
    const payload = developerDossier || (submittedReport 
      ? observability.generateDeveloperDossier(submittedReport)
      : observability.generateDeveloperDossier(observability.generateBugReport({
          description: description || 'Direct developer snapshot download',
          issueCategory,
          userName,
          userEmail
        }))
    );
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `infinity-developer-dossier-${payload.ticketId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      id="bug-report-modal-overlay"
    >
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="bug-report-modal-container"
      >
        
        {/* ================================================================= */}
        {/* MODAL HEADER: DUAL PERSONA (Traveler View vs Developer View)      */}
        {/* ================================================================= */}
        {!isDevMode ? (
          /* TRAVELER / CLIENT-FACING HEADER (Clean, warm, reassuring) */
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 shadow-inner">
                <Headphones className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white">
                    Traveler Assistance & Feedback
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Cathy Lawrence Support
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Let us know if you experienced any difficulties while browsing holiday packages.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Discreet toggle to unlock developer console */}
              <button
                type="button"
                id="unlock-developer-view-btn"
                onClick={() => setIsDevMode(true)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs flex items-center gap-1"
                title="Developer & Agency Mode (Ctrl+Shift+D)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Agency</span>
              </button>

              <button
                type="button"
                id="close-support-modal-btn"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Close Support Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* DEVELOPER / AGENCY HEADER (Stuart & Cathy: Error Codes & Mission Control) */
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-purple-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/50 text-purple-300 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold font-mono text-purple-300">
                    Agency Diagnostic Console
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700 font-bold">
                    Recipient: {DEVELOPER_EMAIL}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    Primary: {primaryErrorCode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Her clients see only clean booking assistance. You and Cathy receive the error codes &amp; replay.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="return-traveler-view-btn"
                onClick={() => setIsDevMode(false)}
                className="px-2.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Switch to Client View"
              >
                <Unlock className="w-3.5 h-3.5 text-purple-300" />
                <span className="text-[11px] hidden sm:inline">Traveler View</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Close Diagnostic Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* DEVELOPER MODE STATUS & NAVIGATION TABS                            */}
        {/* (Only visible to Stuart / Agency, NEVER shown to travelers)       */}
        {/* ================================================================= */}
        {isDevMode && (
          <div className="bg-slate-950 text-slate-300 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono text-purple-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Flight Recorder: {events.length} actions
              </span>
              <span className="text-slate-700">|</span>
              <span className={`font-mono flex items-center gap-1 ${
                rageClicks.length > 0 ? 'text-rose-400 font-bold' : 'text-slate-500'
              }`}>
                <Flame className="w-3.5 h-3.5" />
                {rageClicks.length} Rage Clicks (ERR_RC_850)
              </span>
              <span className="text-slate-700">|</span>
              <span className={`font-mono flex items-center gap-1 ${
                errors.length > 0 ? 'text-rose-400 font-bold' : 'text-slate-500'
              }`}>
                <AlertTriangle className="w-3.5 h-3.5" />
                {errors.length} Exceptions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={emailDeveloperStuart}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition-colors flex items-center gap-1 shadow"
              >
                <Mail className="w-3 h-3" />
                <span>Email Stuart</span>
              </button>
            </div>
          </div>
        )}

        {isDevMode && (
          <div className="flex border-b border-slate-200 bg-slate-100 px-4 pt-2 gap-2 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveDevTab('dossier')}
              className={`px-3.5 py-2 font-bold rounded-t-xl transition-all border-b-2 ${
                activeDevTab === 'dossier'
                  ? 'bg-white text-purple-800 border-purple-600 shadow-sm'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              Error Codes &amp; Dossier
            </button>

            <button
              type="button"
              onClick={() => setActiveDevTab('replay')}
              className={`px-3.5 py-2 font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeDevTab === 'replay'
                  ? 'bg-white text-purple-800 border-purple-600 shadow-sm'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Session Replay Player ({events.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDevTab('errors')}
              className={`px-3.5 py-2 font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeDevTab === 'errors'
                  ? 'bg-white text-purple-800 border-purple-600 shadow-sm'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Stack Traces ({errors.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDevTab('simulate')}
              className={`px-3.5 py-2 font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeDevTab === 'simulate'
                  ? 'bg-white text-purple-800 border-purple-600 shadow-sm'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Test Simulator</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL BODY CONTENT                                                */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* ------------------------------------------------------------- */}
          {/* VIEW A: TRAVELER / CLIENT EXPERIENCE (Default)                */}
          {/* (Zero technical jargon, reassuring, smooth submission)        */}
          {/* ------------------------------------------------------------- */}
          {!isDevMode ? (
            <div>
              {submittedReport ? (
                /* SUCCESS CONFIRMATION FOR TRAVELER */
                <div className="p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-outfit">
                    Thank You, {submittedReport.userName || 'Valued Traveler'}!
                  </h4>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We&apos;ve received your message. Cathy Lawrence and our technical team have already been notified so you won&apos;t experience this issue again.
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Tracking Reference:</span>
                      {/* Harmless-looking stealth code that conceals the error code for Stuart */}
                      <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {submittedReport.stealthCode}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Assigned Agent:</span>
                      <span className="font-semibold text-slate-800">Cathy Lawrence (Infinity Club)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Status:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Transmitted to Technical Desk
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      id="traveler-whatsapp-btn"
                      onClick={sendTravelerWhatsApp}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with Cathy on WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* TRAVELER FORM */
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="traveler-issue-category" className="block text-xs font-bold text-slate-700 mb-1.5">
                      What can we help you with? *
                    </label>
                    <select
                      id="traveler-issue-category"
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value as any)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="broken_button">A button or booking link was not responding</option>
                      <option value="form_error">Having trouble with a booking form</option>
                      <option value="display_bug">The page looks misaligned or images won&apos;t load</option>
                      <option value="slow_performance">The page was loading slowly</option>
                      <option value="other">General question or feedback for Cathy</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="traveler-issue-desc" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Please tell us what happened *
                    </label>
                    <textarea
                      id="traveler-issue-desc"
                      required
                      rows={4}
                      placeholder="e.g. I was trying to view the Mauritius package details or submit a quotation request..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Name & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="traveler-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="traveler-name"
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="traveler-contact" className="block text-xs font-bold text-slate-700 mb-1.5">
                        WhatsApp or Email (for Cathy&apos;s reply)
                      </label>
                      <input
                        id="traveler-contact"
                        type="text"
                        placeholder="e.g. 082 123 4567 or email@domain.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Traveler Privacy & Safe Diagnostic Reassurance */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Privacy-Protected Technical Support</span>
                      <span className="text-[11px] text-slate-500">
                        An anonymous session reference is attached automatically so our developer can fix any glitch without collecting passwords or personal card details.
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      id="submit-support-ticket-btn"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>Send to Cathy &amp; Support Team</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      id="direct-whatsapp-cathy-btn"
                      onClick={sendTravelerWhatsApp}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                  </div>

                </form>
              )}
            </div>
          ) : (
            /* ------------------------------------------------------------- */
            /* VIEW B: DEVELOPER & AGENCY CONSOLE (Stuart & Cathy)           */
            /* Shows exact error codes, stack traces, replay, email Stuart   */
            /* ------------------------------------------------------------- */
            <div className="space-y-4">
              
              {/* TAB 1: DOSSIER & ERROR CODES */}
              {activeDevTab === 'dossier' && (
                <div className="space-y-4">
                  
                  {/* Executive Developer Alert Banner */}
                  <div className="p-4 rounded-2xl bg-purple-950 text-purple-100 border border-purple-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold uppercase font-mono">
                          {primaryErrorCode}
                        </span>
                        <span className="text-xs font-mono text-purple-300">
                          Stealth Ref: {submittedReport?.stealthCode || `ICH-E85-${Math.random().toString(36).slice(2, 5).toUpperCase()}`}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        Developer Incident Dossier Ready for Stuart Lawrence
                      </h4>
                      <p className="text-xs text-purple-300 mt-0.5">
                        Recipient: <strong className="text-white">{DEVELOPER_EMAIL}</strong> • Automatically recorded to local agency store.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        id="dev-email-stuart-btn"
                        onClick={emailDeveloperStuart}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email to Stuart</span>
                      </button>

                      <button
                        type="button"
                        id="dev-download-json-btn"
                        onClick={handleDownloadDossier}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export JSON</span>
                      </button>
                    </div>
                  </div>

                  {/* Error Taxonomy Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Error Code</span>
                      <div className="text-base font-mono font-extrabold text-rose-400 mt-0.5">
                        {primaryErrorCode}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {errors.length > 0 ? errors[0].errorClassification : 'UX_FAILURE_FLAGGED'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Rage Click Incidents</span>
                      <div className="text-base font-mono font-extrabold text-amber-400 mt-0.5 flex items-center gap-1.5">
                        <Flame className="w-4 h-4" />
                        <span>{rageClicks.length} Flagged</span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Code: ERR_RC_850
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Pre-Crash Replay Actions</span>
                      <div className="text-base font-mono font-extrabold text-purple-400 mt-0.5">
                        {events.length} Breadcrumbs
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Sliding Window: {sessionDuration}s duration
                      </span>
                    </div>
                  </div>

                  {/* Customer Information (if submitted) */}
                  {submittedReport && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="font-bold text-slate-900">Submitted Traveler Context:</div>
                      <div><strong>Name:</strong> {submittedReport.userName || 'Anonymous'}</div>
                      <div><strong>Contact:</strong> {submittedReport.userEmail || 'None provided'}</div>
                      <div><strong>Complaint:</strong> {submittedReport.description}</div>
                      <div><strong>Stealth Code (Customer sees):</strong> <code className="text-purple-700 font-bold">{submittedReport.stealthCode}</code></div>
                    </div>
                  )}

                  {/* Quick Copy Snippet for Stuart */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="font-mono text-slate-300 truncate">
                      <span className="text-slate-500">Diagnostic Hash: </span>
                      <span className="text-emerald-400">{primaryErrorCode}</span> | Ref: {submittedReport?.stealthCode || 'ICH-PENDING'} | Actions: {events.length}
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(JSON.stringify(developerDossier || observability.generateDeveloperDossier(observability.generateBugReport({
                        description: description || 'Copied from dossier tab',
                        issueCategory,
                        userName,
                        userEmail
                      })), null, 2), 'dossier')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-purple-400" />
                      <span>{copiedStatus === 'dossier' ? 'Copied JSON!' : 'Copy Dossier JSON'}</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: SESSION REPLAY */}
              {activeDevTab === 'replay' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
                    <p>
                      Visual reconstruction of cursor path, click coordinates, and rage clicks for debugging.
                    </p>
                    <span className="font-mono text-slate-500">
                      {events.length} recorded events
                    </span>
                  </div>

                  <SessionReplayPlayer 
                    events={events} 
                    sessionDurationSec={sessionDuration} 
                  />
                </div>
              )}

              {/* TAB 3: STACK TRACES & ERROR LOGS */}
              {activeDevTab === 'errors' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <p>
                      Runtime script errors, unhandled rejections, and console errors cross-referenced with timestamps.
                    </p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(JSON.stringify(errors, null, 2), 'errors')}
                      className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedStatus === 'errors' ? 'Copied!' : 'Copy Stack Traces'}</span>
                    </button>
                  </div>

                  {errors.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-slate-800">
                        Zero Unhandled Script Exceptions
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        No runtime script crashes occurred in this session.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {errors.map((err, i) => (
                        <div 
                          key={err.id || i}
                          className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-rose-900/60 font-mono text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-rose-400 font-bold flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              [{err.errorCode}] {err.errorClassification}
                            </span>
                            <span className="text-slate-500 text-[10px]">
                              +{Math.round(err.timestamp / 1000)}s into session
                            </span>
                          </div>

                          <div className="text-rose-300 font-bold text-xs break-all">
                            {err.message}
                          </div>

                          {err.source && (
                            <div className="text-slate-400 text-[11px]">
                              Source: {err.source}:{err.lineno}:{err.colno}
                            </div>
                          )}

                          {err.stack && (
                            <pre className="p-2.5 bg-slate-950 rounded-lg text-[10px] text-slate-400 overflow-x-auto whitespace-pre-wrap max-h-36">
                              {err.stack}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: TEST SIMULATOR */}
              {activeDevTab === 'simulate' && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <h4 className="text-sm font-bold text-slate-900 font-outfit">
                    Observability Test Harness
                  </h4>
                  <p className="text-slate-600">
                    Verify that rage click detection and runtime exception tracking assign error codes accurately.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 font-bold">
                        <Flame className="w-4 h-4" />
                        <span>Simulate Rage Click (ERR_RC_850)</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Fires 4 rapid clicks in &lt;350ms to test detection and the contextual toast.
                      </p>
                      <button
                        type="button"
                        id="test-fire-rage-click-btn"
                        onClick={() => {
                          observability.triggerSimulatedRageClick();
                          setActiveDevTab('dossier');
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Fire Simulated Rage Click</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center gap-2 text-amber-600 font-bold">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Simulate Runtime Error (ERR_RUNTIME_EX)</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Triggers a caught exception and attaches preceding replay breadcrumbs.
                      </p>
                      <button
                        type="button"
                        id="test-fire-runtime-error-btn"
                        onClick={() => {
                          observability.triggerSimulatedError();
                          setActiveDevTab('errors');
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Fire Simulated Error</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ================================================================= */}
        {/* MODAL FOOTER                                                      */}
        {/* ================================================================= */}
        <div className="bg-slate-100 p-3.5 sm:p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-[11px]">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            <span>Screen: {typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : '1280x800'}</span>
            <span className="text-slate-300">|</span>
            <span>Agency Ref: <strong className="text-slate-700">{submittedReport?.stealthCode || 'ICH-LIVE'}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {!isDevMode ? (
              <button
                type="button"
                id="footer-agency-toggle-btn"
                onClick={() => setIsDevMode(true)}
                className="text-slate-400 hover:text-purple-700 text-[11px] underline transition-colors flex items-center gap-1"
                title="Agency / Developer Console (Ctrl+Shift+D)"
              >
                <Lock className="w-3 h-3" />
                <span>Agency View</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsDevMode(false)}
                className="text-purple-700 hover:underline text-[11px] font-bold"
              >
                Exit Agency View
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
