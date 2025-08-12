import type { IIframeVideoHelper } from './types/IframeVideoHelper.types';

/**
 * Ariadna UI | Utilities | IframeVideoHelper
 *
 * Helper class for managing and controlling video iframes from supported hosts (e.g., YouTube, Rutube, Vimeo).
 *
 * Provides methods to register, play, stop, and clear video iframes, as well as utility functions for host support
 * and iframe URL extraction.
 */
declare class IframeVideoHelper implements IIframeVideoHelper {
  constructor();

  static supportedHosts: Record<string, Array<string>>;
  static isSupported(url: string): boolean;
  static getIframeUrl(url: string): string | undefined;
  registerIframe(iframe: HTMLIFrameElement): void;
  play(iframe: HTMLIFrameElement): void;
  stop(iframe: HTMLIFrameElement): void;
  playAll(): void;
  stopAll(): void;
  clear(): void;
}

export default IframeVideoHelper;
