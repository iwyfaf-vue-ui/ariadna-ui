import { describe, it, expect } from 'vitest';
import isImageValidator from '../isImage.validator';

describe('isImageValidator', () => {
  describe('Image extension validation', () => {
    it('Should return true for common image extensions in lowercase.', () => {
      expect(isImageValidator('photo.png')).toBe(true);
      expect(isImageValidator('picture.jpg')).toBe(true);
      expect(isImageValidator('image.jpeg')).toBe(true);
      expect(isImageValidator('icon.ico')).toBe(true);
      expect(isImageValidator('vector.svg')).toBe(true);
      expect(isImageValidator('scan.tiff')).toBe(true);
      expect(isImageValidator('scan.tif')).toBe(true);
      expect(isImageValidator('photo.webp')).toBe(true);
      expect(isImageValidator('photo.heic')).toBe(true);
      expect(isImageValidator('photo.heif')).toBe(true);
      expect(isImageValidator('photo.avif')).toBe(true);
      expect(isImageValidator('photo.jfif')).toBe(true);
      expect(isImageValidator('photo.pjpeg')).toBe(true);
      expect(isImageValidator('photo.pjp')).toBe(true);
      expect(isImageValidator('photo.bmp')).toBe(true);
      expect(isImageValidator('photo.gif')).toBe(true);
    });

    it('Should return true for image extensions in uppercase.', () => {
      expect(isImageValidator('photo.PNG')).toBe(true);
      expect(isImageValidator('picture.JPG')).toBe(true);
      expect(isImageValidator('image.JPEG')).toBe(true);
      expect(isImageValidator('icon.ICO')).toBe(true);
      expect(isImageValidator('vector.SVG')).toBe(true);
    });

    it('Should return true for image extensions with query parameters.', () => {
      expect(isImageValidator('photo.png?size=large')).toBe(true);
      expect(isImageValidator('picture.jpg?download=true')).toBe(true);
      expect(isImageValidator('image.jpeg?foo=bar')).toBe(true);
    });

    it('Should return true for image extensions with hash fragments.', () => {
      expect(isImageValidator('photo.png#section')).toBe(true);
      expect(isImageValidator('picture.jpg#top')).toBe(true);
      expect(isImageValidator('image.jpeg#anchor')).toBe(true);
    });

    it('Should return true for image extensions with both query and hash.', () => {
      expect(isImageValidator('photo.png?size=large#section')).toBe(true);
      expect(isImageValidator('picture.jpg?download=true#top')).toBe(true);
    });

    it('Should return true for image extensions in file paths and URLs.', () => {
      expect(isImageValidator('/path/to/photo.png')).toBe(true);
      expect(isImageValidator('https://example.com/image.jpeg')).toBe(true);
      expect(isImageValidator('C:\\images\\picture.jpg')).toBe(true);
    });
  });

  describe('Non-image extension validation', () => {
    it('Should return false for non-image extensions.', () => {
      expect(isImageValidator('document.pdf')).toBe(false);
      expect(isImageValidator('archive.zip')).toBe(false);
      expect(isImageValidator('music.mp3')).toBe(false);
      expect(isImageValidator('video.mp4')).toBe(false);
      expect(isImageValidator('spreadsheet.xlsx')).toBe(false);
      expect(isImageValidator('presentation.pptx')).toBe(false);
      expect(isImageValidator('text.txt')).toBe(false);
    });

    it('Should return false for files without extension.', () => {
      expect(isImageValidator('file')).toBe(false);
      expect(isImageValidator('file?param=value')).toBe(false);
      expect(isImageValidator('file#hash')).toBe(false);
      expect(isImageValidator('file?param=value#hash')).toBe(false);
    });

    it('Should return false for empty string.', () => {
      expect(isImageValidator('')).toBe(false);
    });

    it('Should return false for files with only a dot at the end.', () => {
      expect(isImageValidator('file.')).toBe(false);
      expect(isImageValidator('file.?param=value')).toBe(false);
    });

    it('Should return true for extensions with leading dot as filename.', () => {
      expect(isImageValidator('.png')).toBe(true);
      expect(isImageValidator('.jpg')).toBe(true);
    });

    it('Should return false for files with spaces or special characters in extension.', () => {
      expect(isImageValidator('photo.p ng')).toBe(false);
      expect(isImageValidator('photo.p@ng')).toBe(false);
      expect(isImageValidator('photo.pn#g')).toBe(false);
    });

    it('Should return false for files with multiple extensions (archive.tar.gz).', () => {
      expect(isImageValidator('archive.tar.gz')).toBe(false);
      expect(isImageValidator('archive.tar.gz?foo=bar')).toBe(false);
    });
  });
});
