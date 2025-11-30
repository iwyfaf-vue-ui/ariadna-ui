import { ref } from 'vue';

type TOption = {
  label: string;
  children: Array<{
    label: string;
    value: number;
  }>;
};

const options: Ref<Array<TOption>> = ref<Array<TOption>>(
  Array.from({ length: 20 }, (_, groupIdx) => ({
    label: `Group ${groupIdx + 1}`,
    children: Array.from({ length: 5 }, (_, itemIdx) => ({
      label: `item ${itemIdx + 1} Group ${groupIdx + 1}`,
      value: itemIdx + 1,
    })),
  })),
);

type TOption2 = {
  label: string;
  children: Array<{
    customLabel: string;
    value: number;
    customValue: string;
  }>;
};

const options2: Ref<Array<TOption2>> = ref<Array<TOption2>>(
  Array.from({ length: 20 }, (_, groupIdx) => ({
    label: `Group ${groupIdx + 1}`,
    children: Array.from({ length: 5 }, (_, itemIdx) => ({
      customLabel: `Custom item ${itemIdx + 1} Group ${groupIdx + 1}`,
      value: itemIdx + 1,
      customValue: `Custom value ${itemIdx + 1} Group ${groupIdx + 1}`,
    })),
  })),
);

type TOption3 = {
  groupName: string;
  children: Array<{
    customLabel: string;
    value: number;
    customValue: string;
  }>;
};

const options3: Ref<Array<TOption3>> = ref<Array<TOption3>>(
  Array.from({ length: 20 }, (_, groupIdx) => ({
    groupName: `Group name ${groupIdx + 1}`,
    children: Array.from({ length: 5 }, (_, itemIdx) => ({
      customLabel: `Custom item ${itemIdx + 1} Group ${groupIdx + 1}`,
      value: itemIdx + 1,
      customValue: `Custom value ${itemIdx + 1} Group ${groupIdx + 1}`,
    })),
  })),
);

type TOption4 = {
  groupName: string;
  items: Array<{
    customLabel: string;
    value: number;
    customValue: string;
  }>;
};

const options4: Ref<Array<TOption4>> = ref<Array<TOption4>>(
  Array.from({ length: 20 }, (_, groupIdx) => ({
    groupName: `Group name ${groupIdx + 1}`,
    items: Array.from({ length: 5 }, (_, itemIdx) => ({
      customLabel: `Custom item ${itemIdx + 1} Group ${groupIdx + 1}`,
      value: itemIdx + 1,
      customValue: `Custom value ${itemIdx + 1} Group ${groupIdx + 1}`,
    })),
  })),
);

export type { TOption, TOption2, TOption3, TOption4 };
export { options, options2, options3, options4 };
