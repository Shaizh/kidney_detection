export async function ensureRasterImageDataUrl(imageUrl: string): Promise<string> {
  // If already standard raster format and base64 encoded, return as is
  if (
    (imageUrl.startsWith('data:image/png;base64') ||
      imageUrl.startsWith('data:image/jpeg;base64') ||
      imageUrl.startsWith('data:image/webp;base64')) &&
    imageUrl.length > 100
  ) {
    return imageUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const width = img.naturalWidth || 500;
        const height = img.naturalHeight || 500;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#080a0f';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const pngUrl = canvas.toDataURL('image/png', 0.95);
          resolve(pngUrl);
        } else {
          resolve(imageUrl);
        }
      } catch (e) {
        console.warn('Canvas rasterization fallback:', e);
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      resolve(imageUrl);
    };

    img.src = imageUrl;
  });
}
