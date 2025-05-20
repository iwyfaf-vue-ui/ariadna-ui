import type { TPreviewerProps } from '../../Previewer';
import type { TUsePreviewerReturn } from './usePreviewer.types';
import { computed, ref } from 'vue';
import copyToClipboard from '@/shared/client/copy-to-clipboard';

export default function usePreviewer(props: TPreviewerProps): TUsePreviewerReturn {
  const _showCode = ref(!!props.showCode && !!props.componentSource);

  const showCode = computed(() => _showCode.value && !!props.componentSource);
  const isCopied = ref(false);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, modifier].filter(Boolean).join(' ');
  });

  const toggleCode = () => {
    _showCode.value = !_showCode.value;
  };

  const handleCopy = async () => {
    await copyToClipboard(props.componentSource!);

    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 1500);
  };

  function onExpandEnter(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onExpandAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = 'auto';
  }

  function onExpandBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = htmlElement.scrollHeight + 'px';
  }

  return {
    isCopied,
    showCode,
    componentClasses,
    toggleCode,
    handleCopy,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
