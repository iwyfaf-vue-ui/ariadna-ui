/**
 * FilterBuilder options.
 */
export enum EFilterBuilderOption {
  NAME = 'FilterBuilder',
}

/**
 * Supported logical operations.
 */
export enum EFilterBuilderLogicOperator {
  AND = 'AND',
  OR = 'OR',
}

/**
 * FilterBuilder errors.
 */
export enum EFilterBuilderErrors {
  FIELDS_LENGTH_NOT_EQUAL_ZERO = 'Количество полей для фильтрации не должно быть равно 0.',
  FIELDS_COUNT_MUST_BE_MORE_THEN_LOGICAL = 'Количество полей должно быть на 1 больше, чем логических операторов.',
  FIELD_NOT_SET = 'Пропущен этап создания ключа билдера.',
  FIELD_IS_NULL = 'Поле - null.',
  FIELD_CHAIN_IS_EMPTY = 'Цепочка полей не может быть пустой.',
  FIELD_CHAIN_IS_ZERO = 'Количество полей на одном условии не может быть равно 0.',
  LOGIC_OPERATORS_WRONG_COUNT = 'Не может быть логических операторов больше или меньше, чем значений для сравнения - 1.',
}
