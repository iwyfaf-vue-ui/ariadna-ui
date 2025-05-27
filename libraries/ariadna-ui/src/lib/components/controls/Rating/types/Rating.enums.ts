/**
 * Rating config.
 */
export enum ERatingConfig {
  NAME = 'Rating',
}

/**
 * Rating default props values.
 */
export enum ERatingPropsDefault {
  STAR_COUNT = 5,
  FILL_STEP = 1,
  VALUE_POSITION = 'right',
  SIZE = 'medium',
  CSS_CLASS = 'ar-rating',
}

/**
 * Rating errors.
 */
export enum ERatingErrors {
  MUST_NOT_BE_A_ZERO = 'The multiple "m" must not be zero.',
}
