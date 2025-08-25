import type { TViewerApi } from '@/lib/components/media/Viewer/Viewer';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { ViewerApiProviderKey } from '@/lib/components/media/Viewer/providers/Viewer.provider';

export default function useViewer(): TViewerApi {
  const viewerApi = injectStrict(ViewerApiProviderKey);

  return new Proxy(viewerApi, {
    get(target: TViewerApi, prop: string) {
      if (!(prop in target)) {
        return () => console.log('ViewerService не подключён.');
      }

      return target[prop as keyof typeof target];
    },
  });
}
