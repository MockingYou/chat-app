export const compressImage = (file, { maxWidth = 1024, quality = 0.7 } = {}) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)

      const base64 = canvas.toDataURL('image/jpeg', quality)
      console.log(`Compressed: ${(base64.length / 1024 / 1024).toFixed(2)}MB`)
      resolve(base64)
    }

    img.onerror = reject
    img.src = url
  })
}