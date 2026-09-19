import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, AlertOctagon, MousePointer, FastForward, CheckCircle2 } from 'lucide-react';
import { ReplayEvent } from '../types';

interface SessionReplayPlayerProps {
  events: ReplayEvent[];
  sessionDurationSec: number;
}

export default function SessionReplayPlayer({ events, sessionDurationSec }: SessionReplayPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  const totalDurationMs = Math.max(
    sessionDurationSec * 1000,
    events.length > 0 ? events[events.length - 1].timestamp + 1000 : 5000
  );

  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lastTickRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }
      const delta = (now - lastTickRef.current) * playbackSpeed;
      lastTickRef.current = now;

      setCurrentTimeMs((prev) => {
        const next = prev + delta;
        if (next >= totalDurationMs) {
          setIsPlaying(false);
          return totalDurationMs;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDurationMs]);

  // Find latest active event at currentTimeMs
  const activeEvents = events.filter((e) => e.timestamp <= currentTimeMs);
  const latestEvent = activeEvents[activeEvents.length - 1] || events[0];

  // Mouse cursor coordinates interpolation
  const latestCursorEvent = [...activeEvents]
    .reverse()
    .find((e) => e.coords?.x !== undefined && e.coords?.y !== undefined);

  // Normalize cursor position to 0-100% relative to recorded viewport
  const viewportWidth = latestCursorEvent?.viewport?.width || 1280;
  const viewportHeight = latestCursorEvent?.viewport?.height || 800;
  
  const cursorX = latestCursorEvent?.coords
    ? Math.min(95, Math.max(5, (latestCursorEvent.coords.x / viewportWidth) * 100))
    : 50;
  const cursorY = latestCursorEvent?.coords
    ? Math.min(90, Math.max(10, (latestCursorEvent.coords.y / viewportHeight) * 100))
    : 45;

  const isRageClick = latestEvent?.type === 'rage_click';
  const isError = latestEvent?.type === 'error';

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMs = Number(e.target.value);
    setCurrentTimeMs(newMs);
    lastTickRef.current = null;
  };

  const jumpToEvent = (evt: ReplayEvent, index: number) => {
    setCurrentTimeMs(evt.timestamp);
    setSelectedEventIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white">
      
      {/* Visual Canvas / Virtual Screen Stage */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Simulated Session Viewport ({viewportWidth} × {viewportHeight})
          </span>
          <span>
            {formatTime(currentTimeMs)} / {formatTime(totalDurationMs)}
          </span>
        </div>

        {/* Stage Container */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-700/80 overflow-hidden shadow-inner flex flex-col justify-between p-4">
          
          {/* Simulated Browser Address Bar */}
          <div className="w-full bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] text-slate-300 border border-slate-700">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-400 font-mono text-[10px] truncate">
              https://infinityclubholidays.co.za
            </span>
          </div>

          {/* Center Stage: Simulated Page Content Skeleton */}
          <div className="relative flex-1 w-full mt-2 rounded-lg border border-dashed border-slate-800 p-3 flex flex-col justify-between overflow-hidden">
            
            {/* Mock website header & cards in replay */}
            <div className="space-y-2 opacity-30 select-none pointer-events-none">
              <div className="h-4 bg-slate-700 rounded w-1/3" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-14 bg-slate-800 rounded border border-slate-700" />
                <div className="h-14 bg-slate-800 rounded border border-slate-700" />
                <div className="h-14 bg-slate-800 rounded border border-slate-700" />
              </div>
            </div>

            {/* Visual Simulated Pointer / Cursor */}
            <div
              className="absolute pointer-events-none transition-all duration-150 ease-out z-20 flex flex-col items-start"
              style={{
                left: `${cursorX}%`,
                top: `${cursorY}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Cursor Arrow */}
              <div className="relative">
                <MousePointer className="w-5 h-5 text-purple-400 drop-shadow-[0_2px_8px_rgba(168,85,247,0.7)]" />

                {/* Click Ripple Effect */}
                {latestEvent?.type === 'click' && (
                  <span className="absolute -inset-2 rounded-full border-2 border-purple-400/80 animate-ping" />
                )}

                {/* Rage Click Pulsing Indicator */}
                {isRageClick && (
                  <div className="absolute -inset-4 rounded-full border-4 border-rose-500 bg-rose-500/20 animate-pulse flex items-center justify-center">
                    <span className="absolute -top-7 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wide bg-rose-600 text-white px-2 py-0.5 rounded shadow">
                      RAGE CLICK DETECTED!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom notification indicator inside the simulated viewport */}
            <div className="mt-auto">
              {isError && (
                <div className="p-2 rounded-lg bg-rose-950/90 border border-rose-600 text-rose-200 text-xs flex items-center gap-2 animate-bounce">
                  <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="truncate font-semibold">
                    {latestEvent?.message || 'JavaScript Exception Triggered'}
                  </span>
                </div>
              )}

              {isRageClick && (
                <div className="p-2 rounded-lg bg-amber-950/90 border border-amber-600 text-amber-200 text-xs flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate font-semibold">
                    {latestEvent?.message}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Current Event Overlay */}
          <div className="mt-2 text-[11px] text-slate-300 bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              {latestEvent?.type === 'rage_click' && <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
              {latestEvent?.type === 'error' && <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
              {latestEvent?.type === 'click' && <MousePointer className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
              <span className="font-mono text-slate-400">[{formatTime(latestEvent?.timestamp || 0)}]</span>
              <span className="truncate">{latestEvent?.message || 'User browsing'}</span>
            </div>
            {latestEvent?.target?.selector && (
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                {latestEvent.target.selector}
              </span>
            )}
          </div>
        </div>

        {/* Playback Controls Bar */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all active:scale-95 flex items-center justify-center shadow"
            aria-label={isPlaying ? 'Pause Replay' : 'Play Replay'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentTimeMs(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Restart Replay"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Scrubbable Scrubber */}
          <input
            type="range"
            min={0}
            max={totalDurationMs}
            value={currentTimeMs}
            onChange={handleSeek}
            className="flex-1 accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 text-[11px] font-bold">
            <FastForward className="w-3 h-3 text-slate-400 ml-1" />
            {([1, 2, 4] as const).map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-0.5 rounded ${
                  playbackSpeed === speed
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Timeline / Event Breadcrumb Log */}
      <div className="w-full lg:w-72 max-h-[380px] flex flex-col bg-slate-950 rounded-xl border border-slate-800 p-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
          <span>Interaction Breadcrumbs</span>
          <span className="text-slate-500 font-normal">{events.length} events</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 mt-2 pr-1 text-xs">
          {events.length === 0 ? (
            <div className="text-slate-500 text-center py-6">No interactions recorded yet.</div>
          ) : (
            events.map((evt, idx) => {
              const isEventActive = currentTimeMs >= evt.timestamp && (events[idx + 1] ? currentTimeMs < events[idx + 1].timestamp : true);
              const isFlaggedRage = evt.type === 'rage_click';
              const isEventError = evt.type === 'error';

              return (
                <button
                  key={evt.id || idx}
                  type="button"
                  onClick={() => jumpToEvent(evt, idx)}
                  className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2 border ${
                    isEventActive
                      ? 'bg-purple-950/70 border-purple-600 text-white shadow-sm'
                      : isFlaggedRage
                      ? 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                      : isEventError
                      ? 'bg-rose-950/60 border-rose-700 text-rose-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {isFlaggedRage && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                    {isEventError && <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />}
                    {evt.type === 'click' && <MousePointer className="w-3.5 h-3.5 text-purple-400" />}
                    {evt.type === 'navigation' && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    {evt.type === 'scroll' && <span className="w-3.5 h-3.5 text-[10px] text-slate-500">↕</span>}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                      <span className="font-mono">{formatTime(evt.timestamp)}</span>
                      {isFlaggedRage && (
                        <span className="text-[9px] font-bold text-rose-400 uppercase bg-rose-950 px-1 rounded">
                          UX Failure
                        </span>
                      )}
                    </div>
                    <p className="truncate font-medium text-[11px]">
                      {evt.message || evt.type}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
