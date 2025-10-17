export type TArrayWithNestedProperties = {
  id: number;
  name: string;
  address: {
    house: {
      floor: string;
      number: number;
    };
  };
};

export const arrayWithNestedProperties: Array<TArrayWithNestedProperties> = Array.from(
  { length: 5 },
  (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    address: {
      house: {
        floor: `floor item ${index ** 2 + 1}`,
        number: index ** 4 + 1,
      },
    },
  }),
);
