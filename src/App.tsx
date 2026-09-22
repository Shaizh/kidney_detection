import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  X,
  FileImage,
  ShieldCheck,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { KidneyAnalysisResult } from './types';
import { ensureRasterImageDataUrl } from './utils/imageUtils';

export default function App() {
  const [imageFile, setImageFile] = useState<{ name: string; url: string } | null>(null);
  const [result, setResult] = useState<KidneyAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (name: string, dataUrl: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const rasterUrl = await ensureRasterImageDataUrl(dataUrl);

      const response = await fetch('/api/analyze-kidney', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: rasterUrl,
          filename: name,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Server responded with status ${response.status}`);
      }

      const data: KidneyAnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      let cleanMsg = err?.message || 'Could not analyze the image. Please try again with a clear scan.';
      if (cleanMsg.includes('503') || cleanMsg.includes('high demand') || cleanMsg.includes('UNAVAILABLE')) {
        cleanMsg = 'The AI model is experiencing a momentary spike in demand. Please click Retry.';
      } else if (cleanMsg.includes('{')) {
        try {
          const jsonStart = cleanMsg.indexOf('{');
          const parsed = JSON.parse(cleanMsg.slice(jsonStart));
          if (parsed?.error?.message) {
            cleanMsg = parsed.error.message;
          }
        } catch {
          // keep original
        }
      }
      setErrorMessage(cleanMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImageFile({ name: file.name, url: dataUrl });
        analyzeImage(file.name, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    setImageFile(null);
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-neutral-800 selection:text-white">
      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Minimal Clean Header */}
        <div className="text-center space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
            Kidney Diagnostic AI
          </h1>
          <p className="text-xs text-neutral-400">
            Upload a picture to verify kidney anatomy and detect disease
          </p>
        </div>

        {/* Upload Box (When no picture is selected) */}
        {!imageFile && (
          <div
            id="dropzone-upload-picture"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition flex flex-col items-center justify-center bg-neutral-950 ${
              isDragging
                ? 'border-white bg-neutral-900 shadow-2xl'
                : 'border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 rounded-full border border-neutral-700 bg-neutral-900 text-white flex items-center justify-center mb-4 transition group-hover:scale-105">
              <UploadCloud className="w-7 h-7" />
            </div>

            <p className="text-sm font-semibold text-white tracking-wide font-mono uppercase">
              Upload a Picture
            </p>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
              Drag and drop your scan here, or click to browse (PNG, JPG, WebP)
            </p>
          </div>
        )}

        {/* Uploaded Picture & Analysis Result View */}
        {imageFile && (
          <div className="space-y-4">
            {/* Picture Card */}
            <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
              {/* Header with image name and Clear button */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/60 border-b border-neutral-800 text-xs font-mono">
                <span className="text-neutral-300 truncate max-w-[240px] flex items-center gap-1.5">
                  <FileImage className="w-3.5 h-3.5 text-neutral-400" />
                  {imageFile.name}
                </span>

                <button
                  type="button"
                  id="btn-remove-picture"
                  onClick={handleClear}
                  className="px-2 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition flex items-center gap-1"
                  title="Upload a different picture"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Upload Different</span>
                </button>
              </div>

              {/* Image Preview Container */}
              <div className="p-4 flex items-center justify-center bg-black min-h-[260px] max-h-[420px] overflow-hidden">
                <img
                  src={imageFile.url}
                  alt="Uploaded scan"
                  className="max-h-[360px] w-auto object-contain rounded border border-neutral-800"
                />
              </div>

              {/* Analysis Status Bar */}
              {isAnalyzing && (
                <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-center gap-3 text-xs font-mono text-neutral-300">
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing picture with medical vision AI...</span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-950 text-neutral-200 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p>{errorMessage}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => analyzeImage(imageFile.name, imageFile.url)}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-white font-mono hover:bg-neutral-800"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white font-mono"
                    >
                      Upload Another
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Result Display */}
            {!isAnalyzing && result && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4 shadow-xl">
                {/* Anatomical Check Badge */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    {result.isKidneyImage ? (
                      <ShieldCheck className="w-5 h-5 text-white" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-neutral-400" />
                    )}
                    <div>
                      <h2 className="text-sm font-semibold text-white font-mono uppercase">
                        {result.isKidneyImage ? 'Confirmed Kidney Anatomy' : 'Non-Kidney Detected'}
                      </h2>
                      <p className="text-[11px] text-neutral-400">
                        {result.detectedSubject} • {result.imagingModality}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-700 bg-neutral-900 text-neutral-300">
                    {result.anatomicalValidationStatus}
                  </span>
                </div>

                {/* If non-kidney */}
                {!result.isKidneyImage ? (
                  <div className="p-3.5 rounded-lg bg-black border border-neutral-800 text-xs text-neutral-300 space-y-2">
                    <p className="leading-relaxed">
                      {result.validationDetails}
                    </p>
                    <p className="text-neutral-400 text-[11px] font-mono">
                      To detect kidney disease, please upload an authentic renal CT scan, ultrasound, or MRI.
                    </p>
                  </div>
                ) : (
                  /* If confirmed kidney: Clean diagnostic summary */
                  <div className="space-y-4">
                    {/* Primary Diagnosis & Confidence */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                          Diagnosis
                        </span>
                        <span className="text-lg font-bold text-white tracking-tight">
                          {result.primaryDiagnosis}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                          Confidence
                        </span>
                        <span className="text-base font-mono font-bold text-white">
                          {result.diagnosticConfidence}%
                        </span>
                      </div>
                    </div>

                    {/* Severity & Benchmark */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded bg-black border border-neutral-800">
                        <span className="text-neutral-500 text-[10px] uppercase block">Severity</span>
                        <span className="text-white font-semibold mt-0.5 block">{result.severityLevel}</span>
                      </div>
                      <div className="p-2.5 rounded bg-black border border-neutral-800">
                        <span className="text-neutral-500 text-[10px] uppercase block">Benchmark</span>
                        <span className="text-neutral-200 mt-0.5 block truncate">
                          {result.referenceDataset.benchmarkMatch}
                        </span>
                      </div>
                    </div>

                    {/* Key Findings */}
                    {result.morphologicalFindings.keyFeatures.length > 0 && (
                      <div className="space-y-1.5 pt-1 text-xs">
                        <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                          Key Findings
                        </span>
                        <ul className="space-y-1 text-neutral-300">
                          {result.morphologicalFindings.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-white font-bold font-mono">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Upload another button */}
                <div className="pt-2 border-t border-neutral-800/80 flex justify-end">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 font-mono text-xs font-semibold transition"
                  >
                    Upload Another Picture
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
