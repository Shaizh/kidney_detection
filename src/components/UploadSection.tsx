import React, { useRef } from 'react';
import { UploadCloud, FileImage, ShieldCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_SCANS } from '../data/sampleScans';
import { SampleScan } from '../types';

interface UploadSectionProps {
  currentScan: { name: string; url: string; datasetSource?: string } | null;
  onSelectScan: (name: string, dataUrl: string, datasetSource?: string) => void;
  isLoading: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  currentScan,
  onSelectScan,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid medical image file (JPEG, PNG, WebP, TIFF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onSelectScan(file.name, dataUrl, 'User Uploaded Scan');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Upload Zone (Clean B&W) */}
      <div
        id="dropzone-scan-uploader"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`group relative rounded-lg border border-dashed p-6 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[140px] bg-neutral-950 ${
          isLoading
            ? 'opacity-50 cursor-not-allowed border-neutral-800'
            : 'border-neutral-700 hover:border-white hover:bg-neutral-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        <div className="w-10 h-10 rounded border border-neutral-700 bg-neutral-900 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
          <UploadCloud className="w-5 h-5" />
        </div>

        <p className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
          Upload Kidney Scan or Medical DICOM Slice
        </p>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm">
          Drag &amp; drop CT slice, Ultrasound, MRI, or Histopathology (PNG, JPG, WebP).
          The anatomical validator will verify if it is an authentic kidney before analysis.
        </p>
      </div>

      {/* Benchmark Datasets Quick Selector (Clean B&W) */}
      <div>
        <div className="flex items-center justify-between mb-2 font-mono">
          <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
            <FileImage className="w-3.5 h-3.5" />
            Quick Benchmark Test Scans
          </span>
          <span className="text-[10px] text-neutral-400">
            Click to load verified clinical cases
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SAMPLE_SCANS.map((sample: SampleScan) => {
            const isSelected = currentScan?.name === sample.name;
            const isControl = sample.category === 'Non-Kidney (Control)';

            return (
              <button
                key={sample.id}
                type="button"
                id={`btn-sample-${sample.id}`}
                disabled={isLoading}
                onClick={() => onSelectScan(sample.name, sample.imageUrl, sample.datasetSource)}
                className={`relative flex flex-col p-2.5 rounded-lg border text-left transition font-sans ${
                  isSelected
                    ? 'border-white bg-white text-black shadow-lg'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : isControl
                        ? 'bg-neutral-900 text-neutral-300 border-neutral-700'
                        : 'bg-neutral-900 text-white border-neutral-800'
                    }`}
                  >
                    {sample.category}
                  </span>
                  {isControl ? (
                    <span title="Negative Control (Non-Kidney)">
                      <AlertCircle className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-neutral-400'}`} />
                    </span>
                  ) : (
                    <span title="Authentic Kidney Anatomy">
                      <ShieldCheck className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-white'}`} />
                    </span>
                  )}
                </div>

                <span className={`text-xs font-medium line-clamp-1 ${isSelected ? 'text-black font-semibold' : 'text-neutral-200'}`}>
                  {sample.name}
                </span>
                <span className={`text-[10px] line-clamp-1 mt-0.5 font-mono ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                  {sample.modality}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
