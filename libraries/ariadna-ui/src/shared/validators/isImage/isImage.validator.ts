/**
 * Checks if the provided file URL corresponds to a common image file format based on its extension.
 *
 * @param {string} fileUrl - The URL or path of the file to validate as an image.
 * @returns {boolean} - Returns `true` if the file extension matches a known image format, otherwise `false`.
 *
 * @example
 * isImageValidator('photo.png'); // true
 * isImageValidator('document.pdf'); // false
 * isImageValidator('https://example.com/image.jpeg?size=large'); // true
 */
export default function isImageValidator(fileUrl: string): boolean {
  const imageExtensions = [
    'png',
    'jpg',
    'jpeg',
    'jfif',
    'pjpeg',
    'pjp',
    'gif',
    'bmp',
    'webp',
    'heic',
    'heif',
    'ico',
    'svg',
    'tiff',
    'tif',
    'avif',
  ];

  const cleanFileUrl = fileUrl.split(/[?#]/)[0];
  const ext = cleanFileUrl.split('.').pop()?.toLowerCase();

  return ext ? imageExtensions.includes(ext) : false;
}
