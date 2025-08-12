import type { IIframeVideoHelper } from './types/IframeVideoHelper.types';
import { EIframeVideoHelperHosts } from './types/IframeVideoHelper.types';

export default class IframeVideoHelper implements IIframeVideoHelper {
  /**
   * An object with supported hosts and their domains.
   *
   * @type {Record<string, Array<string>>}
   *
   * @example
   * {
   *   youtube: ["youtube.com", "youtu.be"],
   *   rutube: ["rutube.ru"]
   * }
   */
  static supportedHosts: Record<string, Array<string>> = {
    [EIframeVideoHelperHosts.YOUTUBE]: ['youtube.com', 'youtu.be'],
    [EIframeVideoHelperHosts.RUTUBE]: ['rutube.ru'],
  };

  /**
   * Store for a list of registered iframes and their host.
   *
   * @type {Map<HTMLIFrameElement, string>}
   * @private
   */
  private iframes: Map<HTMLIFrameElement, string> = new Map();

  /**
   * Checks if the provided URL belongs to a supported video host.
   * @param {string} url - The URL string to check.
   *
   * @returns {boolean}
   */
  static isSupported(url: string): boolean {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      return Object.values(IframeVideoHelper.supportedHosts).some((domains) =>
        domains.includes(hostname),
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Converts a video URL from a supported host into its embeddable iframe URL.
   *
   * @param {string} url - The original video URL.
   *
   * @returns {string | undefined} - The embeddable iframe URL as a string, or `undefined` if the URL is not supported
   * or invalid (src attribute required undefined).
   */
  static getIframeUrl(url: string): string | undefined {
    if (!this.isSupported(url)) {
      return undefined;
    }

    try {
      const parsedUrl = new URL(url);
      const hostType = Object.entries(this.supportedHosts).find(([_, domains]) =>
        domains.includes(parsedUrl.hostname.replace('www.', '')),
      )?.[0];

      switch (hostType) {
        case EIframeVideoHelperHosts.YOUTUBE:
          const videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
          return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : undefined;

        case EIframeVideoHelperHosts.RUTUBE:
          let rutubeId = parsedUrl.pathname.split('/').pop();

          if (parsedUrl.pathname.endsWith('/')) {
            rutubeId = parsedUrl.pathname.split('/').at(-2);
          }
          return `https://rutube.ru/play/embed/${rutubeId}`;

        default:
          return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }

  public registerIframe(iframe: HTMLIFrameElement): void {
    const parsedUrl = new URL(iframe.src);
    const hostType = Object.entries(IframeVideoHelper.supportedHosts).find(([_, domains]) =>
      domains.includes(parsedUrl.hostname.replace('www.', '')),
    )?.[0];

    if (!hostType) {
      return;
    }

    this.iframes.set(iframe, hostType);
  }

  public play(iframe: HTMLIFrameElement): void {
    const hostType = this.iframes.get(iframe);
    if (!hostType) {
      return;
    }

    switch (hostType) {
      case EIframeVideoHelperHosts.YOUTUBE:
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo' }),
          '*',
        );
        break;

      case EIframeVideoHelperHosts.RUTUBE:
        iframe.contentWindow?.postMessage(JSON.stringify({ type: 'player:play' }), '*');
        break;

      default:
        break;
    }
  }

  public stop(iframe: HTMLIFrameElement): void {
    const hostType = this.iframes.get(iframe);

    if (!hostType) {
      return;
    }

    switch (hostType) {
      case EIframeVideoHelperHosts.YOUTUBE:
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*',
        );
        break;

      case EIframeVideoHelperHosts.RUTUBE:
        iframe.contentWindow?.postMessage(JSON.stringify({ type: 'player:pause' }), '*');
        break;

      default:
        break;
    }
  }

  public playAll(): void {
    this.iframes.forEach((_, iframe) => this.play(iframe));
  }

  public stopAll(): void {
    this.iframes.forEach((_, iframe) => this.stop(iframe));
  }

  public clear(): void {
    this.iframes.clear();
  }
}
