<template>
  <!-- Separator -->
  <li
    v-if="props.item.separator && !props.item.hidden"
    :class="`${cssClass}__item ${cssClass}__item--separator`"
    role="presentation"
  >
    <DropdownMenuSeparator />
  </li>

  <!-- Regular item -->
  <li
    v-else-if="!props.item.hidden"
    :class="componentClasses"
    @mouseenter="hoverHandler"
    @mouseleave="leaveHandler"
  >
    <!-- Custom item slot provided by the consumer via provider -->
    <component
      :is="() => itemSlot!({ item: props.item, level: props.level ?? 1, close })"
      v-if="itemSlot"
    />

    <template v-else>
      <!-- Internal router-link (requires RouterLink v-slot for custom <a> rendering) -->
      <RouterLink
        v-if="renderType === 'internal'"
        v-slot="{ href, navigate }"
        custom
        :to="props.item.href!"
      >
        <a
          :href="href"
          :class="linkClasses"
          :aria-disabled="isDisabled || undefined"
          :aria-haspopup="hasChildren ? 'menu' : undefined"
          :aria-expanded="hasChildren ? isSubOpen : undefined"
          role="menuitem"
          @click="
            (e) => {
              navigate(e);
              clickHandler();
            }
          "
        >
          <DropdownMenuItemIcon v-if="props.item.icon" :icon="props.item.icon" />
          <span :class="`${cssClass}__label`">{{ props.item.label }}</span>
          <DropdownMenuItemBadge v-if="props.item.badge !== undefined" :badge="props.item.badge" />
          <span
            v-if="hasChildren"
            :class="[`${cssClass}__arrow`, { [`${cssClass}__arrow--open`]: isSubOpen }]"
            aria-hidden="true"
          />
        </a>
      </RouterLink>

      <!-- action (<a>), external (<a href>), toggle (<button>), plain (<div>) -->
      <component
        :is="
          renderType === 'action' || renderType === 'external'
            ? 'a'
            : renderType === 'toggle'
              ? 'button'
              : 'div'
        "
        v-else
        v-bind="linkAttrs"
        :type="renderType === 'toggle' ? 'button' : undefined"
        :class="linkClasses"
        :aria-disabled="isDisabled || undefined"
        :aria-haspopup="hasChildren ? 'menu' : undefined"
        :aria-expanded="hasChildren ? isSubOpen : undefined"
        role="menuitem"
        @click="clickHandler"
      >
        <DropdownMenuItemIcon v-if="props.item.icon" :icon="props.item.icon" />
        <span :class="`${cssClass}__label`">{{ props.item.label }}</span>
        <DropdownMenuItemBadge v-if="props.item.badge !== undefined" :badge="props.item.badge" />
        <span
          v-if="hasChildren"
          :class="[`${cssClass}__arrow`, { [`${cssClass}__arrow--open`]: isSubOpen }]"
          aria-hidden="true"
        />
      </component>

      <!-- Nested sub-menu -->
      <DropdownMenuList
        v-if="hasChildren && isSubOpen"
        :data="props.item.children!"
        :level="(props.level ?? 1) + 1"
      />
    </template>
  </li>
</template>

<script setup lang="ts">
// Components
import DropdownMenuSeparator from '../DropdownMenuSeparator/DropdownMenuSeparator.vue';
import DropdownMenuItemIcon from '../DropdownMenuItemIcon/DropdownMenuItemIcon.vue';
import DropdownMenuItemBadge from '../DropdownMenuItemBadge/DropdownMenuItemBadge.vue';
import DropdownMenuList from '../DropdownMenuList/DropdownMenuList.vue';

// Types
import type { TDropdownMenuItemProps } from './DropdownMenuItem';

// Composables
import useDropdownMenuItem from '../../composables/useDropdownMenuItem/useDropdownMenuItem';

const props = withDefaults(defineProps<TDropdownMenuItemProps>(), {
  level: 1,
});

const {
  cssClass,
  isDisabled,
  hasChildren,
  isSubOpen,
  renderType,
  linkAttrs,
  componentClasses,
  linkClasses,
  clickHandler,
  hoverHandler,
  leaveHandler,
  itemSlot,
  close,
} = useDropdownMenuItem(props);
</script>
