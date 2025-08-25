/**
 * Viewer config.
 */
export enum EViewerConfig {
  NAME = 'Viewer',
}

/**
 * Viewer default props values.
 */
export enum EViewerPropsDefault {
  MOVE_SLOW_FACTOR = 1,
  RESIZE_CALCULATION_MS = 300,
  SWIPE_VERGE = 10,
  ZOOM_STEP = 10,
  ZOOM_MAX = 100,
  APPEND_TO = 'body',
  CSS_CLASS = 'ar-viewer',
}

/**
 * Enum representing the supported media types for the Viewer component.
 */
export enum EViewerMedia {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  IFRAME = 'IFRAME',
  EMPTY = 'EMPTY',
}

/**
 * Enum representing the available API actions and lifecycle events for the Viewer component.
 */
export enum EViewerApi {
  SET_GALLERY = 'SET_GALLERY',
  SET_ZOOM = 'SET_ZOOM',
  SET_LOOP = 'SET_LOOP',
  SET_SWIPE = 'SET_SWIPE',
  SET_SRC_KEY = 'SET_SRC_KEY',
  SET_SHOW_GALLERY = 'SET_SHOW_GALLERY',
  OPEN = 'OPEN',
  NEXT = 'NEXT',
  PREV = 'PREV',
  GO_TO = 'GO_TO',
  OPEN_WITH_GALLERY = 'OPEN_WITH_GALLERY',
  ON_CREATED = 'ON_CREATED',
  ON_MOUNTED = 'ON_MOUNTED',
  ON_UNMOUNTED = 'ON_UNMOUNTED',
}

/**
 * Viewer errors.
 */
export enum EViewerErrors {
  IFRAME_VIDEO_HELPER_NOT_SPECIFIED = 'IframeVideoHelper is not specified.',
  COULD_NOT_REGISTER_IFRAME = 'The iframe could not be registered, check the plug-in element..',
}
