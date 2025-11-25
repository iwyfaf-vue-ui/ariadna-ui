import { ref } from 'vue';

type TOption = {
  label: string;
  value: number;
};

const options: Ref<Array<TOption>> = ref<Array<TOption>>(
  Array.from({ length: 100 }, (_, idx) => ({ label: `Item ${idx + 1}`, value: idx + 1 })),
);

const optionsVs: Ref<Array<TOption>> = ref<Array<TOption>>(
  Array.from({ length: 5000 }, (_, idx) => ({ label: `Item ${idx + 1}`, value: idx + 1 })),
);

type TOption2 = {
  customLabel: string;
  value: number;
  customValue: string;
};

const options2: Ref<Array<TOption2>> = ref<Array<TOption2>>(
  Array.from({ length: 100 }, (_, idx) => ({
    customLabel: `Custom item ${idx + 1}`,
    value: idx + 1,
    customValue: `Custom value ${idx + 1}`,
  })),
);

export type { TOption, TOption2 };
export { options, optionsVs, options2 };
