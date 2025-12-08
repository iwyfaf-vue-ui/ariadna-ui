import { ref } from 'vue';

const optionsStrings: Ref<Array<string>> = ref<Array<string>>(
  Array.from({ length: 100 }, (_, idx) => `Item ${idx + 1}`),
);

const optionsNumbers: Ref<Array<number>> = ref<Array<number>>(
  Array.from({ length: 100 }, (_, idx) => idx),
);

const optionsVs: Ref<Array<string>> = ref<Array<string>>(
  Array.from({ length: 5000 }, (_, idx) => `Item ${idx + 1}`),
);

export { optionsStrings, optionsNumbers, optionsVs };
