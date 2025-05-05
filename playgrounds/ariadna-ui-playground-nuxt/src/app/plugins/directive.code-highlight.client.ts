import CodeHighlight from '~/directives/code-highlight.directive';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('code-highlight', CodeHighlight);
});
