/**
 * Toast config.
 */
export enum EToastConfig {
  NAME = 'Toast',
}

/**
 * Toast default props values.
 */
export enum EToastPropsDefault {
  POSITION_Y = 'top',
  POSITION_X = 'right',
  GROUP = 'default',
  TRANSITION = 'fade-in',
  APPEND_TO = 'body',
  CSS_CLASS = 'ar-toast',
}

/**
 * Enum representing the available API actions and lifecycle events for the Toast component.
 */
export enum EToastApi {
  ON_CREATED = 'ON_CREATED',
  ON_MOUNTED = 'ON_MOUNTED',
  ON_UNMOUNTED = 'ON_UNMOUNTED',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REMOVE_GROUP = 'REMOVE_GROUP',
  REMOVE_ALL = 'REMOVE_ALL',
}

/**
 * Toast errors.
 */
export enum EViewerErrors {
  NOT_INSTALL_SERVICE = 'ToastService is not registered. Please install it as a plugin before using the Toast component.',
}
