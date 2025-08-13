import { describe, it, expect } from 'vitest';
import isVideoValidator from '../isVideo.validator';

describe('isVideoValidator', () => {
  describe('Video file extension detection', () => {
    it('Should return true for supported video extensions in lower case.', () => {
      expect(isVideoValidator('movie.mp4')).toBe(true);
      expect(isVideoValidator('clip.avi')).toBe(true);
      expect(isVideoValidator('film.mov')).toBe(true);
      expect(isVideoValidator('video.mkv')).toBe(true);
      expect(isVideoValidator('sample.webm')).toBe(true);
      expect(isVideoValidator('recording.wmv')).toBe(true);
      expect(isVideoValidator('animation.flv')).toBe(true);
      expect(isVideoValidator('trailer.m4v')).toBe(true);
      expect(isVideoValidator('mobile.3gp')).toBe(true);
      expect(isVideoValidator('mobile.3g2')).toBe(true);
      expect(isVideoValidator('flash.f4v')).toBe(true);
      expect(isVideoValidator('flash.f4p')).toBe(true);
      expect(isVideoValidator('flash.f4a')).toBe(true);
      expect(isVideoValidator('flash.f4b')).toBe(true);
      expect(isVideoValidator('mpeg.mpeg')).toBe(true);
      expect(isVideoValidator('mpeg.mpg')).toBe(true);
      expect(isVideoValidator('mpeg.mpe')).toBe(true);
      expect(isVideoValidator('mpeg.mpv')).toBe(true);
      expect(isVideoValidator('mpeg.m2v')).toBe(true);
      expect(isVideoValidator('open.ogv')).toBe(true);
      expect(isVideoValidator('quick.qt')).toBe(true);
    });

    it('Should return true for supported video extensions in upper or mixed case.', () => {
      expect(isVideoValidator('movie.MP4')).toBe(true);
      expect(isVideoValidator('clip.Avi')).toBe(true);
      expect(isVideoValidator('film.MoV')).toBe(true);
      expect(isVideoValidator('video.MkV')).toBe(true);
      expect(isVideoValidator('sample.WEBM')).toBe(true);
    });

    it('Should return true for files with multiple dots, using the last extension.', () => {
      expect(isVideoValidator('archive.tar.mp4')).toBe(true);
      expect(isVideoValidator('my.video.file.mkv')).toBe(true);
    });
  });

  describe('URL with query parameters and fragments', () => {
    it('Should return true for video files with query parameters.', () => {
      expect(isVideoValidator('movie.mp4?token=abc')).toBe(true);
      expect(isVideoValidator('clip.avi?download=true')).toBe(true);
    });

    it('Should return true for video files with fragments.', () => {
      expect(isVideoValidator('movie.mp4#section')).toBe(true);
      expect(isVideoValidator('clip.avi#start')).toBe(true);
    });

    it('Should return true for video files with both query and fragment.', () => {
      expect(isVideoValidator('movie.mp4?token=abc#section')).toBe(true);
    });

    it('Should return false for non-video files with query or fragment.', () => {
      expect(isVideoValidator('document.txt?token=abc')).toBe(false);
      expect(isVideoValidator('archive.zip#section')).toBe(false);
    });
  });

  describe('Unsupported or invalid extensions', () => {
    it('Should return false for unsupported extensions.', () => {
      expect(isVideoValidator('document.txt')).toBe(false);
      expect(isVideoValidator('archive.zip')).toBe(false);
      expect(isVideoValidator('image.jpeg')).toBe(false);
      expect(isVideoValidator('presentation.pptx')).toBe(false);
    });

    it('Should return false for files ending with a dot.', () => {
      expect(isVideoValidator('video.')).toBe(false);
      expect(isVideoValidator('archive.tar.')).toBe(false);
    });
  });
});
