import { SampleScan } from '../types';

// Helper to encode SVG string to data URL
function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// 1. CT Scan with Nephrolithiasis (Kidney Stone) - High-contrast Pure Black & White Radiologic Greyscale
const ctStoneSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  <circle cx="250" cy="250" r="230" fill="#0c0c0c" stroke="#262626" stroke-width="2"/>
  
  <!-- Abdominal Wall and Subcutaneous Fat (Grayscale radiologic densities) -->
  <ellipse cx="250" cy="245" rx="210" ry="175" fill="#1c1c1c" stroke="#404040" stroke-width="3"/>
  <ellipse cx="250" cy="245" rx="195" ry="160" fill="#0a0a0a"/>

  <!-- Spine / Vertebral Body Posterior (Cortical bone is pure bright white, cancellous bone is light gray) -->
  <path d="M 230 330 C 230 310, 270 310, 270 330 C 285 345, 275 375, 250 375 C 225 375, 215 345, 230 330 Z" fill="#d4d4d4" stroke="#ffffff" stroke-width="2"/>
  <circle cx="250" cy="340" r="10" fill="#262626"/>
  <path d="M 250 375 L 250 410" stroke="#a3a3a3" stroke-width="6" stroke-linecap="round"/>
  <path d="M 215 350 L 180 370" stroke="#a3a3a3" stroke-width="4" stroke-linecap="round"/>
  <path d="M 285 350 L 320 370" stroke="#a3a3a3" stroke-width="4" stroke-linecap="round"/>

  <!-- Abdominal Aorta & IVC -->
  <circle cx="236" cy="295" r="14" fill="#525252" stroke="#737373" stroke-width="1.5"/>
  <ellipse cx="266" cy="295" rx="16" ry="12" fill="#404040" stroke="#525252" stroke-width="1.5"/>

  <!-- Liver (Right Ant/Lat - Soft tissue density) -->
  <path d="M 100 180 C 120 120, 240 120, 250 160 C 255 210, 190 260, 120 250 C 95 240, 85 210, 100 180 Z" fill="#3a3a3a" opacity="0.9"/>

  <!-- Spleen (Left Post/Lat) -->
  <ellipse cx="375" cy="220" rx="35" ry="50" fill="#333333" transform="rotate(25 375 220)"/>

  <!-- RIGHT KIDNEY (Normal Appearance) -->
  <g id="right-kidney">
    <ellipse cx="160" cy="285" rx="42" ry="65" fill="#484848" transform="rotate(-15 160 285)" stroke="#666666" stroke-width="1.5"/>
    <!-- Renal Medulla & Calyces -->
    <path d="M 165 260 Q 185 285 165 310" stroke="#222222" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="178" cy="285" rx="10" ry="18" fill="#141414"/>
  </g>

  <!-- LEFT KIDNEY (With High-HU Radiopaque Calculus / Stone) -->
  <g id="left-kidney">
    <ellipse cx="340" cy="285" rx="44" ry="68" fill="#484848" transform="rotate(15 340 285)" stroke="#666666" stroke-width="2"/>
    <!-- Renal sinus and collecting system -->
    <path d="M 335 258 Q 315 285 335 312" stroke="#222222" stroke-width="12" fill="none" stroke-linecap="round"/>
    <ellipse cx="320" cy="285" rx="12" ry="20" fill="#141414"/>

    <!-- RADIOPAQUE STONE FOCUS (Dense White High-HU Calculus) -->
    <circle cx="332" cy="282" r="7" fill="#ffffff" stroke="#e5e5e5" stroke-width="2"/>
    <circle cx="332" cy="282" r="12" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.9"/>
  </g>

  <!-- Clean Monochrome Radiologic Annotations -->
  <text x="30" y="45" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">CT ABDOMEN NON-CONTRAST (NCCT)</text>
  <text x="30" y="65" fill="#a3a3a3" font-family="monospace" font-size="11">WINDOW: B&amp;W RENAL STONE (WW:400 WL:40)</text>
  <text x="30" y="85" fill="#a3a3a3" font-family="monospace" font-size="11">BENCHMARK REF: #KS-8419 • GROUND TRUTH: STONE</text>
  <text x="30" y="470" fill="#737373" font-family="monospace" font-size="12">R (Right)</text>
  <text x="440" y="470" fill="#737373" font-family="monospace" font-size="12">L (Left)</text>
  
  <!-- Monochrome indicator arrow pointing to calculus -->
  <path d="M 410 260 L 348 278" stroke="#ffffff" stroke-width="2"/>
  <text x="415" y="260" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">Renal Calculus (Stone)</text>
</svg>
`;

// 2. CT Scan with Renal Cyst - Clean Black & White
const ctCystSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  <circle cx="250" cy="250" r="230" fill="#0c0c0c" stroke="#262626" stroke-width="2"/>
  
  <ellipse cx="250" cy="245" rx="210" ry="175" fill="#1c1c1c" stroke="#404040" stroke-width="3"/>
  <ellipse cx="250" cy="245" rx="195" ry="160" fill="#0a0a0a"/>

  <!-- Spine Posterior -->
  <path d="M 230 330 C 230 310, 270 310, 270 330 C 285 345, 275 375, 250 375 C 225 375, 215 345, 230 330 Z" fill="#d4d4d4" stroke="#ffffff" stroke-width="2"/>
  <circle cx="250" cy="340" r="10" fill="#262626"/>
  <path d="M 250 375 L 250 410" stroke="#a3a3a3" stroke-width="6" stroke-linecap="round"/>

  <!-- Great Vessels -->
  <circle cx="236" cy="295" r="14" fill="#525252" stroke="#737373" stroke-width="1.5"/>
  <ellipse cx="266" cy="295" rx="16" ry="12" fill="#404040" stroke="#525252" stroke-width="1.5"/>

  <!-- Liver & Spleen -->
  <path d="M 100 180 C 120 120, 240 120, 250 160 C 255 210, 190 260, 120 250 C 95 240, 85 210, 100 180 Z" fill="#3a3a3a" opacity="0.9"/>
  <ellipse cx="375" cy="220" rx="35" ry="50" fill="#333333" transform="rotate(25 375 220)"/>

  <!-- RIGHT KIDNEY WITH HYPODENSE CYST -->
  <g id="right-kidney-cyst">
    <ellipse cx="160" cy="285" rx="45" ry="68" fill="#484848" transform="rotate(-15 160 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="178" cy="285" rx="10" ry="18" fill="#141414"/>
    
    <!-- Cortical Fluid-Density Cyst (Well-circumscribed homogeneous black fluid < 10 HU) -->
    <circle cx="135" cy="275" r="22" fill="#0a0a0a" stroke="#ffffff" stroke-width="1.5"/>
    <ellipse cx="135" cy="275" rx="20" ry="18" fill="#000000" opacity="0.95"/>
  </g>

  <!-- LEFT KIDNEY (Normal) -->
  <g id="left-kidney-normal">
    <ellipse cx="340" cy="285" rx="42" ry="65" fill="#484848" transform="rotate(15 340 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="320" cy="285" rx="12" ry="20" fill="#141414"/>
  </g>

  <!-- Clean Monochrome Radiologic Annotations -->
  <text x="30" y="45" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">CT ABDOMEN CONTRAST (CECT)</text>
  <text x="30" y="65" fill="#a3a3a3" font-family="monospace" font-size="11">WINDOW: RENAL PARENCHYMAL (WW:350 WL:50)</text>
  <text x="30" y="85" fill="#a3a3a3" font-family="monospace" font-size="11">BENCHMARK REF: #RC-3108 • GROUND TRUTH: CYST</text>
  <text x="30" y="470" fill="#737373" font-family="monospace" font-size="12">R (Right)</text>
  <text x="440" y="470" fill="#737373" font-family="monospace" font-size="12">L (Left)</text>

  <!-- Pointer to Cyst -->
  <path d="M 70 240 L 125 268" stroke="#ffffff" stroke-width="2"/>
  <text x="35" y="235" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">Renal Cortical Cyst</text>
</svg>
`;

// 3. CT Scan with Renal Tumor (Renal Cell Carcinoma / RCC) - Clean Black & White
const ctTumorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  <circle cx="250" cy="250" r="230" fill="#0c0c0c" stroke="#262626" stroke-width="2"/>
  
  <ellipse cx="250" cy="245" rx="210" ry="175" fill="#1c1c1c" stroke="#404040" stroke-width="3"/>
  <ellipse cx="250" cy="245" rx="195" ry="160" fill="#0a0a0a"/>

  <!-- Spine Posterior -->
  <path d="M 230 330 C 230 310, 270 310, 270 330 C 285 345, 275 375, 250 375 C 225 375, 215 345, 230 330 Z" fill="#d4d4d4" stroke="#ffffff" stroke-width="2"/>
  <circle cx="250" cy="340" r="10" fill="#262626"/>
  <path d="M 250 375 L 250 410" stroke="#a3a3a3" stroke-width="6" stroke-linecap="round"/>

  <!-- Great vessels -->
  <circle cx="236" cy="295" r="14" fill="#525252" stroke="#737373" stroke-width="1.5"/>
  <ellipse cx="266" cy="295" rx="16" ry="12" fill="#404040" stroke="#525252" stroke-width="1.5"/>

  <!-- Liver & Spleen -->
  <path d="M 100 180 C 120 120, 240 120, 250 160 C 255 210, 190 260, 120 250 C 95 240, 85 210, 100 180 Z" fill="#3a3a3a" opacity="0.9"/>
  <ellipse cx="375" cy="220" rx="35" ry="50" fill="#333333" transform="rotate(25 375 220)"/>

  <!-- RIGHT KIDNEY (Normal) -->
  <g id="right-kidney-normal">
    <ellipse cx="160" cy="285" rx="42" ry="65" fill="#484848" transform="rotate(-15 160 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="178" cy="285" rx="10" ry="18" fill="#141414"/>
  </g>

  <!-- LEFT KIDNEY WITH LARGE HETEROGENEOUS EXPANSIVE TUMOR -->
  <g id="left-kidney-tumor">
    <ellipse cx="340" cy="285" rx="46" ry="72" fill="#484848" transform="rotate(15 340 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="320" cy="295" rx="10" ry="16" fill="#141414"/>
    
    <!-- Heterogeneous Exophytic Renal Mass (Tumor / RCC) -->
    <path d="M 330 230 C 370 215, 395 240, 390 280 C 385 315, 355 330, 335 310 C 315 295, 310 255, 330 230 Z" fill="#737373" stroke="#ffffff" stroke-width="2"/>
    
    <!-- Central necrosis / low-density core & hyperdense rim -->
    <circle cx="355" cy="268" r="14" fill="#262626" stroke="#d4d4d4" stroke-width="1.5"/>
    <path d="M 345 250 Q 365 245 375 270" stroke="#ffffff" stroke-width="1.5" fill="none"/>
    <path d="M 360 285 Q 380 295 385 275" stroke="#e5e5e5" stroke-width="1.5" fill="none"/>
  </g>

  <!-- Clean Monochrome Radiologic Annotations -->
  <text x="30" y="45" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">CT ABDOMEN CECT (CORTICOMEDULLARY)</text>
  <text x="30" y="65" fill="#a3a3a3" font-family="monospace" font-size="11">WINDOW: ARTERIAL/VENOUS (WW:400 WL:50)</text>
  <text x="30" y="85" fill="#a3a3a3" font-family="monospace" font-size="11">BENCHMARK REF: #RT-9924 • GROUND TRUTH: TUMOR</text>
  <text x="30" y="470" fill="#737373" font-family="monospace" font-size="12">R (Right)</text>
  <text x="440" y="470" fill="#737373" font-family="monospace" font-size="12">L (Left)</text>

  <!-- Pointer to Tumor -->
  <path d="M 425 210 L 375 245" stroke="#ffffff" stroke-width="2"/>
  <text x="370" y="198" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">Heterogeneous Tumor</text>
</svg>
`;

// 4. CT Scan Normal Kidney - Clean Black & White
const ctNormalSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  <circle cx="250" cy="250" r="230" fill="#0c0c0c" stroke="#262626" stroke-width="2"/>
  
  <ellipse cx="250" cy="245" rx="210" ry="175" fill="#1c1c1c" stroke="#404040" stroke-width="3"/>
  <ellipse cx="250" cy="245" rx="195" ry="160" fill="#0a0a0a"/>

  <!-- Spine Posterior -->
  <path d="M 230 330 C 230 310, 270 310, 270 330 C 285 345, 275 375, 250 375 C 225 375, 215 345, 230 330 Z" fill="#d4d4d4" stroke="#ffffff" stroke-width="2"/>
  <circle cx="250" cy="340" r="10" fill="#262626"/>
  <path d="M 250 375 L 250 410" stroke="#a3a3a3" stroke-width="6" stroke-linecap="round"/>

  <!-- Great vessels -->
  <circle cx="236" cy="295" r="14" fill="#525252" stroke="#737373" stroke-width="1.5"/>
  <ellipse cx="266" cy="295" rx="16" ry="12" fill="#404040" stroke="#525252" stroke-width="1.5"/>

  <!-- Liver & Spleen -->
  <path d="M 100 180 C 120 120, 240 120, 250 160 C 255 210, 190 260, 120 250 C 95 240, 85 210, 100 180 Z" fill="#3a3a3a" opacity="0.9"/>
  <ellipse cx="375" cy="220" rx="35" ry="50" fill="#333333" transform="rotate(25 375 220)"/>

  <!-- BILATERAL NORMAL KIDNEYS -->
  <!-- Right Kidney Normal -->
  <g id="right-kidney-normal">
    <ellipse cx="160" cy="285" rx="42" ry="65" fill="#484848" transform="rotate(-15 160 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="178" cy="285" rx="11" ry="18" fill="#141414"/>
    <path d="M 168 260 Q 185 285 168 310" stroke="#262626" stroke-width="8" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Left Kidney Normal -->
  <g id="left-kidney-normal">
    <ellipse cx="340" cy="285" rx="42" ry="65" fill="#484848" transform="rotate(15 340 285)" stroke="#666666" stroke-width="1.5"/>
    <ellipse cx="322" cy="285" rx="11" ry="18" fill="#141414"/>
    <path d="M 332 260 Q 315 285 332 310" stroke="#262626" stroke-width="8" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Clean Monochrome Radiologic Annotations -->
  <text x="30" y="45" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">CT ABDOMEN AXIAL (NORMAL UNREMARKABLE)</text>
  <text x="30" y="65" fill="#a3a3a3" font-family="monospace" font-size="11">WINDOW: SOFT TISSUE (WW:400 WL:40)</text>
  <text x="30" y="85" fill="#a3a3a3" font-family="monospace" font-size="11">BENCHMARK REF: #NK-1045 • GROUND TRUTH: NORMAL</text>
  <text x="30" y="470" fill="#737373" font-family="monospace" font-size="12">R (Right)</text>
  <text x="440" y="470" fill="#737373" font-family="monospace" font-size="12">L (Left)</text>
  <text x="170" y="450" fill="#d4d4d4" font-family="monospace" font-size="11">Preserved corticomedullary contours</text>
</svg>
`;

// 5. Non-Kidney Negative Control (Chest Radiograph / Ribs / Lungs) - Clean Black & White
const nonKidneyChestXraySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  
  <!-- Thoracic Cavity Outlines -->
  <ellipse cx="250" cy="280" rx="200" ry="190" fill="#0a0a0a" stroke="#262626" stroke-width="2"/>

  <!-- Cervical / Thoracic Spine Center -->
  <rect x="242" y="40" width="16" height="420" fill="#a3a3a3" opacity="0.8"/>
  
  <!-- Clavicles -->
  <path d="M 100 100 Q 180 80 240 100" stroke="#e5e5e5" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M 400 100 Q 320 80 260 100" stroke="#e5e5e5" stroke-width="8" stroke-linecap="round" fill="none"/>

  <!-- Ribs Rib Cage (Thoracic - NOT Kidney) -->
  <path d="M 240 130 Q 140 145 90 200" stroke="#737373" stroke-width="5" fill="none"/>
  <path d="M 260 130 Q 360 145 410 200" stroke="#737373" stroke-width="5" fill="none"/>

  <path d="M 240 170 Q 130 190 85 250" stroke="#737373" stroke-width="5" fill="none"/>
  <path d="M 260 170 Q 370 190 415 250" stroke="#737373" stroke-width="5" fill="none"/>

  <path d="M 240 210 Q 125 240 90 310" stroke="#737373" stroke-width="5" fill="none"/>
  <path d="M 260 210 Q 375 240 410 310" stroke="#737373" stroke-width="5" fill="none"/>

  <!-- Lung Fields (Black Radiolucent) -->
  <path d="M 120 120 C 100 200, 95 320, 160 360 C 220 380, 230 300, 230 160 Z" fill="#000000"/>
  <path d="M 380 120 C 400 200, 405 320, 340 360 C 280 380, 270 300, 270 160 Z" fill="#000000"/>

  <!-- Cardiac Silhouette in Chest (Heart) -->
  <path d="M 230 230 C 210 260, 180 320, 230 370 C 260 380, 280 370, 270 280 Z" fill="#737373" opacity="0.6"/>

  <!-- Diaphragm domes -->
  <path d="M 70 380 Q 160 330 250 370 Q 340 330 430 380" stroke="#525252" stroke-width="4" fill="none"/>

  <!-- Clean Monochrome Non-Kidney Annotations -->
  <text x="30" y="40" fill="#ffffff" font-family="monospace" font-size="13" font-weight="bold">CHEST RADIOGRAPH (PA VIEW) - NEGATIVE CONTROL</text>
  <text x="30" y="60" fill="#a3a3a3" font-family="monospace" font-size="11">TARGET: THORAX / PULMONARY &amp; CARDIAC SILHOUETTE</text>
  <text x="30" y="80" fill="#e5e5e5" font-family="monospace" font-size="11">CONTROL STATUS: NON-KIDNEY (MUST BE REJECTED)</text>
  <text x="30" y="470" fill="#737373" font-family="monospace" font-size="12">R (Right)</text>
  <text x="440" y="470" fill="#737373" font-family="monospace" font-size="12">L (Left)</text>
</svg>
`;

export const SAMPLE_SCANS: SampleScan[] = [
  {
    id: 'sample-stone',
    name: 'Renal Calculus (Kidney Stone)',
    category: 'Stone',
    datasetSource: 'Kaggle CT Kidney Dataset (#KS-8419)',
    description: 'Non-contrast axial CT slice showing hyperdense radio-opaque calculus (stone) in left renal pelvis.',
    modality: 'NCCT Abdomen/Pelvis (B&W)',
    imageUrl: svgToDataUrl(ctStoneSvg),
    expectedValidation: true,
  },
  {
    id: 'sample-cyst',
    name: 'Renal Cortical Cyst',
    category: 'Cyst',
    datasetSource: 'Kaggle CT Kidney Dataset (#RC-3108)',
    description: 'Contrast CT showing a well-circumscribed, homogeneous hypodense fluid cyst in the right kidney cortex.',
    modality: 'CECT Abdomen (Nephrographic)',
    imageUrl: svgToDataUrl(ctCystSvg),
    expectedValidation: true,
  },
  {
    id: 'sample-tumor',
    name: 'Renal Cell Carcinoma (Tumor)',
    category: 'Tumor',
    datasetSource: 'TCGA-KIRC / CT Kidney Benchmark (#RT-9924)',
    description: 'Heterogeneous exophytic renal cortical mass with hypervascular rim and central necrosis.',
    modality: 'CECT Abdomen (Arterial/Venous)',
    imageUrl: svgToDataUrl(ctTumorSvg),
    expectedValidation: true,
  },
  {
    id: 'sample-normal',
    name: 'Healthy Normal Kidneys',
    category: 'Normal',
    datasetSource: 'Kaggle CT Kidney Dataset (#NK-1045)',
    description: 'Unremarkable bilateral renal parenchyma, symmetric corticomedullary differentiation, no calculus.',
    modality: 'Axial Abdominal CT (B&W)',
    imageUrl: svgToDataUrl(ctNormalSvg),
    expectedValidation: true,
  },
  {
    id: 'sample-non-kidney',
    name: 'Chest Radiograph (Non-Kidney)',
    category: 'Non-Kidney (Control)',
    datasetSource: 'Thoracic Imaging Benchmark (Negative Control)',
    description: 'Frontal chest X-ray showing lungs, ribs, and heart. Tests anatomical validation & rejection.',
    modality: 'Chest Radiograph (X-Ray)',
    imageUrl: svgToDataUrl(nonKidneyChestXraySvg),
    expectedValidation: false,
  },
];
