import { describe, it, expect, vi } from 'vitest';
import IframeVideoHelper from '../IframeVideoHelper';

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=abcd1234';
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/abcd1234?enablejsapi=1';
const RUTUBE_VIDEO_URL = 'https://rutube.ru/video/abcd1234';
const RUTUBE_EMBED_URL = 'https://rutube.ru/play/embed/abcd1234';
const INVALID_URL = 'https://example.com/video/abcd1234';

describe('VideoEmbedHelper: Basic functionality', () => {
  describe('isSupported', () => {
    it('Should correctly identify supported hosts.', () => {
      expect(IframeVideoHelper.isSupported(YOUTUBE_VIDEO_URL)).toBe(true);
      expect(IframeVideoHelper.isSupported(RUTUBE_VIDEO_URL)).toBe(true);
      expect(IframeVideoHelper.isSupported(INVALID_URL)).toBe(false);
    });
  });

  describe('getIframeUrl', () => {
    it('Should generate correct iframe URLs.', () => {
      expect(IframeVideoHelper.getIframeUrl(YOUTUBE_VIDEO_URL)).toBe(YOUTUBE_EMBED_URL);
      expect(IframeVideoHelper.getIframeUrl(RUTUBE_VIDEO_URL)).toBe(RUTUBE_EMBED_URL);
      expect(IframeVideoHelper.getIframeUrl(INVALID_URL)).toBeUndefined();
    });
  });

  describe('registerIframe', () => {
    it('Should register the iframe and associate it with the host.', () => {
      const helper = new IframeVideoHelper();
      const iframe = document.createElement('iframe');
      iframe.src = YOUTUBE_EMBED_URL;

      helper.registerIframe(iframe);
      expect(helper['iframes'].has(iframe)).toBe(true);
    });
  });

  describe('play', () => {
    it('Should send the YouTube iframe playback command.', () => {
      const helper = new IframeVideoHelper();
      const iframe = document.createElement('iframe');
      iframe.src = YOUTUBE_EMBED_URL;
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: vi.fn() },
        writable: false,
      });

      helper.registerIframe(iframe);
      helper.play(iframe);

      expect(iframe.contentWindow?.postMessage).toHaveBeenCalledWith(
        JSON.stringify({ event: 'command', func: 'playVideo' }),
        '*',
      );
    });
  });

  describe('stop', () => {
    it('Should send the pause command to the YouTube iframe.', () => {
      const helper = new IframeVideoHelper();
      const iframe = document.createElement('iframe');
      iframe.src = YOUTUBE_EMBED_URL;
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: vi.fn() },
        writable: false,
      });

      helper.registerIframe(iframe);
      helper.stop(iframe);

      expect(iframe.contentWindow?.postMessage).toHaveBeenCalledWith(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*',
      );
    });
  });

  describe('clear', () => {
    it('Must clear all registered iframes..', () => {
      const helper = new IframeVideoHelper();
      const iframe1 = document.createElement('iframe');
      iframe1.src = YOUTUBE_EMBED_URL;
      const iframe2 = document.createElement('iframe');
      iframe2.src = RUTUBE_EMBED_URL;

      helper.registerIframe(iframe1);
      helper.registerIframe(iframe2);
      expect(helper['iframes'].size).toBe(2);

      helper.clear();
      expect(helper['iframes'].size).toBe(0);
    });
  });
});
