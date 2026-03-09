import type { TToastApi } from '@/lib/components/overlays/Toast/types/Toast.types';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { ToastApiProviderKey } from '@/lib/components/overlays/Toast/providers/Toast.provider';
import { ELibraryConfig } from '@/types/internal';
import { EToastConfig, EViewerErrors } from '@/lib/components/overlays/Toast/types/Toast.enums';

export default function useToast(): TToastApi {
  const viewerApi = injectStrict(ToastApiProviderKey);

  return new Proxy(viewerApi, {
    get(target: TToastApi, prop: string) {
      if (!(prop in target)) {
        return () =>
          console.log(
            `${ELibraryConfig.NAME}(${EToastConfig.NAME}): ${EViewerErrors.NOT_INSTALL_SERVICE}`,
          );
      }

      return target[prop as keyof typeof target];
    },
  });
}
