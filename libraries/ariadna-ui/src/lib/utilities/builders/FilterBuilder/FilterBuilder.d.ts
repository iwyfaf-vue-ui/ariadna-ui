import {
  IFilterBuilder,
  type TFilterBuilderLogicOperator,
  type TFilterBuilderCallback,
  type TFilterBuilderFullField,
  type TFilterBuilderNestedKey,
} from './types/FilterBuilder.types';

/**
 * Ariadna UI | Utilities | FilterBuilder
 *
 * The FilterBuilder class provides a Fluent API for building complex filter queries on arrays of entities. It allows
 * chaining of logical operators and field selectors to construct advanced filtering logic.
 *
 * @template Entity - The type of the entity being filtered.
 * @extends IFilterBuilder<Entity>
 *
 * @example
 * const builder = new FilterBuilder(users)
 *   .select('name')
 *   .and()
 *   .select('age')
 *   .filter(user => user.age > 18);
 */
declare class FilterBuilder<Entity> implements IFilterBuilder<Entity> {
  constructor(data: Array<Entity>);

  select(field: TFilterBuilderNestedKey<Entity>): IFilterBuilder<Entity>;
  or(): IFilterBuilder<Entity>;
  and(): IFilterBuilder<Entity>;
  configureFields(
    fields: TFilterBuilderFullField<Entity>[][],
    logicOperators?: Array<TFilterBuilderLogicOperator> | TFilterBuilderLogicOperator,
  ): IFilterBuilder<Entity>;
  filter<FilterItem = string>(callback: TFilterBuilderCallback<FilterItem, Entity>): Array<Entity>;
}

export default FilterBuilder;
