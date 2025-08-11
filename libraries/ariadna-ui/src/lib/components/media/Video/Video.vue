<template>
  <div
    ref="video"
    :class="componentClasses"
    :id="uniqueID"
    @dblclick="toggleFullscreen"
    @keydown.space="togglePlay"
    @keydown.enter="togglePlay"
    @keydown.down="fastRewind"
    @keydown.left="fastRewind"
    @keydown.up="fastForward"
    @keydown.right="fastForward"
    @click="onClickVideo"
    @mousemove="showControls(false)"
    @mouseleave="onMouseLeave"
    @keydown="showControls(false)"
  >
    <video
      ref="videoTag"
      :class="`${props.cssClass}__video`"
      :poster="props.poster"
      :loop="props.loop"
      :src="props.src"
      tabindex="-1"
      :height="videoHeight"
      :width="videoWidth"
      :autoplay="props.autoplay"
      :muted="props.muted"
      :preload="props.preload"
      @pause="onVideoPause"
      @play="onVideoPlay"
      @timeupdate="onVideoTimeUpdate"
      @volumechange="onToggleVolume"
      @progress="onVideoProgress"
      @waiting="onVideoWaiting"
      @canplay="onVideoCanPlay"
    >
      <slot></slot>
    </video>

    <div v-if="loading" :class="`${props.cssClass}__loading`">
      <slot name="loadingIcon">Loading...</slot>
    </div>

    <div
      v-if="props.controls"
      :class="controlsClasses"
      @mouseenter="onControlsMouseEnter"
      @mouseleave="onControlsMouseLeave"
      @dblclick.stop
    >
      <div
        ref="timeLine"
        :class="timeLineClasses"
        tabindex="0"
        @mousemove="onTimeLineMouseMove"
        @mouseenter="onTimeLineMouseEnter"
        @mouseleave="onTimeLineMouseLeave"
        @keydown.stop.down="fastRewind"
        @keydown.stop.left="fastRewind"
        @keydown.stop.up="fastForward"
        @keydown.stop.right="fastForward"
        @focus="onFocusTimeLine"
        @blur="onBlurTimeLine"
      >
        <span
          ref="timeLinePopup"
          :class="timeLinePopupClasses"
          :style="`left: ${timeLinePopupLeft}px`"
        >
          {{ parseTime(timeLinePopupTime) }}
        </span>

        <Slider
          v-model="timeLineValues"
          :tracks="timeLineTracks"
          modifier="timeline"
          @changeStart="onChangeTimeLineStart"
          @changeEnd="onChangeTimeLineEnd"
        />
      </div>

      <div :class="`${props.cssClass}__controls-group`">
        <button
          :class="actionClasses"
          type="button"
          aria-label="action"
          @click="togglePlay"
          @keydown.stop.enter="togglePlay"
          @keydown.stop.space="togglePlay"
          @focus="onFocusAction"
          @blur="onBlurAction"
        >
          <span v-if="playedState" :class="`${props.cssClass}__controls-action-stop`">
            <slot name="stopIcon">Stop</slot>
          </span>

          <span v-else :class="`${props.cssClass}__controls-action-play`">
            <slot name="playIcon">Play</slot>
          </span>
        </button>

        <div v-if="!props.muted" :class="volumeClasses">
          <button
            type="button"
            aria-label="volume"
            @click="onClickVolume"
            @keydown.stop.enter="onClickVolume"
            @keydown.stop.space="onClickVolume"
            @focus="onFocusVolume"
            @blur="onBlurVolume"
          >
            <span :class="`${props.cssClass}__controls-volume-icon`">
              <slot name="volumeIcon" :volume="volumeState[0]">
                {{ volumeState[0] <= 0 ? 'Muted' : 'Volume' }}
              </slot>
            </span>
          </button>

          <div :class="`${props.cssClass}__controls-volume-slider`">
            <Slider
              v-model="volumeState"
              :tracks="volumeTracks"
              :step="0.1"
              :max="1"
              modifier="volume"
              @change="onChangeVolume"
            />
          </div>
        </div>

        <div :class="`${props.cssClass}__time`">
          <slot
            name="time"
            :parseTime="parseTime"
            :duration-in-seconds="videoTagRef?.duration || 0"
            :time-passed-in-seconds="timePassed"
          >
            <div :class="`${props.cssClass}__time-passed`">
              {{ parseTime(timePassed) }}
            </div>
            <div :class="`${props.cssClass}__time-separator`">/</div>
            <div :class="`${props.cssClass}__time-duration`">
              {{ parseTime(videoTagRef?.duration || 0) }}
            </div>
          </slot>
        </div>

        <button
          :class="fullscreenClasses"
          type="button"
          aria-label="fullscreen"
          @click="toggleFullscreen"
          @keydown.stop.enter="toggleFullscreen"
          @keydown.stop.space="toggleFullscreen"
          @focus="onFocusFullscreen"
          @blur="onBlurFullscreen"
        >
          <span v-if="fullscreenState" :class="`${props.cssClass}__controls-fullscreen-icon`">
            <slot name="unFullscreenIcon">UnFullscreen</slot>
          </span>

          <span v-else :class="`${props.cssClass}__controls-unfullscreen-icon`">
            <slot name="fullscreenIcon">Fullscreen</slot>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, computed } from 'vue';

// Types
import type { TVideoEmits, TVideoExposes, TVideoProps, TVideoSlots } from './Video';
import { EVideoPropsDefault } from './types/Video.enums';

// Composables
import useVideo from './composables/useVideo/useVideo';
import useVideoFullscreen from './composables/useVideoFullscreen/useVideoFullscreen';
import useVideoPlayback from './composables/useVideoPlayback/useVideoPlayback';
import useVideoTimeline from './composables/useVideoTimeline/useVideoTimeline';
import useVideoTimelinePopup from './composables/useVideoTimelinePopup/useVideoTimelinePopup';
import useVideoVolume from './composables/useVideoVolume/useVideoVolume';
import useVideoControls from './composables/useVideoControls/useVideoControls';
import useVideoClasses from './composables/useVideoClasses/useVideoClasses';
import useFocusBlur from '@/lib/composables/sensors/useFocusBlur/useFocusBlur';

// Components
import Slider from '@/lib/components/controls/Slider/Slider.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TVideoProps>(), {
  preload: EVideoPropsDefault.PRELOAD,
  controls: true,
  volume: EVideoPropsDefault.VOLUME,
  timeToHideControlsMs: EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS,
  timeToHideControlsOnOutsideMs: EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS,
  fastForwardSeconds: EVideoPropsDefault.FAST_FORWARD_SECONDS,
  fastRewindSeconds: EVideoPropsDefault.FAST_REWIND_SECONDS,
  cssClass: EVideoPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TVideoSlots>();
const emits = defineEmits<TVideoEmits>();

const videoRef = useTemplateRef('video');
const videoTagRef = useTemplateRef('videoTag');
const timeLineRef = useTemplateRef('timeLine');
const timeLinePopupRef = useTemplateRef('timeLinePopup');

const { uniqueID, componentClasses } = useVideo(props);

const { fullscreenState, fullscreenLocal, unFullscreenLocal, toggleFullscreen } =
  useVideoFullscreen(props, emits, videoRef);

const { playedState, playLocal, stopLocal, togglePlay, onVideoPlay, onVideoPause } =
  useVideoPlayback(props, emits, videoTagRef);

const {
  timePassed,
  timeLineValues,
  timeLineTracks,
  loading,
  clamp,
  seek,
  fastForward,
  fastRewind,
  onVideoTimeUpdate,
  onVideoProgress,
  onVideoWaiting,
  onVideoCanPlay,
  onChangeTimeLineStart,
  onChangeTimeLineEnd,
} = useVideoTimeline(props, emits, videoTagRef, playLocal, stopLocal);

const {
  timeLinePopupLeft,
  timeLinePopupTime,
  timeLinePopupVisible,
  onTimeLineMouseEnter,
  onTimeLineMouseLeave,
  onTimeLineMouseMove,
} = useVideoTimelinePopup(timeLineValues, clamp, timeLineRef, timeLinePopupRef, videoTagRef);

const { volumeState, volumeTracks, onToggleVolume, onClickVolume, onChangeVolume } = useVideoVolume(
  props,
  emits,
  videoTagRef,
);

const { onControlsMouseEnter, onControlsMouseLeave, showControls, onMouseLeave, controlsClasses } =
  useVideoControls(props, playedState);

const { onFocus: onFocusAction, onBlur: onBlurAction, isFocused: focusedAction } = useFocusBlur();
const { onFocus: onFocusVolume, onBlur: onBlurVolume, isFocused: focusedVolume } = useFocusBlur();
const {
  onFocus: onFocusFullscreen,
  onBlur: onBlurFullscreen,
  isFocused: focusedFullscreen,
} = useFocusBlur();
const {
  onFocus: onFocusTimeLine,
  onBlur: onBlurTimeLine,
  isFocused: focusedTimeLine,
} = useFocusBlur();

const { actionClasses, volumeClasses, fullscreenClasses, timeLineClasses, timeLinePopupClasses } =
  useVideoClasses(
    props,
    focusedAction,
    focusedVolume,
    focusedFullscreen,
    focusedTimeLine,
    timeLinePopupVisible,
  );

const videoWidth = computed(() => (fullscreenState.value ? 'auto' : props.width));
const videoHeight = computed(() => (fullscreenState.value ? 'auto' : props.height));

function onClickVideo(event: MouseEvent) {
  if (!videoRef.value || !event.target || !props.controls) {
    return;
  }

  if (
    (event.target as HTMLElement).tagName !== 'VIDEO' &&
    videoRef.value.contains(event.target as Node)
  ) {
    return;
  }

  togglePlay();
}

function parseTime(time: number): string {
  if (time <= 0) {
    return '00:00';
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secondsStr = seconds < 10 ? '0' + seconds : seconds;

  return `${minutesStr}:${secondsStr}`;
}

defineExpose<TVideoExposes>({
  stop: stopLocal,
  play: playLocal,
  togglePlay,
  getPlayedState: () => playedState.value,
  fullscreen: fullscreenLocal,
  unFullscreen: unFullscreenLocal,
  toggleFullscreen,
  getFullscreenState: () => fullscreenState.value,
  seek,
});
</script>
