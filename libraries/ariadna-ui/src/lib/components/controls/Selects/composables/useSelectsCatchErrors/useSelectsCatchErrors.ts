import { watchEffect } from 'vue';
import { ELibraryConfig } from '@/types/internal';

export default function useSelectsCatchErrors(
  props: Record<string, any>,
  selectName: string,
  group = false,
): void {
  function catchErrors() {
    if (!group) {
      props.options.forEach((option: Record<string, any>, index: number) => {
        if (!option.hasOwnProperty(props.optionLabel))
          throw new Error(
            `${ELibraryConfig.NAME}(${selectName}): Option index: ${index}; - ${props.optionLabel} missed`,
          );
      });

      return;
    }

    props.options.forEach((option: Record<string, any>, index: number) => {
      if (!option.hasOwnProperty(props.optionGroupLabel))
        throw new Error(
          `${ELibraryConfig.NAME}(${selectName}): Option index: ${index} - ${props.optionGroupLabel} missed`,
        );

      if (!option.hasOwnProperty(props.optionGroupChildren))
        throw new Error(
          `${ELibraryConfig.NAME}(${selectName}): Option index: ${index} - ${props.optionGroupChildren} missed`,
        );

      option[props.optionGroupChildren].forEach((item: any, itemIndex: number) => {
        if (!item.hasOwnProperty(props.optionLabel))
          throw new Error(
            `${ELibraryConfig.NAME}(${selectName}): Option index: ${index}; Children index: ${itemIndex} - ${props.optionLabel} missed`,
          );
      });
    });
  }

  watchEffect(catchErrors);
}
