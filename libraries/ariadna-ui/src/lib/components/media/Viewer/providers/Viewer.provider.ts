import type { InjectionKey } from 'vue';
import type { TViewerApi } from '../Viewer';

export const ViewerApiProviderKey: InjectionKey<TViewerApi> = Symbol('ViewerApiProvider');
