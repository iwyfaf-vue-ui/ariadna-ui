import type { TVirtualScrollerProps } from '../../../../data/VirtualScroller/VirtualScroller';
import type { TFilterBuilderFullField } from '../../../../../utilities/builders/FilterBuilder/types/FilterBuilder.types';

export type TSelectMultipleVirtualScroller = Omit<TVirtualScrollerProps<any>, 'items'> & {};

export type TSelectMultipleFilter = {
  filterLabel: TFilterBuilderFullField<any>[][] | null;
};
