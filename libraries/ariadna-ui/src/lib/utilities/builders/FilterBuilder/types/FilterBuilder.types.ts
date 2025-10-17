import { EFilterBuilderLogicOperator } from './FilterBuilder.enum';

/**
 * Describes the fluent API used to configure and execute filter-building logic for a given entity.
 *
 * @template Entity - Represents the data model that the filter builder operates on.
 */
export interface IFilterBuilder<Entity> {
  /**
   * Registers a single entity field (including nested paths) for further filter configuration.
   *
   * @param {TFilterBuilderNestedKey<Entity>} field - Nested key of the entity that should participate in the filter
   * definition.
   * @returns {IFilterBuilder<Entity>} - The current filter builder instance to allow fluent chaining.
   */
  select(field: TFilterBuilderNestedKey<Entity>): IFilterBuilder<Entity>;

  /**
   * Injects a logical OR operator into the filter configuration stream.
   *
   * @returns {IFilterBuilder<Entity>} - The current filter builder instance to allow fluent chaining.
   */
  or(): IFilterBuilder<Entity>;

  /**
   * Injects a logical AND operator into the filter configuration stream.
   *
   * @returns {IFilterBuilder<Entity>} - The current filter builder instance to allow fluent chaining.
   */
  and(): IFilterBuilder<Entity>;

  /**
   * Configures a matrix of selectable fields and optional logical operators that will be applied during filtering.
   *
   * @param {TFilterBuilderFullField<Entity>[][]} fields - A two-dimensional list describing groups of selectable
   * fields.
   * @param {Array<TFilterBuilderLogicOperator> | TFilterBuilderLogicOperator} logicOperators - Optional operator sequence
   * (single or multiple) to combine the field groups.
   * @returns {IFilterBuilder<Entity>} - The current filter builder instance to allow fluent chaining.
   */
  configureFields(
    fields: TFilterBuilderFullField<Entity>[][],
    logicOperators?: Array<TFilterBuilderLogicOperator> | TFilterBuilderLogicOperator,
  ): IFilterBuilder<Entity>;

  /**
   * Executes the configured filter pipeline for a list of entities using a custom callback.
   *
   * @template FilterItem - Represents the item type passed into the callback for filtering.
   * @param {TFilterBuilderCallback<FilterItem, Entity>} callback - A map/filter callback invoked per entity to
   * evaluate the filter condition.
   * @returns {Array<Entity>} - A list of entities that satisfy the callback condition.
   */
  filter<FilterItem = string>(callback: TFilterBuilderCallback<FilterItem, Entity>): Array<Entity>;
}

/**
 * Supported logical operations via type.
 */
export type TFilterBuilderLogicOperator = 'AND' | 'OR';

/**
 * Resolves to all possible nested property keys for an entity, enabling dot-notation-like selections.
 *
 * @template Entity - Entity type whose keys should be explored recursively.
 */
export type TFilterBuilderNestedKey<Entity> = Entity extends object
  ? {
      /**
       * Either the direct key or a nested key derived from the current property.
       */
      [K in keyof Entity]: K | TFilterBuilderNestedKey<Entity[K]>;
    }[keyof Entity]
  : keyof Entity;

/**
 * Describes a selectable field definition used within filter configuration steps.
 *
 * @template Entity - Entity type whose field is represented.
 */
export type TFilterBuilderField<Entity> = {
  /**
   * Entity field reference that can be null when not yet defined.
   */
  field: TFilterBuilderNestedKey<Entity> | null;
};

/**
 * Represents a selectable field that is guaranteed to be non-null.
 *
 * @template Entity - Entity type whose field is represented.
 */
export type TFilterBuilderFullField<Entity> = Exclude<TFilterBuilderField<Entity>, { field: null }>;

/**
 * Describes the return signature of a map/filter callback, allowing optional mapping and filtering decisions.
 */
export type TFilterBuilderMapCallbackReturn<MapResult> = {
  /**
   * Optional mapped value derived from the processed entity.
   */
  map?: MapResult;

  /**
   * Optional boolean flag indicating whether the entity should remain in the result set.
   */
  filter?: boolean;
};

/**
 * Defines the shape of the callback used during filter execution to evaluate entities.
 *
 * @template Entity - Entity type passed into the callback.
 * @template MapResult - Result type produced by the callback when mapping is used.
 * @param {Entity} item - Current entity being processed.
 * @param {number} index - Index of the entity within the original collection.
 * @param {Array<Entity>} array - Entire collection of entities being processed.
 * @returns A mapping/filtering decision object describing how to handle the current entity.
 */
export type TFilterBuilderMapCallback<Entity, MapResult> = (
  item: Entity,
  index: number,
  array: Array<Entity>,
) => TFilterBuilderMapCallbackReturn<MapResult>;

/**
 * Captures contextual information about the current condition under evaluation during filtering.
 *
 * @template Entity - Entity type whose field names are described.
 */
export type TFilterBuilderCallbackCondition<Entity> = {
  /**
   * Position of the current condition within the logical sequence.
   */
  index: number;

  /**
   * Logical operator applied to the condition to join it with others.
   */
  operator: EFilterBuilderLogicOperator;

  /**
   * Field name (or empty string) associated with the condition at the current index.
   */
  fieldName: TFilterBuilderNestedKey<Entity> | '';
};

/**
 * Represents a predicate function that determines whether a filter item satisfies a given condition.
 *
 * @template FilterItem - Type of the item processed by the predicate.
 * @param {FilterItem} item - The current item being evaluated.
 * @param {TFilterBuilderCallbackCondition<Entity>} condition - Contextual data describing the logical condition
 * applied to the item.
 * @returns `true` if the item satisfies the condition; otherwise `false`.
 */
export type TFilterBuilderCallback<FilterItem, Entity> = (
  item: FilterItem,
  condition: TFilterBuilderCallbackCondition<Entity>,
) => boolean;
