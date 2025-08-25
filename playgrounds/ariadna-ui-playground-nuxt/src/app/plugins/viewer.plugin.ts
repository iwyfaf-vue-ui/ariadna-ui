import viewerService from '@iwyfaf-vue-ui/ariadna-ui/ViewerService';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(viewerService);
});
