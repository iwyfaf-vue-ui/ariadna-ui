import { ref } from 'vue';

const options: Ref<Array<string>> = ref<Array<string>>(
  Array.from({ length: 100 }, (_, idx) => `Item ${idx + 1}`),
);

const optionsVs: Ref<Array<string>> = ref<Array<string>>(
  Array.from({ length: 5000 }, (_, idx) => `Item ${idx + 1}`),
);

export { options, optionsVs };
