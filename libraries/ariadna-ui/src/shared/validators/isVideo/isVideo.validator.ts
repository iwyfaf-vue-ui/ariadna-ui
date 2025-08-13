/**
 * Checks if the provided file URL corresponds to a video file based on its extension.
 *
 * @param {string} fileUrl - The URL or path of the file to check.
 * @returns {boolean} - Returns `true` if the file has a recognized video extension, otherwise returns `false`.
 *
 * * @example
 * isVideoValidator('example.mp4'); // true
 * isVideoValidator('example.txt'); // false
 * isVideoValidator('movie.MKV');   // true
 * isVideoValidator('archive.zip'); // false
 */
export default function isVideoValidator(fileUrl: string): boolean {
  const videoExtensions = [
    'mp4',
    'avi',
    'mov',
    'mkv',
    'webm',
    'wmv',
    'flv',
    'm4v',
    '3gp',
    '3g2',
    'f4v',
    'f4p',
    'f4a',
    'f4b',
    'mpeg',
    'mpg',
    'mpe',
    'mpv',
    'm2v',
    'ogv',
    'qt',
  ];

  const cleanFileUrl = fileUrl.split(/[?#]/)[0];
  const ext = cleanFileUrl.split('.').pop()?.toLowerCase();

  return ext ? videoExtensions.includes(ext) : false;
}
