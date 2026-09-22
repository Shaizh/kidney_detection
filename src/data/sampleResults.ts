import { KidneyAnalysisResult } from '../types';

export const BENCHMARK_SAMPLE_RESULTS: Record<string, KidneyAnalysisResult> = {
  'sample-stone': {
    isKidneyImage: true,
    anatomicalValidationStatus: 'CONFIRMED_KIDNEY',
    validationDetails:
      'Verified retroperitoneal renal silhouette and cross-sectional parenchymal outline on non-contrast axial abdominal computed tomography.',
    detectedSubject: 'Abdominal CT Slice depicting Left & Right Kidneys',
    imagingModality: 'Non-Contrast Computed Tomography (NCCT Abdomen/Pelvis)',
    viewProjection: 'Axial cross-sectional slice at L1-L2 renal hilum level',
    contrastStatus: 'Non-contrast (NCCT) - optimal for radiopaque calculi detection',
    primaryDiagnosis: 'Kidney Stone (Nephrolithiasis / Calculus)',
    diagnosticConfidence: 96.8,
    severityLevel: 'Moderate',
    referenceDataset: {
      datasetName: 'Kaggle CT Kidney Disease Classification Dataset',
      benchmarkMatch: 'Stone (Nephrolithiasis)',
      standardClasses: ['Cyst', 'Normal', 'Stone', 'Tumor'],
    },
    morphologicalFindings: {
      keyFeatures: [
        'Focal hyperdense attenuation focus (approx. 850-1100 Hounsfield Units) within left renal pelvis',
        'Calculus measures approximately 7.2 mm in maximal axial dimension',
        'Mild caliceal fullness and pelvicalyceal distension proximal to calculus focus',
        'Preserved corticomedullary thickness without perinephric stranding',
      ],
      parenchymalIntegrity: 'Renal cortex maintains uniform depth and smooth margins without focal atrophy.',
      collectingSystem: 'Mild left hydronephrosis secondary to pelvic obstruction; right collecting system normal.',
      calculusOrMassDetails: 'Discrete radiopaque hyperattenuating stone focus identified at the ureteropelvic junction (UPJ).',
    },
    differentialDiagnoses: [
      { condition: 'Renal Calculus / Pelvic Stone', probability: 96, rationale: 'Dense radio-opaque hyperattenuation within renal pelvis conforming to typical calcium oxalate stone.' },
      { condition: 'Renal Artery Calcification', probability: 3, rationale: 'Vascular calcification is typically eccentric, linear, and outside the pelvicalyceal lumen.' },
      { condition: 'Parenchymal Nephrocalcinosis', probability: 1, rationale: 'Absence of diffuse medullary calcium deposition.' },
    ],
    clinicalRecommendations: [
      'Obtain formal low-dose non-contrast CT KUB protocol to evaluate distal ureter and stone tract',
      'Order Urinalysis with microscopic examination for microhematuria, crystalluria, and infection markers',
      'Assess serum creatinine, BUN, and estimated glomerular filtration rate (eGFR) to confirm renal clearance',
      'Urology consultation for potential medical expulsive therapy (MET) vs. shock wave lithotripsy (ESWL)',
    ],
    saliencyHighlights: [
      { x: 67, y: 57, radius: 10, label: 'Hyperdense Stone Focus (Left Pelvis)' },
    ],
    clinicalDisclaimer:
      'This algorithmic output is provided for clinical diagnostic support and early triage assistance. Confirmation by a certified radiologist or treating urologist is required before clinical management decisions.',
    timestamp: new Date().toISOString(),
  },

  'sample-cyst': {
    isKidneyImage: true,
    anatomicalValidationStatus: 'CONFIRMED_KIDNEY',
    validationDetails:
      'Authentic renal anatomy confirmed: Bilateral renal silhouettes, corticomedullary differentiation, and retroperitoneal margins clearly visible on contrast CT.',
    detectedSubject: 'Abdominal CT Slice depicting Right Kidney Cortical Region',
    imagingModality: 'Contrast-Enhanced Computed Tomography (CECT Abdomen)',
    viewProjection: 'Axial nephrographic phase cross-section',
    contrastStatus: 'Contrast-enhanced (Nephrographic Phase)',
    primaryDiagnosis: 'Simple Renal Cortical Cyst (Bosniak Category I)',
    diagnosticConfidence: 98.2,
    severityLevel: 'Normal',
    referenceDataset: {
      datasetName: 'Kaggle CT Kidney Disease Classification Dataset',
      benchmarkMatch: 'Cyst',
      standardClasses: ['Cyst', 'Normal', 'Stone', 'Tumor'],
    },
    morphologicalFindings: {
      keyFeatures: [
        'Well-circumscribed, round hypodense fluid lesion (attenuation 4-12 HU) in right kidney lateral cortex',
        'Imperceptible, paper-thin wall without calcification, septation, or solid nodularity',
        'No contrast enhancement between pre- and post-contrast phases (< 10 HU change)',
        'Surrounding renal parenchyma displaced smoothly without invasive infiltrative margins',
      ],
      parenchymalIntegrity: 'Parenchyma demonstrates homogeneous nephrographic enhancement aside from benign cystic defect.',
      collectingSystem: 'Unremarkable pelvicalyceal architecture; no obstruction or calyceal blunting.',
      calculusOrMassDetails: 'Classic benign fluid attenuation cyst adhering to Bosniak Category I criteria.',
    },
    differentialDiagnoses: [
      { condition: 'Simple Renal Cyst (Bosniak I)', probability: 98, rationale: 'Smooth round borders, thin non-enhancing wall, water-density fluid content.' },
      { condition: 'Minimally Complex Cyst (Bosniak II)', probability: 2, rationale: 'No thin internal septations or microcalcifications identified.' },
    ],
    clinicalRecommendations: [
      'Benign Bosniak I lesion does not warrant surgical intervention or mandatory active surveillance in asymptomatic patients',
      'Correlate with baseline blood pressure and annual routine urinalysis during general check-ups',
      'Follow-up ultrasound in 12-24 months if patient develops flank tenderness or hematuria',
    ],
    saliencyHighlights: [
      { x: 27, y: 55, radius: 12, label: 'Hypodense Fluid Cyst (Bosniak I)' },
    ],
    clinicalDisclaimer:
      'This algorithmic output is provided for clinical diagnostic support and early triage assistance. Confirmation by a certified radiologist or treating urologist is required before clinical management decisions.',
    timestamp: new Date().toISOString(),
  },

  'sample-tumor': {
    isKidneyImage: true,
    anatomicalValidationStatus: 'CONFIRMED_KIDNEY',
    validationDetails:
      'Confirmed renal imaging slice: Displays retroperitoneal structures, vertebral column, and renal parenchyma with unilateral architectural expansion.',
    detectedSubject: 'Contrast Abdominal CT Slice showing Left Renal Mass',
    imagingModality: 'Contrast-Enhanced CT (CECT - Corticomedullary / Venous)',
    viewProjection: 'Axial cross-sectional slice',
    contrastStatus: 'Biphasic Contrast Enhanced (Dynamic Phase)',
    primaryDiagnosis: 'Renal Cell Neoplasm / Tumor (Suspected Renal Cell Carcinoma)',
    diagnosticConfidence: 94.5,
    severityLevel: 'Severe / Urgent',
    referenceDataset: {
      datasetName: 'TCGA-KIRC & Kaggle CT Kidney Dataset',
      benchmarkMatch: 'Tumor (Renal Cell Carcinoma)',
      standardClasses: ['Cyst', 'Normal', 'Stone', 'Tumor'],
    },
    morphologicalFindings: {
      keyFeatures: [
        'Heterogeneous exophytic solid mass expanding the lateral contour of the left kidney',
        'Vivid early contrast enhancement with central low-attenuation areas consistent with necrosis',
        'Irregular, nodular margins disrupting the renal capsule outline',
        'Preserved left renal vein caliber without obvious intraluminal tumor thrombus',
      ],
      parenchymalIntegrity: 'Disrupted normal renal architecture with compression of adjacent medullary pyramids.',
      collectingSystem: 'Minor distortion of posterior lower pole calyces without gross pelvicalyceal obstruction.',
      calculusOrMassDetails: 'Hypervascular heterogeneous solid renal mass measuring ~4.8 cm, typical for Clear Cell RCC.',
    },
    differentialDiagnoses: [
      { condition: 'Renal Cell Carcinoma (Clear Cell RCC)', probability: 89, rationale: 'Hypervascular peripheral enhancement, heterogeneous central necrosis, cortical origin.' },
      { condition: 'Renal Oncocytoma', probability: 8, rationale: 'Solid benign neoplasm often mimics RCC on CT; central stellate scar occasionally overlaps.' },
      { condition: 'Lipid-Poor Angiomyolipoma (AML)', probability: 3, rationale: 'Considered when macroscopic fat is absent, though contrast washout favors RCC.' },
    ],
    clinicalRecommendations: [
      'Urgent Urological Oncology consultation for staging evaluation and surgical planning (partial vs. radical nephrectomy)',
      'Multi-phase Renal Protocol CT or Contrast MRI to assess renal vein and inferior vena cava patency',
      'Metastatic staging workup including Contrast Chest CT and baseline serum LDH, calcium, and hepatic function',
      'Review kidney function with nephrology to optimize renal reserve prior to planned interventions',
    ],
    saliencyHighlights: [
      { x: 72, y: 56, radius: 15, label: 'Heterogeneous Renal Mass (Tumor)' },
    ],
    clinicalDisclaimer:
      'This algorithmic output is provided for clinical diagnostic support and early triage assistance. Confirmation by a certified radiologist or treating urologist is required before clinical management decisions.',
    timestamp: new Date().toISOString(),
  },

  'sample-normal': {
    isKidneyImage: true,
    anatomicalValidationStatus: 'CONFIRMED_KIDNEY',
    validationDetails:
      'Anatomical verification confirmed: Bilateral kidneys present in retroperitoneal spaces with symmetric contour, normal axis, and preserved corticomedullary junction.',
    detectedSubject: 'Abdominal Axial CT slice with Bilateral Kidneys',
    imagingModality: 'Axial Abdominal Computed Tomography (Standard Window)',
    viewProjection: 'Axial cross-sectional view at renal hilum',
    contrastStatus: 'Standard Soft Tissue Parenchymal Window',
    primaryDiagnosis: 'Normal Unremarkable Kidney Anatomy',
    diagnosticConfidence: 99.1,
    severityLevel: 'Normal',
    referenceDataset: {
      datasetName: 'Kaggle CT Kidney Disease Classification Dataset',
      benchmarkMatch: 'Normal',
      standardClasses: ['Cyst', 'Normal', 'Stone', 'Tumor'],
    },
    morphologicalFindings: {
      keyFeatures: [
        'Symmetric bilateral renal dimensions and smooth capsular contours',
        'Normal corticomedullary differentiation without focal parenchymal thinning',
        'No evidence of radiopaque calculus, cystic cavitation, or solid mass lesion',
        'Renal sinus fat intact; no pelvicalyceal dilation or hydronephrosis',
      ],
      parenchymalIntegrity: 'Uniform cortical thickness and bilateral parenchyma free of focal defects.',
      collectingSystem: 'Normal caliber renal pelvis and calyces without obstruction or filling defects.',
      calculusOrMassDetails: 'No nephrolithiasis, mass, or space-occupying lesion identified.',
    },
    differentialDiagnoses: [
      { condition: 'Normal Unremarkable Renal Anatomy', probability: 99, rationale: 'Complete absence of morphological, density, or architectural abnormalities.' },
      { condition: 'Sub-radiological Micro-nephrolithiasis', probability: 1, rationale: 'No detectable calcifications greater than slice thickness limit.' },
    ],
    clinicalRecommendations: [
      'No acute urological intervention or further renal imaging indicated based on this scan',
      'Maintain standard preventive hydration guidelines (1.5 - 2.5 L/day depending on cardiovascular health)',
      'Routine periodic health maintenance as clinically appropriate',
    ],
    saliencyHighlights: [
      { x: 32, y: 57, radius: 10, label: 'Normal Right Kidney' },
      { x: 68, y: 57, radius: 10, label: 'Normal Left Kidney' },
    ],
    clinicalDisclaimer:
      'This algorithmic output is provided for clinical diagnostic support and early triage assistance. Confirmation by a certified radiologist or treating urologist is required before clinical management decisions.',
    timestamp: new Date().toISOString(),
  },

  'sample-non-kidney': {
    isKidneyImage: false,
    anatomicalValidationStatus: 'REJECTED_NON_KIDNEY',
    validationDetails:
      'The uploaded image depicts a frontal (PA/AP) chest radiograph showcasing thoracic cage, ribs, clavicles, lung fields, and cardiac silhouette. No retroperitoneal renal parenchyma or urinary tract structures exist in this anatomical window.',
    detectedSubject: 'Posteroanterior (PA) Chest Radiograph (Thorax / Lungs / Heart)',
    imagingModality: 'Chest Radiograph (Thoracic Projection X-Ray)',
    viewProjection: 'Posteroanterior (PA) Erect Projection',
    contrastStatus: 'Plain Radiography (Non-contrast)',
    primaryDiagnosis: 'Non-Kidney Image Detected (Thoracic Radiograph)',
    diagnosticConfidence: 99.8,
    severityLevel: 'Normal',
    referenceDataset: {
      datasetName: 'Anatomical Validation Negative Control Protocol',
      benchmarkMatch: 'Non-Kidney / Rejected',
      standardClasses: ['Kidney CT', 'Renal Ultrasound', 'Renal Histology', 'Non-Kidney'],
    },
    morphologicalFindings: {
      keyFeatures: [
        'Bilateral clear thoracic lung fields with rib cage contours',
        'Central cardiac silhouette and mediastinal contours identified',
        'Hemidiaphragms clearly visualized above subdiaphragmatic spaces',
        'Renal silhouettes are not visualizable or evaluable in this thoracic view',
      ],
      parenchymalIntegrity: 'Not applicable: Renal parenchyma absent from field of view.',
      collectingSystem: 'Not applicable: Collecting system absent from field of view.',
      calculusOrMassDetails: 'No renal structures available for pathology assessment.',
    },
    differentialDiagnoses: [
      { condition: 'Thoracic Chest Radiograph', probability: 99, rationale: 'Distinct pulmonary vasculature, clavicular outlines, and cardiac silhouette.' },
    ],
    clinicalRecommendations: [
      'To detect kidney disease, please upload an authentic renal imaging scan (Abdominal CT, Renal Ultrasound, or Renal Biopsy)',
      'For pulmonary or thoracic clinical symptoms, evaluate with appropriate respiratory diagnostics',
    ],
    saliencyHighlights: [],
    clinicalDisclaimer:
      'Anatomical verification guardrail: Kidney disease models are strictly barred from evaluating non-renal imagery to prevent spurious findings and clinical confusion.',
    timestamp: new Date().toISOString(),
  },
};
