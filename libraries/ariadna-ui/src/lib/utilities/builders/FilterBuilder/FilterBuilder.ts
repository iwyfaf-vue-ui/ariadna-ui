import type {
  IFilterBuilder,
  TFilterBuilderCallback,
  TFilterBuilderCallbackCondition,
  TFilterBuilderField,
  TFilterBuilderFullField,
  TFilterBuilderMapCallback,
  TFilterBuilderMapCallbackReturn,
  TFilterBuilderNestedKey,
} from './types/FilterBuilder.types';
import {
  EFilterBuilderErrors,
  EFilterBuilderLogicOperator,
  EFilterBuilderOption,
} from './types/FilterBuilder.enum';
import { ELibraryConfig } from '@/types/internal';

export default class FilterBuilder<Entity> implements IFilterBuilder<Entity> {
  /**
   * Clone of original array data.
   *
   * @type {Array<Entity>}
   * @private
   */
  private clonedData: Array<Entity> = [];

  /**
   * Fields that will be used for filtering.
   *
   * @type {TFilterBuilderFullField<Entity>[][]}
   * @private
   */
  private fields: TFilterBuilderFullField<Entity>[][] = [];

  /**
   * Current filtered field.
   *
   * @type {TFilterBuilderField<Entity> | null}
   * @private
   */
  private currentField: TFilterBuilderField<Entity> | null = null;

  /**
   * Current filtered fields chaining row.
   *
   * @type {TFilterBuilderFullField<Entity>[]}
   * @private
   */
  private currentFieldsRow: TFilterBuilderFullField<Entity>[] = [];

  /**
   * Array of logic operators.
   *
   * @type {Array<EFilterBuilderLogicOperator>}
   * @private
   */
  private logicOperators: Array<EFilterBuilderLogicOperator> = [];

  constructor(private data: Array<Entity>) {
    this.clonedData = JSON.parse(JSON.stringify(this.data)) as Array<Entity>;
  }

  public select(field: TFilterBuilderNestedKey<Entity>): IFilterBuilder<Entity> {
    if (this.currentField) {
      this.closeCurrentField();
    }

    this.openCurrentField();

    if (!this.currentField) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELD_NOT_SET}`,
      );
    }

    this.currentField = {
      ...this.currentField,
      field,
    };

    return this;
  }

  public or(): IFilterBuilder<Entity> {
    this.closeCurrentField();
    this.closeCurrentFieldsRow();
    this.logicOperators.push(EFilterBuilderLogicOperator.OR);
    this.openCurrentFieldsRow();

    return this;
  }

  public and(): IFilterBuilder<Entity> {
    this.closeCurrentField();
    this.closeCurrentFieldsRow();
    this.logicOperators.push(EFilterBuilderLogicOperator.AND);
    this.openCurrentFieldsRow();

    return this;
  }

  public configureFields(
    fields: TFilterBuilderFullField<Entity>[][],
    logicOperators?: Array<EFilterBuilderLogicOperator> | EFilterBuilderLogicOperator,
  ): IFilterBuilder<Entity> {
    this.reset();
    this.fields = fields;

    if (Array.isArray(logicOperators)) {
      this.logicOperators = logicOperators || [];
    } else if (logicOperators) {
      this.logicOperators = Array.from({ length: fields.length - 1 }, () => logicOperators);
    }

    return this;
  }

  filter<FilterItem = string>(callback: TFilterBuilderCallback<FilterItem, Entity>): Array<Entity> {
    if (this.currentField) {
      this.closeCurrentField();
      this.closeCurrentFieldsRow();
    }

    if (this.currentFieldsRow.length) {
      this.closeCurrentFieldsRow();
    }

    if (!this.fields.length)
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELDS_LENGTH_NOT_EQUAL_ZERO}`,
      );

    if (this.logicOperators.length !== 0 && this.fields.length !== this.logicOperators.length + 1)
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELDS_COUNT_MUST_BE_MORE_THEN_LOGICAL}`,
      );

    let logicValues: Map<number, boolean> = new Map<number, boolean>();

    const recursive = (
      data: Array<Entity>,
      fields: TFilterBuilderFullField<Entity>[][],
      conditionIndex: number = 0,
      main: boolean = false,
    ) => {
      return this.filterMap(data, (item) => {
        const fieldsCopy = JSON.parse(
          JSON.stringify(fields),
        ) as TFilterBuilderFullField<Entity>[][];
        const callbackResult: TFilterBuilderMapCallbackReturn<Entity> = {};

        if (main) {
          logicValues = new Map<number, boolean>();
        }

        for (let i = conditionIndex; i < fieldsCopy.length; i++) {
          const fieldsRow = fieldsCopy[i];
          const currentLogicOperator = this.logicOperators[i - 1] || this.logicOperators[i];
          const fullItem = item;
          let nestedItem = fullItem;

          if (!main && i > conditionIndex) break;

          const condition: TFilterBuilderCallbackCondition<Entity> = {
            index: i - 1 < 0 ? i : i - 1,
            operator: currentLogicOperator,
            fieldName: '',
          };

          for (let j = 0; j < fieldsRow.length; j++) {
            const field = fieldsRow[j];
            const fieldItem = nestedItem[field.field as keyof Entity] as FilterItem;

            condition.fieldName = (field.field as TFilterBuilderNestedKey<Entity>) || '';

            if (!Array.isArray(fieldItem) && !fieldItem && fieldItem !== 0 && fieldItem !== '')
              break;

            if (j === fieldsRow.length - 1) {
              const boolValue = logicValues.get(i);
              const filterCallbackResult = callback(fieldItem, condition);

              if (
                this.logicOperators.length > 0 &&
                currentLogicOperator === EFilterBuilderLogicOperator.OR
              ) {
                logicValues.set(
                  i,
                  boolValue !== undefined
                    ? boolValue || filterCallbackResult
                    : filterCallbackResult,
                );
              }

              if (
                this.logicOperators.length > 0 &&
                currentLogicOperator === EFilterBuilderLogicOperator.AND
              ) {
                logicValues.set(
                  i,
                  boolValue !== undefined
                    ? boolValue && filterCallbackResult
                    : filterCallbackResult,
                );
              }

              callbackResult.filter = filterCallbackResult;

              break;
            }

            if (Array.isArray(fieldItem)) {
              fieldsCopy[i] = fieldsCopy[i].slice(j + 1);
              const items = recursive(fieldItem as Array<Entity>, fieldsCopy, i);

              (nestedItem[field.field as keyof Entity] as Array<Entity>) = items;

              callbackResult.map = fullItem;
              callbackResult.filter = Boolean(items.length);

              break;
            }

            nestedItem = nestedItem[field.field as keyof Entity] as Entity;
          }
        }

        if (
          (main || callbackResult.filter === undefined) &&
          this.logicOperators.length > 0 &&
          logicValues.size === this.logicOperators.length + 1
        ) {
          callbackResult.filter = this.getBooleanValue(logicValues);
        }
        if (callbackResult.filter === undefined) {
          callbackResult.filter = logicValues.get(0);
        }

        return callbackResult;
      });
    };

    const filteredData = recursive(this.clonedData, this.fields, 0, true);
    this.reset();

    return filteredData;
  }

  /**
   * A function that combines the classic array methods "filter" and "map".
   *
   * @param {Array<Entity>} data
   * @param {TFilterBuilderMapCallback<Entity, M>} callback
   * @returns {Array<Entity | M>}
   * @private
   */
  private filterMap<M = Entity>(
    data: Array<Entity>,
    callback: TFilterBuilderMapCallback<Entity, M>,
  ): Array<Entity | M> {
    return data.filter((item, index, array) => {
      const callbackRes = callback(item, index, array);

      if (!callbackRes.filter) {
        return false;
      }

      if (!callbackRes.map) {
        return true;
      }

      return callbackRes.map;
    });
  }

  /**
   * A function that combines several logical values into one based on logical operators that were passed through the
   * “or” and “and” methods.
   *
   * @param {Map<number, boolean>} logicValues
   * @returns {boolean}
   * @private
   */
  private getBooleanValue(logicValues: Map<number, boolean>): boolean {
    if (this.logicOperators.length !== logicValues.size - 1) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.LOGIC_OPERATORS_WRONG_COUNT}`,
      );
    }

    let result: boolean = true;

    for (const [condition, logicValue] of logicValues.entries()) {
      const currentLogicOperator =
        this.logicOperators[condition - 1] || this.logicOperators[condition];

      if (currentLogicOperator === EFilterBuilderLogicOperator.AND && condition === 0) {
        result = logicValue;
        continue;
      }

      if (currentLogicOperator === EFilterBuilderLogicOperator.OR && condition === 0) {
        result = logicValue;
        continue;
      }

      if (currentLogicOperator === EFilterBuilderLogicOperator.OR) {
        result ||= logicValue;
        continue;
      }

      if (currentLogicOperator === EFilterBuilderLogicOperator.AND) {
        result &&= logicValue;
      }
    }

    return result;
  }

  /**
   * Creates a new edit field.
   *
   * @private
   */
  private openCurrentField() {
    this.currentField = {
      field: null,
    };
  }

  /**
   * Creates a current field chain.
   *
   * @private
   */
  private openCurrentFieldsRow() {
    this.currentFieldsRow = [];
  }

  /**
   * Closes the current field for editing.
   *
   * @private
   */
  private closeCurrentField() {
    if (!this.currentField) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELD_NOT_SET}`,
      );
    }

    if (!this.currentField.field) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELD_IS_NULL}`,
      );
    }

    if (!this.currentFieldsRow) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELD_CHAIN_IS_EMPTY}`,
      );
    }

    this.currentFieldsRow.push(this.currentField as TFilterBuilderFullField<Entity>);
    this.currentField = null;
  }

  /**
   * Closes the current field chain.
   *
   * @private
   */
  private closeCurrentFieldsRow() {
    if (!this.currentFieldsRow?.length) {
      throw new Error(
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELD_CHAIN_IS_ZERO}`,
      );
    }

    this.fields.push(this.currentFieldsRow);
    this.currentFieldsRow = [];
  }

  /**
   * Resets all parameters.
   *
   * @private
   */
  private reset() {
    this.fields = [];
    this.currentFieldsRow = [];
    this.currentField = null;
    this.logicOperators = [];
    this.clonedData = JSON.parse(JSON.stringify(this.data)) as Array<Entity>;
  }
}
