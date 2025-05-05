import type { DirectiveBinding } from 'vue';

declare global {
  interface Window {
    Prism: any;
  }
}

const CodeHighlight = {
  mounted(el: HTMLPreElement, binding: DirectiveBinding) {
    const modifiers = binding.modifiers;

    if (modifiers.js) el.className = 'language-javascript';
    else if (modifiers.css) el.className = 'language-css';
    else el.className = 'language-markup';

    if (import.meta.client) {
      window.Prism.highlightElement(el.children[0], false, () => {});

      el.children[0].parentElement?.setAttribute('tabindex', '-1');
    }
  },
};

export default CodeHighlight;
