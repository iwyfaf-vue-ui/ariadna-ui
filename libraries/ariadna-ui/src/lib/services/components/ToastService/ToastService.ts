import type { ObjectPlugin } from 'vue';
import type { TToastApi, TToastMessage } from '@/lib/components/overlays/Toast/types/Toast.types';
import { EToastApi } from '@/lib/components/overlays/Toast/types/Toast.enums';
import toastEventBus from '@/lib/components/overlays/Toast/event-bus/Toast.event-bus';
import { ToastApiProviderKey } from '@/lib/components/overlays/Toast/providers/Toast.provider';

const ToastService: ObjectPlugin = {
  install(app) {
    let isCreated = false;
    let isMounted = false;
    let callQueue: Array<() => void> = [];

    function runOrQueue(fn: () => void) {
      if (isMounted) {
        return fn();
      }

      callQueue.push(fn);
    }

    toastEventBus.on(EToastApi.ON_CREATED, () => {
      isCreated = true;
    });

    toastEventBus.on(EToastApi.ON_MOUNTED, () => {
      isMounted = true;

      callQueue.forEach((fn) => fn());
      callQueue = [];
    });

    toastEventBus.on(EToastApi.ON_UNMOUNTED, () => {
      isCreated = false;
      isMounted = false;
      callQueue = [];
    });

    const toastApi: TToastApi = {
      created(callback: (...args: unknown[]) => void) {
        if (isCreated) {
          callback();
          return;
        }

        const onceCallback = (...args: any[]) => {
          toastEventBus.off(EToastApi.ON_CREATED, onceCallback);
          callback(...args);
        };

        toastEventBus.on(EToastApi.ON_CREATED, onceCallback);
      },

      mounted(callback: (...args: unknown[]) => void) {
        if (isMounted) {
          callback();
          return;
        }

        const onceCallback = (...args: any[]) => {
          toastEventBus.off(EToastApi.ON_MOUNTED, onceCallback);
          callback(...args);
        };

        toastEventBus.on(EToastApi.ON_MOUNTED, onceCallback);
      },

      unMounted(callback: (...args: unknown[]) => void) {
        const onceCallback = (...args: any[]) => {
          toastEventBus.off(EToastApi.ON_UNMOUNTED, onceCallback);
          callback(...args);
        };

        toastEventBus.on(EToastApi.ON_UNMOUNTED, onceCallback);
      },

      add(message: TToastMessage) {
        runOrQueue(() => toastEventBus.emit(EToastApi.ADD, message));
      },

      remove(id: number) {
        runOrQueue(() => toastEventBus.emit(EToastApi.REMOVE, id));
      },

      removeGroup(group: string) {
        runOrQueue(() => toastEventBus.emit(EToastApi.REMOVE_GROUP, group));
      },

      removeAll() {
        runOrQueue(() => toastEventBus.emit(EToastApi.REMOVE_ALL, null));
      },
    };

    app.provide(ToastApiProviderKey, toastApi);
  },
};

export default ToastService;
