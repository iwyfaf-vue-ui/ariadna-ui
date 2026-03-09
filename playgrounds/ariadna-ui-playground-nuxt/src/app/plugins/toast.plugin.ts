import toastService from '@iwyfaf-vue-ui/ariadna-ui/ToastService';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(toastService);
});
