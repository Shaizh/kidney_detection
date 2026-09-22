import React, { useState } from 'react';
import { Eye, Crosshair, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { SaliencyHighlight } from '../types';

interface ScanViewerProps {
  imageUrl: string;
  imageName: string;
  saliencyHighlights?: SaliencyHighlight[];
  isKidney?: boolean;
}

export const ScanViewer: React.FC<ScanViewerProps> = ({
  imageUrl,
  imageName,
  saliencyHighlights = [],
  isKidney = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [showOverlays, setShowOverlays] = useState(true);
  const [showCrosshairs, setShowCrosshairs] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="relative flex flex-col bg-black rounded-lg border border-neutral-800 overflow-hidden shadow-2xl font-sans">
      {/* Viewer Top Toolbar (Clean B&W) */}
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-950 border-b border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center gap-2 truncate max-w-[220px] sm:max-w-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span className="truncate text-white text-[11px]">{imageName || 'Scan_DICOM_Viewer'}</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          {saliencyHighlights.length > 0 && (
            <button
              type="button"
              id="toggle-overlays-btn"
              onClick={() => setShowOverlays(!showOverlays)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition ${
                showOverlays
                  ? 'bg-neutral-800 text-white border border-neutral-600'
                  : 'bg-neutral-950 text-neutral-500 hover:text-neutral-300 border border-neutral-800'
              }`}
              title="Toggle AI Anomaly Saliency Overlay"
            >
              <Eye className="w-3 h-3" />
              <span>ROI Markers</span>
            </button>
          )}

          <button
            type="button"
            id="toggle-crosshairs-btn"
            onClick={() => setShowCrosshairs(!showCrosshairs)}
            className={`p-1 rounded transition border ${
              showCrosshairs
                ? 'bg-neutral-800 text-white border-neutral-600'
                : 'text-neutral-400 hover:text-white border-neutral-800 bg-neutral-950'
            }`}
            title="Toggle Centering Crosshairs"
          >
            <Crosshair className="w-3 h-3" />
          </button>

          <div className="h-3.5 w-px bg-neutral-800 mx-1"></div>

          <button
            type="button"
            id="zoom-out-btn"
            onClick={handleZoomOut}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-mono text-neutral-400 min-w-[32px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            id="zoom-in-btn"
            onClick={handleZoomIn}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          {zoom !== 1 && (
            <button
              type="button"
              id="reset-zoom-btn"
              onClick={handleResetZoom}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Image Stage */}
      <div className="relative flex items-center justify-center p-3 bg-black min-h-[340px] max-h-[460px] overflow-hidden select-none">
        <div
          className="relative transition-transform duration-200 ease-out max-h-full flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={imageUrl}
            alt="Kidney Scan for Diagnostic Support"
            className="max-h-[380px] w-auto object-contain rounded shadow-2xl"
          />

          {/* Optional Crosshair Lines (Clean White/Gray) */}
          {showCrosshairs && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-px bg-white/40"></div>
              <div className="h-full w-px bg-white/40 absolute"></div>
            </div>
          )}

          {/* Saliency / Detected Anomaly ROI Markers (Clean B&W) */}
          {showOverlays &&
            isKidney &&
            saliencyHighlights.map((hl, idx) => {
              const leftPercent = Math.max(5, Math.min(95, hl.x));
              const topPercent = Math.max(5, Math.min(95, hl.y));
              const radiusPercent = Math.max(6, Math.min(25, hl.radius || 10));

              return (
                <div
                  key={idx}
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                >
                  <div
                    className="rounded-full border border-white bg-white/10 animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.7)] flex items-center justify-center"
                    style={{
                      width: `${radiusPercent * 4}px`,
                      height: `${radiusPercent * 4}px`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <span className="mt-1 px-2 py-0.5 bg-black/95 text-white border border-neutral-700 text-[10px] font-mono rounded whitespace-nowrap shadow-md">
                    {hl.label}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Viewer Footer Status (Strict Monochrome) */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-950 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono">
        <span>RENDER: 16-BIT GRAYSCALE CONTRAST</span>
        <span>WINDOW: 512x512 RESCALED MATRIX</span>
      </div>
    </div>
  );
};
