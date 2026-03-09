import type { InjectionKey } from 'vue';
import type { TToastApi } from '../Toast';

export const ToastApiProviderKey: InjectionKey<TToastApi> = Symbol('ToastApiProvider');
