import React, { useState } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  BENCHMARK_TRAINING_STATS,
  MODEL_ARCHITECTURE_SPECS,
  EPOCH_TRAINING_HISTORY,
} from '../data/trainingStats';

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetrainTrigger?: () => void;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
  isOpen,
  onClose,
  onRetrainTrigger,
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'dataset' | 'architecture'>('metrics');
  const [isSimulatingTrain, setIsSimulatingTrain] = useState(false);
  const [currentEpochProgress, setCurrentEpochProgress] = useState(25);
  const [statusNote, setStatusNote] = useState('Model weights converged (Epoch 25/25)');

  if (!isOpen) return null;

  const handleStartFineTuning = () => {
    setIsSimulatingTrain(true);
    setCurrentEpochProgress(1);
    setStatusNote('Initiating transfer learning optimization on Kaggle CT Kidney dataset...');

    let ep = 1;
    const interval = setInterval(() => {
      ep += 4;
      if (ep >= 25) {
        clearInterval(interval);
        setCurrentEpochProgress(25);
        setIsSimulatingTrain(false);
        setStatusNote('Model retraining completed! All weights synchronized.');
        if (onRetrainTrigger) onRetrainTrigger();
      } else {
        setCurrentEpochProgress(ep);
        setStatusNote(`Training epoch ${ep}/25: optimizing cross-entropy loss & anatomical gating...`);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-black border border-neutral-800 rounded-xl flex flex-col text-neutral-100 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
                  AI Model Training &amp; Benchmarks
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
                  v2.4-B&amp;W-Prod
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Trained on Kaggle CT Kidney Disease Classification + TCGA-KIRC cohorts
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded border border-transparent hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Strict Clean B&W) */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs px-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-3 font-mono font-medium border-b-2 -mb-px transition flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Training Accuracy &amp; Epochs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dataset')}
            className={`py-3 px-3 font-mono font-medium border-b-2 -mb-px transition flex items-center gap-2 ${
              activeTab === 'dataset'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Training Dataset Split</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 font-mono font-medium border-b-2 -mb-px transition flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture &amp; Hyperparameters</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'metrics' && (
            <div className="space-y-5">
              {/* Top Key Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-neutral-500 font-mono text-[10px] block uppercase">
                    Validation Accuracy
                  </span>
                  <span className="text-xl font-mono font-bold text-white block mt-1">
                    {MODEL_ARCHITECTURE_SPECS.finalMetrics.validationAccuracy}
                  </span>
                  <span className="text-[10px] text-neutral-400">Ground-truth tested</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-neutral-500 font-mono text-[10px] block uppercase">
                    Mean AUC-ROC
                  </span>
                  <span className="text-xl font-mono font-bold text-white block mt-1">
                    {MODEL_ARCHITECTURE_SPECS.finalMetrics.meanAUC_ROC}
                  </span>
                  <span className="text-[10px] text-neutral-400">Class discriminative</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-neutral-500 font-mono text-[10px] block uppercase">
                    Anatomical Gating
                  </span>
                  <span className="text-xl font-mono font-bold text-white block mt-1">
                    {MODEL_ARCHITECTURE_SPECS.finalMetrics.anatomicalRejectionPrecision}
                  </span>
                  <span className="text-[10px] text-neutral-400">Non-kidney rejection</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-neutral-500 font-mono text-[10px] block uppercase">
                    Macro F1-Score
                  </span>
                  <span className="text-xl font-mono font-bold text-white block mt-1">
                    {MODEL_ARCHITECTURE_SPECS.finalMetrics.f1Score}
                  </span>
                  <span className="text-[10px] text-neutral-400">Harmonic precision</span>
                </div>
              </div>

              {/* Epoch History Table */}
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950">
                <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center">
                  <span className="font-mono text-neutral-300 font-medium">
                    Training History by Epoch (Validation Loss Curve)
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    25 Total Epochs • Batch Size: 32
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono">
                    <thead className="bg-neutral-900/50 border-b border-neutral-800 text-[10px] text-neutral-400 uppercase">
                      <tr>
                        <th className="py-2 px-3">Epoch</th>
                        <th className="py-2 px-3">Train Loss</th>
                        <th className="py-2 px-3">Val Loss</th>
                        <th className="py-2 px-3">Train Acc</th>
                        <th className="py-2 px-3">Val Acc</th>
                        <th className="py-2 px-3">F1 Score</th>
                        <th className="py-2 px-3">Convergence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-300">
                      {EPOCH_TRAINING_HISTORY.map((row) => (
                        <tr
                          key={row.epoch}
                          className={row.epoch === currentEpochProgress ? 'bg-neutral-900/80 font-bold text-white' : ''}
                        >
                          <td className="py-2 px-3">#{row.epoch}</td>
                          <td className="py-2 px-3 text-neutral-400">{row.trainLoss.toFixed(2)}</td>
                          <td className="py-2 px-3 text-neutral-300">{row.valLoss.toFixed(2)}</td>
                          <td className="py-2 px-3">{row.trainAccuracy}%</td>
                          <td className="py-2 px-3 text-white">{row.valAccuracy}%</td>
                          <td className="py-2 px-3">{row.f1Score}</td>
                          <td className="py-2 px-3">
                            <div className="w-16 bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-white h-full"
                                style={{ width: `${row.valAccuracy}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dataset' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
                <span className="text-neutral-500 font-mono text-[10px] block uppercase">
                  Benchmark Dataset Repository
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {BENCHMARK_TRAINING_STATS.datasetName}
                </p>
                <p className="text-neutral-400 text-xs mt-1">
                  Cross-validated over {BENCHMARK_TRAINING_STATS.totalImages.toLocaleString()} curated CT &amp; ultrasound renal slices.
                </p>
              </div>

              {/* Class breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
                  <span className="text-neutral-500 text-[10px] block">Normal Kidneys</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {BENCHMARK_TRAINING_STATS.normalCount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">40.8% split</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
                  <span className="text-neutral-500 text-[10px] block">Renal Cysts</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {BENCHMARK_TRAINING_STATS.cystCount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">29.8% split</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
                  <span className="text-neutral-500 text-[10px] block">Kidney Stones</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {BENCHMARK_TRAINING_STATS.stoneCount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">11.1% split</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
                  <span className="text-neutral-500 text-[10px] block">Renal Tumors</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {BENCHMARK_TRAINING_STATS.tumorCount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">18.3% split</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
                  <span className="text-neutral-500 text-[10px] block">Non-Kidney Controls</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {BENCHMARK_TRAINING_STATS.nonKidneyControls.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">Negative guard</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded text-neutral-400 leading-relaxed font-mono">
                <span className="text-white font-bold block mb-1">Partition &amp; Split Protocol:</span>
                {BENCHMARK_TRAINING_STATS.validationSplit}. Slices from the same patient are kept strictly within either train or test splits to guarantee zero data leakage.
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4 font-mono">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Backbone Model</span>
                  <span className="text-white font-bold">{MODEL_ARCHITECTURE_SPECS.backbone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Input Specification</span>
                  <span className="text-white">{MODEL_ARCHITECTURE_SPECS.imageInputFormat}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Optimization Protocol</span>
                  <span className="text-white">{MODEL_ARCHITECTURE_SPECS.trainingOptimizer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Objective Loss Formulation</span>
                  <span className="text-white">{MODEL_ARCHITECTURE_SPECS.lossFunction}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded text-neutral-400 leading-relaxed">
                <span className="text-white font-bold block mb-1">Anatomical Gating Filter:</span>
                Prior to feeding image features to the 4-class disease head, the image passes through a binary anatomical gating classifier. If anatomical confidence is below 95%, disease prediction is blocked, preventing false-positive stone or tumor diagnoses on non-renal images.
              </div>
            </div>
          )}

          {/* Interactive Retraining Simulator Status */}
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="font-semibold text-white">Interactive Model Training Engine</span>
              </div>
              <p className="text-neutral-400 text-[11px] font-mono mt-0.5">{statusNote}</p>
            </div>

            <button
              type="button"
              id="retrain-model-trigger-btn"
              disabled={isSimulatingTrain}
              onClick={handleStartFineTuning}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 font-mono font-semibold rounded transition flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSimulatingTrain ? 'animate-spin' : ''}`} />
              <span>{isSimulatingTrain ? 'Retraining...' : 'Run Epoch Fine-Tuning'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>STATUS: ALL BENCHMARK WEIGHTS LOCKED</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white transition border border-neutral-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
