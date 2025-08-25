<template>
  <Teleport :to="props.appendTo">
    <div :class="componentClasses" @click="closeOnOverlayClick">
      <div v-if="showGallery && gallery.length" :class="`${props.cssClass}__gallery`" @click.stop>
        <div
          :class="`${props.cssClass}__gallery-${type.toLowerCase()}`"
          v-for="type in props.queue"
          :key="type"
        >
          <div :class="`${props.cssClass}__gallery-label`">
            <template v-if="type === EViewerMedia.VIDEO">
              <slot name="galleryVideoLabel" :video-count="videoGallery.length">
                Видео ({{ videoGallery.length }})
              </slot>
            </template>

            <template v-else>
              <slot name="galleryImageLabel" :image-count="imageGallery.length">
                Фотографии ({{ imageGallery.length }})
              </slot>
            </template>
          </div>

          <template v-if="type === EViewerMedia.VIDEO">
            <div
              :class="{
                [`${props.cssClass}__gallery-item`]: true,
                [`${props.cssClass}__gallery-item--selected`]:
                  generalGallery[swipeCore.index][srcKey] === videoItem[srcKey],
              }"
              v-for="videoItem in videoGallery"
              :key="videoItem[srcKey]"
              @click="
                onSelectFromGallery(
                  generalGallery.findIndex((item) => item[srcKey] === videoItem[srcKey]),
                )
              "
            >
              <slot name="galleryVideoItem" :video-item="videoItem as TViewerMediaItem">
                {{ videoItem.type }}
              </slot>
            </div>
          </template>

          <template v-if="type === EViewerMedia.IMAGE">
            <div
              :class="{
                [`${props.cssClass}__gallery-item`]: true,
                [`${props.cssClass}__gallery-item--selected`]:
                  generalGallery[swipeCore.index][srcKey] === imageItem[srcKey],
              }"
              v-for="imageItem in imageGallery"
              :key="imageItem[srcKey]"
              @click="
                onSelectFromGallery(
                  generalGallery.findIndex((item) => item[srcKey] === imageItem[srcKey]),
                )
              "
            >
              <slot name="galleryImageItem" :image-item="imageItem as TViewerMediaItem">
                {{ imageItem.type }}
              </slot>
            </div>
          </template>
        </div>
      </div>

      <div :class="contentClasses" ref="content">
        <div v-if="!gallery.length" :class="`${props.cssClass}__empty`">
          <slot name="empty">Empty</slot>
        </div>

        <div :class="`${props.cssClass}__controls`" @click.stop>
          <div :class="`${props.cssClass}__controls-close`" @click="close">
            <slot name="closeIcon">Close</slot>
          </div>

          <div :class="prevButtonClasses" @click="onClickPrev">
            <slot name="prevIcon">Prev</slot>
          </div>

          <div :class="nextButtonClasses" @click="onClickNext">
            <slot name="nextIcon">Next</slot>
          </div>

          <div :class="`${props.cssClass}__controls-zoom`">
            <slot name="zoomInfo" :zoom="zoomCore.scale">{{ zoomCore.scale }}%</slot>
          </div>
        </div>

        <div
          :class="sliderClasses"
          ref="slider"
          :style="`transform: translateX(${(swipeCore.index + swipeCore.swipeOffset / 100) * sliderWidth * -1}px)`"
        >
          <div
            v-if="sliderIsCalculating && !moveCore.isDragging && gallery.length"
            :class="`${props.cssClass}__slider-item-calculating`"
          >
            <slot name="calculating">calculating...</slot>
          </div>

          <div
            :class="{
              [`${props.cssClass}__slider-item`]: true,
              [`${props.cssClass}__slider-item-image`]: mediaItem.type === EViewerMedia.IMAGE,
              [`${props.cssClass}__slider-item-video`]:
                mediaItem.type === EViewerMedia.VIDEO || mediaItem.type === EViewerMedia.IFRAME,
              [`${props.cssClass}__slider-item--dragging`]: moveCore.isDragging,
            }"
            v-for="(mediaItem, index) in generalGallery"
            :key="mediaItem[srcKey]"
          >
            <div
              :class="`${props.cssClass}__slider-item-nested`"
              :style="`transform: translateX(${moveCore.leftOffset}px) translateY(${moveCore.topOffset}px) scale(${swipeCore.index === index ? zoomCore.normalizedScale : 1}); margin-left: ${positionCore.coords[index]?.x || 0}px; margin-top: ${positionCore.coords[index]?.y || 0}px;`"
              :ref="
                ((element: Element) => fillSliderItems(element as HTMLElement, index)) as VNodeRef
              "
              @click.stop
              @pointerup="onClickMaxZoom($event, mediaItem)"
            >
              <slot name="sliderItem" :media-item="mediaItem" :registerIframe="registerIframe">
                {{ mediaItem.type }}
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, ref, computed, onMounted, onUnmounted } from 'vue';
import type { ComputedRef, VNodeRef } from 'vue';

// Types
import { ELibraryConfig } from '@/types/internal';
import type { TViewerEmits, TViewerExposes, TViewerProps } from './Viewer';
import {
  EViewerApi,
  EViewerConfig,
  EViewerErrors,
  EViewerMedia,
  EViewerPropsDefault,
} from './types/Viewer.enums';
import type { TViewerGallery, TViewerMediaItem } from './types/Viewer.types';
import type { TViewerZoomCoreOnZoomChangeData } from './core/zoom/viewer.zoom.core.types';

// Composables
import useViewer from './composables/useViewer/useViewer';
import useViewerSwipe from './composables/useViewerSwipe/useViewerSwipe';
import useViewerZoom from './composables/useViewerZoom/useViewerZoom';
import useViewerMove from './composables/useViewerMove/useViewerMove';
import useViewerPosition from './composables/useViewerPosition/useViewerPosition';
import useViewerClickZoom from './composables/useViewerClickZoom/useViewerClickZoom';
import useViewerApi from './composables/useViewerApi/useViewerApi';
import useViewerUX from './composables/useViewerUX/useViewerUX';
import useViewerClasses from './composables/useViewerClasses/useViewerClasses';
import useOrderedElements from '@/lib/composables/elements/useOrderedElements/useOrderedElements';

// EventBus
import viewerEventBus from './event-bus/Viewer.event-bus';

const props = withDefaults(defineProps<TViewerProps>(), {
  moveSlowFactor: EViewerPropsDefault.MOVE_SLOW_FACTOR,
  resizeCalculationMs: EViewerPropsDefault.RESIZE_CALCULATION_MS,
  swipeVerge: EViewerPropsDefault.SWIPE_VERGE,
  zoomStep: EViewerPropsDefault.ZOOM_STEP,
  zoomMax: EViewerPropsDefault.ZOOM_MAX,
  queue: () => [EViewerMedia.VIDEO, EViewerMedia.IMAGE],
  appendTo: EViewerPropsDefault.APPEND_TO,
  cssClass: EViewerPropsDefault.CSS_CLASS,
});
const emits = defineEmits<TViewerEmits>();

const iframeVideoHelper = defineModel<TViewerProps['iframeVideoHelper']>('iframeVideoHelper');

const contentRef = useTemplateRef('content');
const sliderRef = useTemplateRef('slider');

const active = ref<boolean>(false);
const showGallery = ref<boolean>(true);
const srcKey = ref<string>('src');
const gallery = ref<TViewerGallery>([]);
const mainLoop = ref(props.loop);
const sliderWidth = ref<number>(0);

const { componentClasses, parseGallery, videoGallery, imageGallery, generalGallery } = useViewer(
  props,
  iframeVideoHelper,
  srcKey,
  active,
  gallery,
);

const swipeDisable = ref<boolean>(false);
const swipeDisabled: ComputedRef<boolean> = computed(
  () => zoomCore.scale > 0 || swipeDisable.value,
);

const { swipeCore } = useViewerSwipe(
  contentRef,
  swipeDisabled,
  props.swipeVerge,
  mainLoop.value,
  generalGallery,
);

const zoomDisabled: ComputedRef<boolean> = computed(
  () => generalGallery.value[swipeCore.index].type === EViewerMedia.VIDEO,
);

const { zoomCore, onClickMaxZoom } = useViewerZoom(
  contentRef,
  zoomDisabled,
  props.zoomMax,
  props.zoomStep,
);

const { fillElements: fillSliderItems, elements: sliderItems } = useOrderedElements<HTMLElement>();

const moveDisabled: ComputedRef<boolean> = computed(
  () => zoomCore.scale === 0 || generalGallery.value[swipeCore.index].type === EViewerMedia.VIDEO,
);

const { moveCore } = useViewerMove(
  sliderRef,
  moveDisabled,
  sliderItems,
  swipeCore,
  props.moveSlowFactor,
);

const { positionCore } = useViewerPosition(sliderItems, sliderRef);

useViewerClickZoom();

zoomCore.onZoomChange.observe((zoomValue: TViewerZoomCoreOnZoomChangeData) => {
  if (zoomValue.newValue === 0) moveCore.reset();
});

zoomCore.onZoomChange.observe((zoomValue: TViewerZoomCoreOnZoomChangeData) => {
  moveCore.updateOffsetsWithZoom(
    zoomCore.normalizeScale(zoomValue.newValue),
    zoomCore.normalizeScale(zoomValue.oldValue),
    zoomValue.centerX,
    zoomValue.centerY,
  );
});

const sliderIsResize = ref(false);
const sliderIsCalculating = ref(true);

function onSliderResize() {
  sliderWidth.value = sliderRef.value?.offsetWidth || 0;
  sliderIsResize.value = true;

  setTimeout(() => {
    sliderIsResize.value = false;
    sliderIsCalculating.value = false;
  }, props.resizeCalculationMs);
}

const sliderResizeObserver = ref<ResizeObserver | null>(null);

onMounted(() => {
  sliderResizeObserver.value = new ResizeObserver(onSliderResize);
  onSliderResize();

  if (!sliderRef.value) {
    return;
  }

  sliderResizeObserver.value.observe(sliderRef.value);
});

onUnmounted(() => {
  if (!sliderResizeObserver.value || !sliderRef.value) {
    return;
  }

  sliderResizeObserver.value.unobserve(sliderRef.value);
});

const nextButtonDisabled: ComputedRef<boolean> = computed(
  () => !mainLoop.value && swipeCore.index === generalGallery.value.length - 1,
);

const prevButtonDisabled: ComputedRef<boolean> = computed(
  () => !mainLoop.value && swipeCore.index === 0,
);

const { sliderClasses, nextButtonClasses, prevButtonClasses, contentClasses } = useViewerClasses(
  props,
  sliderIsResize,
  sliderIsCalculating,
  nextButtonDisabled,
  prevButtonDisabled,
  swipeCore,
  zoomCore,
);

swipeCore.onResetView.observe(() => {
  zoomCore.setScale(0);
  moveCore.reset();
});

swipeCore.onSlideChange.observe((newIndex) => {
  emits('slideChange', generalGallery.value[newIndex]);
});

function onSelectFromGallery(index: number) {
  swipeCore.updateIndex(index);
}

function registerIframe(element: HTMLIFrameElement) {
  if (!props.iframeVideoHelper) {
    throw new Error(
      `${ELibraryConfig.NAME}(${EViewerConfig.NAME}): ${EViewerErrors.IFRAME_VIDEO_HELPER_NOT_SPECIFIED}`,
    );
  }

  if (!element) {
    return;
  }

  if (element.tagName.toLowerCase() !== 'iframe') {
    throw new Error(
      `${ELibraryConfig.NAME}(${EViewerConfig.NAME}): ${EViewerErrors.COULD_NOT_REGISTER_IFRAME}`,
    );
  }

  if (!element.src) {
    return;
  }

  props.iframeVideoHelper.registerIframe(element);
  iframeVideoHelper.value = props.iframeVideoHelper;
}

onUnmounted(() => {
  if (!props.iframeVideoHelper) {
    return;
  }

  props.iframeVideoHelper.clear();
  iframeVideoHelper.value = props.iframeVideoHelper;
});

const {
  open,
  close,
  setGallery,
  setLoop,
  setIndex,
  setSrcKey,
  next,
  prev,
  setZoom,
  setSwipe,
  setShowGallery,
  openWithGallery,
} = useViewerApi(
  emits,
  swipeCore,
  gallery,
  parseGallery,
  srcKey,
  active,
  zoomCore,
  swipeDisable,
  showGallery,
  mainLoop,
);

defineExpose<TViewerExposes>({
  getCurrentSlide(): TViewerMediaItem {
    return generalGallery.value[swipeCore.index];
  },

  getGalleryLength(): number {
    return gallery.value.length;
  },

  getIndex(): number {
    return swipeCore.index;
  },

  getZoom(): number {
    return zoomCore.scale;
  },
});

const { onClickNext, onClickPrev, closeOnOverlayClick } = useViewerUX(
  props,
  active,
  nextButtonDisabled,
  prevButtonDisabled,
  swipeCore,
  close,
);

const onSetGallery = setGallery;
const onSetZoom = setZoom;
const onSetLoop = setLoop;
const onSetSwipe = setSwipe;
const onSetSrcKey = setSrcKey;
const onSetShowGallery = setShowGallery;
const onOpen = open;
const onOpenWithGallery = (options: { gallery: TViewerGallery; index: number }) => {
  openWithGallery(options.gallery, options.index);
};
const onNext = next;
const onPrev = prev;
const onGoTo = setIndex;

viewerEventBus.on(EViewerApi.SET_GALLERY, onSetGallery);
viewerEventBus.on(EViewerApi.SET_ZOOM, onSetZoom);
viewerEventBus.on(EViewerApi.SET_LOOP, onSetLoop);
viewerEventBus.on(EViewerApi.SET_SWIPE, onSetSwipe);
viewerEventBus.on(EViewerApi.SET_SRC_KEY, onSetSrcKey);
viewerEventBus.on(EViewerApi.SET_SHOW_GALLERY, onSetShowGallery);
viewerEventBus.on(EViewerApi.OPEN, onOpen);
viewerEventBus.on(EViewerApi.OPEN_WITH_GALLERY, onOpenWithGallery);
viewerEventBus.on(EViewerApi.NEXT, onNext);
viewerEventBus.on(EViewerApi.PREV, onPrev);
viewerEventBus.on(EViewerApi.GO_TO, onGoTo);

viewerEventBus.emit(EViewerApi.ON_CREATED, null);

onMounted(() => {
  viewerEventBus.emit(EViewerApi.ON_MOUNTED, null);
});

onUnmounted(() => {
  viewerEventBus.emit(EViewerApi.ON_UNMOUNTED, null);

  viewerEventBus.off(EViewerApi.SET_GALLERY, onSetGallery);
  viewerEventBus.off(EViewerApi.SET_ZOOM, onSetZoom);
  viewerEventBus.off(EViewerApi.SET_LOOP, onSetLoop);
  viewerEventBus.off(EViewerApi.SET_SWIPE, onSetSwipe);
  viewerEventBus.off(EViewerApi.SET_SRC_KEY, onSetSrcKey);
  viewerEventBus.off(EViewerApi.SET_SHOW_GALLERY, onSetShowGallery);
  viewerEventBus.off(EViewerApi.OPEN, onOpen);
  viewerEventBus.off(EViewerApi.OPEN_WITH_GALLERY, onOpenWithGallery);
  viewerEventBus.off(EViewerApi.NEXT, onNext);
  viewerEventBus.off(EViewerApi.PREV, onPrev);
  viewerEventBus.off(EViewerApi.GO_TO, onGoTo);
});
</script>
