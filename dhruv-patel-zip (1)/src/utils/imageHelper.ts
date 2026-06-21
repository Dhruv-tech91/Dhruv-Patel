/**
 * Utility to compress and convert images to lightweight base64 URLs
 * for stable, permanent local persistence within localStorage.
 */
export function compressAndPersistImage(
  file: File,
  onComplete: (base64DataUrl: string) => void,
  maxDimension: number = 800,
  quality: number = 0.75
) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      // Calculate optimized responsive dimensions
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      // Render to canvas for compression
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height); // fill background
        ctx.drawImage(img, 0, 0, width, height);
        
        try {
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          onComplete(compressedBase64);
        } catch (err) {
          console.error("Failed to generate canvas data URL:", err);
          // Fallback to raw base64 if canvas export fails
          if (event.target?.result) {
            onComplete(event.target.result as string);
          }
        }
      } else {
        // Fallback
        if (event.target?.result) {
          onComplete(event.target.result as string);
        }
      }
    };
    img.onerror = () => {
      if (event.target?.result) {
        onComplete(event.target.result as string);
      }
    };
    if (event.target?.result) {
      img.src = event.target.result as string;
    }
  };
  reader.readAsDataURL(file);
}
