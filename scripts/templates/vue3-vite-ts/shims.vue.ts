export default ({ packageName }: { packageName: string }): string => {
  return `declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
`;
};
