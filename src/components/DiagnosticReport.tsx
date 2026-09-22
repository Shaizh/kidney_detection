import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Database,
  Activity,
  Layers,
  FileText,
  Printer,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { KidneyAnalysisResult } from '../types';

interface DiagnosticReportProps {
  result: KidneyAnalysisResult;
  imageName: string;
}

export const DiagnosticReport: React.FC<DiagnosticReportProps> = ({ result }) => {
  const isConfirmedKidney = result.isKidneyImage;

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Normal':
        return 'bg-neutral-900 text-neutral-300 border-neutral-700';
      case 'Mild':
        return 'bg-neutral-900 text-neutral-200 border-neutral-600';
      case 'Moderate':
        return 'bg-neutral-800 text-white border-neutral-500 font-semibold';
      case 'Severe / Urgent':
        return 'bg-white text-black border-white font-bold animate-pulse';
      default:
        return 'bg-neutral-900 text-neutral-300 border-neutral-800';
    }
  };

  return (
    <div id="diagnostic-report-card" className="space-y-4 print:text-black font-sans">
      {/* 1. Anatomical Verification Header Banner (Clean B&W) */}
      <div
        className={`p-4 rounded-lg border flex items-start gap-3.5 transition bg-neutral-950 ${
          isConfirmedKidney ? 'border-neutral-700 text-neutral-100' : 'border-neutral-600 text-neutral-200'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {isConfirmedKidney ? (
            <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center text-neutral-300">
              <XCircle className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white">
              {isConfirmedKidney
                ? 'Anatomical Verification: Confirmed Kidney Anatomy'
                : 'Anatomical Verification: Non-Kidney Image Detected'}
            </h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded font-mono font-medium border border-neutral-700 bg-neutral-900 text-neutral-300">
              {result.anatomicalValidationStatus}
            </span>
          </div>

          <p className="text-xs mt-1.5 leading-relaxed text-neutral-300">
            {result.validationDetails}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
              Subject: {result.detectedSubject}
            </span>
            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
              Modality: {result.imagingModality}
            </span>
          </div>
        </div>
      </div>

      {/* If REJECTED NON-KIDNEY: Clear guidance without false pathology */}
      {!isConfirmedKidney ? (
        <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-950 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              Diagnostic Analysis Halted for Patient Safety
            </h4>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            The uploaded photograph or scan was identified as <strong>{result.detectedSubject}</strong> and does not contain valid renal (kidney) structures.
            To avoid medical diagnostic errors, kidney disease detection algorithms only process confirmed renal imaging.
          </p>
          <div className="p-3 rounded bg-black border border-neutral-800 text-xs text-neutral-400 font-mono">
            <p className="font-semibold text-white mb-1 uppercase text-[11px]">Recommended Action:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Please upload an authentic Abdominal/Pelvic CT scan, Renal Ultrasound, Kidney MRI, or Renal Histopathology image.</li>
              <li>You can also test with the preloaded verified scans in the &ldquo;Quick Benchmark Test Scans&rdquo; list.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* If CONFIRMED KIDNEY: Full Diagnostic Support Report */
        <div className="space-y-4">
          {/* Primary Diagnosis & Confidence Overview Card */}
          <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-950 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-1.5 font-mono">
                  <Activity className="w-3.5 h-3.5 text-white" />
                  Primary Diagnostic Classification
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
                  {result.primaryDiagnosis}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded font-mono border ${getSeverityBadge(
                    result.severityLevel
                  )}`}
                >
                  Severity: {result.severityLevel}
                </span>

                <button
                  type="button"
                  id="print-report-btn"
                  onClick={handlePrint}
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center gap-1.5 border border-neutral-700 transition"
                  title="Print Clinical Summary"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print Report</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Confidence Gauge (High Contrast B&W) */}
            <div className="mt-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-neutral-400 font-mono text-[11px]">Algorithmic Confidence Score</span>
                <span className="font-mono font-bold text-white text-sm">
                  {result.diagnosticConfidence}%
                </span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, Math.max(5, result.diagnosticConfidence))}%` }}
                ></div>
              </div>
            </div>

            {/* Photo Technical Details Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-neutral-800/80 text-xs font-mono">
              <div className="p-2.5 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 block text-[10px] uppercase">Modality</span>
                <span className="font-medium text-neutral-200 truncate block mt-0.5">
                  {result.imagingModality}
                </span>
              </div>
              <div className="p-2.5 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 block text-[10px] uppercase">Slice Plane</span>
                <span className="font-medium text-neutral-200 truncate block mt-0.5">
                  {result.viewProjection}
                </span>
              </div>
              <div className="p-2.5 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 block text-[10px] uppercase">Contrast Protocol</span>
                <span className="font-medium text-neutral-200 truncate block mt-0.5">
                  {result.contrastStatus}
                </span>
              </div>
              <div className="p-2.5 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 block text-[10px] uppercase">Analysis Time</span>
                <span className="font-medium text-neutral-200 text-[11px] block mt-0.5">
                  {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Reference Dataset Match Alignment */}
          <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950">
            <div className="flex items-center gap-2 mb-2 text-white font-mono">
              <Database className="w-4 h-4 flex-shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Benchmark Dataset Grounding
              </h4>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black p-3 rounded border border-neutral-800 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Evaluated Reference Cohort:</span>
                <span className="font-medium text-neutral-200">
                  {result.referenceDataset.datasetName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-[10px] uppercase">Benchmark Class:</span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-800 text-white font-semibold border border-neutral-600">
                  {result.referenceDataset.benchmarkMatch}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
              <span className="text-neutral-500 text-[10px] uppercase">Standard Classes:</span>
              {result.referenceDataset.standardClasses.map((cls, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded border text-[10px] ${
                    cls.toLowerCase().includes(result.referenceDataset.benchmarkMatch.toLowerCase())
                      ? 'bg-neutral-800 text-white border-neutral-500 font-bold'
                      : 'bg-black text-neutral-400 border-neutral-800'
                  }`}
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>

          {/* Morphological Image Findings */}
          <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950 space-y-3">
            <div className="flex items-center gap-2 text-white font-mono">
              <Layers className="w-4 h-4 flex-shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Image Pathology &amp; Morphological Findings
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-1">
                  Parenchymal &amp; Cortical Status:
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {result.morphologicalFindings.parenchymalIntegrity}
                </p>
              </div>

              <div className="p-3 rounded bg-black border border-neutral-800">
                <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-1">
                  Collecting System / Pelvicalyceal:
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {result.morphologicalFindings.collectingSystem}
                </p>
              </div>
            </div>

            {result.morphologicalFindings.calculusOrMassDetails && (
              <div className="p-3 rounded bg-black border border-neutral-800 text-xs">
                <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-1">
                  Lesion / Calculus Specific Metrics:
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {result.morphologicalFindings.calculusOrMassDetails}
                </p>
              </div>
            )}

            {/* Key Features Bullet Points */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider font-mono">
                Key Diagnostic Features Detected:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {result.morphologicalFindings.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white font-bold mt-0.5 font-mono">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Differential Diagnoses Probabilities */}
          {result.differentialDiagnoses.length > 0 && (
            <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-mono">
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Differential Diagnoses Ranking
                </h4>
              </div>

              <div className="space-y-2">
                {result.differentialDiagnoses.map((diff, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded bg-black border border-neutral-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex-1 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{diff.condition}</span>
                        <span className="text-neutral-400 text-[11px]">({diff.probability}%)</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">{diff.rationale}</p>
                    </div>

                    <div className="w-full sm:w-28 bg-neutral-900 h-1.5 rounded-full overflow-hidden flex-shrink-0 border border-neutral-800">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${Math.min(100, Math.max(5, diff.probability))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Early Diagnostic Recommendations */}
          <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-950 space-y-2">
            <div className="flex items-center gap-2 text-white font-mono">
              <FileText className="w-4 h-4 flex-shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Clinical Recommendations &amp; Follow-up Protocol
              </h4>
            </div>

            <ul className="space-y-1.5 text-xs text-neutral-300 pl-1 font-sans">
              {result.clinicalRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Clinical Disclaimer */}
      <div className="p-3 rounded border border-neutral-800 bg-black text-[11px] text-neutral-400 flex items-start gap-2 font-mono">
        <AlertTriangle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-neutral-200">Clinical Support Notice:</strong> {result.clinicalDisclaimer}
        </p>
      </div>
    </div>
  );
};
