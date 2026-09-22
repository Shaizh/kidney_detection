export interface DatasetReference {
  datasetName: string;
  benchmarkMatch: string;
  standardClasses: string[];
}

export interface DifferentialDiagnosis {
  condition: string;
  probability: number;
  rationale: string;
}

export interface MorphologicalFindings {
  keyFeatures: string[];
  parenchymalIntegrity: string;
  collectingSystem: string;
  calculusOrMassDetails?: string;
}

export interface SaliencyHighlight {
  x: number; // 0 - 100 percentage from left
  y: number; // 0 - 100 percentage from top
  radius: number; // estimated radius in percentage
  label: string;
}

export interface KidneyAnalysisResult {
  isKidneyImage: boolean;
  anatomicalValidationStatus: 'CONFIRMED_KIDNEY' | 'REJECTED_NON_KIDNEY' | 'INCONCLUSIVE_POOR_QUALITY';
  validationDetails: string;
  detectedSubject: string;
  imagingModality: string;
  viewProjection: string;
  contrastStatus: string;
  primaryDiagnosis: string;
  diagnosticConfidence: number;
  severityLevel: 'Normal' | 'Mild' | 'Moderate' | 'Severe / Urgent';
  referenceDataset: DatasetReference;
  morphologicalFindings: MorphologicalFindings;
  differentialDiagnoses: DifferentialDiagnosis[];
  clinicalRecommendations: string[];
  saliencyHighlights: SaliencyHighlight[];
  clinicalDisclaimer: string;
  timestamp: string;
}

export interface SampleScan {
  id: string;
  name: string;
  category: 'Stone' | 'Cyst' | 'Tumor' | 'Normal' | 'Non-Kidney (Control)';
  datasetSource: string;
  description: string;
  modality: string;
  imageUrl: string;
  expectedValidation: boolean;
}

export interface TrainingMetric {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  trainAccuracy: number;
  valAccuracy: number;
  f1Score: number;
}

export interface TrainingDatasetStats {
  datasetName: string;
  totalImages: number;
  normalCount: number;
  cystCount: number;
  stoneCount: number;
  tumorCount: number;
  nonKidneyControls: number;
  validationSplit: string;
  testedModality: string;
}
