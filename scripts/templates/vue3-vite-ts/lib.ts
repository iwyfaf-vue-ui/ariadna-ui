export default ({ packageName }: { packageName: string }): string => {
  return `import { App } from 'vue';
import ComponentName from './components/ComponentName.vue';

const components = {
  ComponentName,
};

export default {
  install: (Vue: App) => {
    for (const component in components) {
      Vue.component(
        components[component as keyof typeof components].name,
        components[component as keyof typeof components],
      );
    }
  },
};

export { ComponentName };
`;
};
