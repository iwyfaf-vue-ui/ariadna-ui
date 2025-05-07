import type { TRenderAttributeOnceDirective } from './types/RenderAttributeOnce.types';

const vRenderAttributeOnce: TRenderAttributeOnceDirective = {
  created: (el, binding) => {
    for (const key in binding.value) {
      if (!el.hasAttribute(key)) {
        el.setAttribute(key, binding.value[key as keyof typeof binding.value]);
      }
    }
  },

  getSSRProps(binding) {
    return binding.value;
  },
};

export default vRenderAttributeOnce;
