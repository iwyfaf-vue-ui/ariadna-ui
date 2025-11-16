import type { TVirtualScrollerProps } from '../../../../data/VirtualScroller/VirtualScroller';
import type { TFilterBuilderFullField } from '../../../../../utilities/builders/FilterBuilder/types/FilterBuilder.types';

export type TSelectSingleVirtualScroller = Omit<TVirtualScrollerProps<any>, 'items'> & {};

export type TSelectSingleFilter = {
  filterLabel: TFilterBuilderFullField<any>[][] | null;
};
