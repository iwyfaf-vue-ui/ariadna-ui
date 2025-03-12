import { App } from 'vue';
import Button from './components/Button.vue';

const components = {
  Button,
};

export default {
  install: (Vue: App) => {
    for (const component in components) {
      Vue.component(
        components[component as keyof typeof components].name,
        components[component as keyof typeof components]);
    }
  },
};

export { Button };
