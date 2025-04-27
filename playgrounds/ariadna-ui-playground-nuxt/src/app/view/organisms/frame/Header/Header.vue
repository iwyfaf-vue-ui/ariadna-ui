<template>
  <div :class="headerClasses.base">
    <div :class="headerClasses.left">
      <Button @click="sidebarCollapsedHandler"> Collapse </Button>

      <NuxtLink to="/">
        <img :src="Logo" alt="Логотип" title="Логотип" />
      </NuxtLink>
    </div>

    <div :class="headerClasses.center"></div>
    <div :class="headerClasses.right"></div>
  </div>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Static
import Logo from '~/public/images/logo.svg';

// Composables
import useSidebar from '~/composables/states/useSidebar/useSidebar';

const { sidebarCollapsed, sidebarCollapsedHandler } = useSidebar();

const headerClasses = computed(() => {
  const baseClass = 'header';
  const modifier = sidebarCollapsed.value ? `${baseClass}--toggled` : '';

  return {
    base: [baseClass, modifier],
    left: `${baseClass}__left`,
    center: `${baseClass}__center`,
    right: `${baseClass}__right`,
  };
});
</script>

<style lang="scss">
// .header
.header {
  position: fixed;
  display: flex;
  height: var(--header-height);
  column-gap: var(--indent-margin-large);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 320px;
  padding: 0 var(--indent-margin-xlarge);
  z-index: 9999;
  background-color: var(--color-background-default-strong);
  border-bottom: 1px solid var(--color-border-default);

  // .header__left
  &__left {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    align-items: center;

    // .header__left img
    img {
      height: 20px;
      padding-left: var(--indent-margin-large);
    }
  }

  // .header__center
  &__center {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  // .header__right
  &__right {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-end;
    margin-right: 12px;
  }
}
</style>
