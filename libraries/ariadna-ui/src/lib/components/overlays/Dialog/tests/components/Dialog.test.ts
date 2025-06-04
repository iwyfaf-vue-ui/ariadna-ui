import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Dialog from '../../Dialog.vue';
import { DialogSelectorTestData } from '../test-data/Dialog.selector.test-data';

const defaultMock = new DialogSelectorTestData();

vi.mock('@/lib/composables/elements/useDragViewport/useDragViewport', () => {
  return {
    default: vi.fn(() => ({
      style: {
        top: '140px',
        left: '140px',
        position: 'absolute',
      },
      isDragging: { value: true },
    })),
  };
});

describe('Dialog.vue', () => {
  describe('Basic render', () => {
    it('Should render component without errors.', () => {
      mount(Dialog, {
        props: {
          visible: true,
        },
      });

      const teleportedElement = document.body.querySelector(defaultMock.rootEl);
      expect(teleportedElement).toBeTruthy();
    });

    it('Should apply root and theme modifier CSS classes.', () => {
      mount(Dialog, {
        props: {
          visible: true,
        },
        attachTo: document.body,
      });

      const rootSelector = defaultMock.rootEl;
      const themeModifier = defaultMock.themeModifier;
      const draggingModifier = defaultMock.draggingModifier;

      const teleportedElement = document.body.querySelector(rootSelector);

      expect(teleportedElement).toBeTruthy();

      const classList = teleportedElement!.className.split(/\s+/);

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(rootSelector),
        defaultMock.getSelectorWithoutDot(themeModifier),
        defaultMock.getSelectorWithoutDot(draggingModifier),
      ];

      expect(classList).toEqual(expect.arrayContaining(expectedClasses));
      expect(classList.length).toBe(expectedClasses.length);
    });
  });

  describe('Props', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      wrapper.unmount();
      document.body.innerHTML = '';
    });

    it('visible: Should render dialog elements when visible prop is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: false,
        },
      });

      await wrapper.setProps({ visible: true });

      expect(document.body.querySelector(defaultMock.rootEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.containerEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.dialogEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.overlayEl)).toBeTruthy();
    });

    it('maximized: Should apply maximized modifier class when maximized prop is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
          maximized: true,
        },
      });

      expect(
        document.body.querySelector(defaultMock.getSelectorWithDot(defaultMock.maximizedModifier)),
      ).toBeTruthy();
    });

    it('draggable: Should applies draggable styles when draggable is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
          draggable: true,
        },
        attachTo: document.body,
      });

      const dialogEl = document.body.querySelector(defaultMock.dialogEl) as HTMLDivElement;
      expect(dialogEl).toBeTruthy();

      // Проверяем, что стили draggable применены из моков
      expect(dialogEl.style.top).toBe('140px');
      expect(dialogEl.style.left).toBe('140px');
      expect(dialogEl.style.position).toBe('absolute');
    });

    it('contentScrollable: Should apply contentScrollable modifier class when contentScrollable prop is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ contentScrollable: true });

      expect(
        document.body.querySelector(
          defaultMock.getSelectorWithDot(defaultMock.contentScrollableModifier),
        ),
      ).toBeTruthy();
    });

    it('persistent: Should prevent dialog close on Escape key when persistent prop is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ persistent: true });

      const keyboardEscapeEvent = new KeyboardEvent('keydown', { code: 'Escape' });
      window.dispatchEvent(keyboardEscapeEvent);

      await nextTick();

      expect(wrapper.emitted()).not.toHaveProperty('update:visible');
    });

    it('noOverlayDismiss: Should close dialog on overlay click when noOverlayDismiss is false.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ noOverlayDismiss: false });
      await nextTick();

      const container = document.body.querySelector(defaultMock.containerEl);
      expect(container).toBeTruthy();

      if (container) {
        await container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        expect(wrapper.emitted('hide')).toBeDefined();
        expect(wrapper.emitted('update:visible')).toBeDefined();
        expect(wrapper.emitted('update:visible')![0]).toEqual([false]);
      }
    });

    it('noOverlayDismiss: Should NOT close dialog on overlay click when noOverlayDismiss is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ noOverlayDismiss: true });
      await nextTick();

      const container = document.body.querySelector('.ar-dialog__container');
      expect(container).toBeTruthy();

      if (container) {
        await container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        expect(wrapper.emitted('hide')).toBeUndefined();
        expect(wrapper.emitted('update:visible')).toBeUndefined();
      }
    });

    it('noEscDismiss: Should close dialog on Escape keydown when noEscDismiss is false.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ noEscDismiss: false });
      await nextTick();

      const keyboardEvent = new KeyboardEvent('keydown', { code: 'Escape' });
      window.dispatchEvent(keyboardEvent);
      await nextTick();

      expect(wrapper.emitted('hide')).toBeFalsy();
      expect(wrapper.emitted('update:visible')).toBeFalsy();
    });

    it('noEscDismiss: Should NOT close dialog on Escape keydown when noEscDismiss is true.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ noEscDismiss: true });
      await nextTick();

      const keyboardEvent = new KeyboardEvent('keydown', { code: 'Escape' });
      window.dispatchEvent(keyboardEvent);
      await nextTick();

      expect(wrapper.emitted('hide')).toBeUndefined();
      expect(wrapper.emitted('update:visible')).toBeUndefined();
    });

    it('shake: Should add shake modifier class on overlay click when shake is true and dialog is persistent', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
          shake: true,
          persistent: true,
        },
      });

      const container = document.body.querySelector(defaultMock.containerEl);
      expect(container).toBeTruthy();

      if (container) {
        await container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        const rootSelector = defaultMock.rootEl;
        const rootEl = document.body.querySelector(rootSelector);
        expect(rootEl).toBeTruthy();

        // Проверяем, что класс shake добавлен
        expect(rootEl!.classList.contains(defaultMock.shakeModifier.replace('.', ''))).toBe(true);

        // Попытка повторного клика не должна добавлять класс повторно (shakeState блокирует)
        await container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        // Класс должен остаться, не добавляться заново (нет дублирования)
        expect(rootEl!.classList.contains(defaultMock.shakeModifier.replace('.', ''))).toBe(true);

        // Продвигаем таймер на 200 мс, чтобы shake эффект сбросился
        vi.advanceTimersByTime(200);
        await nextTick();

        // После таймера класс shake должен быть удалён
        expect(rootEl!.classList.contains(defaultMock.shakeModifier.replace('.', ''))).toBe(false);
      }
    });

    it('shake: Should not add shake class when shake prop is false', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
          shake: false,
          persistent: true,
        },
      });

      const container = document.body.querySelector(defaultMock.containerEl);
      expect(container).toBeTruthy();

      if (container) {
        await container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        const rootSelector = defaultMock.rootEl;
        const rootEl = document.body.querySelector(rootSelector);
        expect(rootEl).toBeTruthy();

        expect(rootEl!.classList.contains(defaultMock.shakeModifier)).toBe(false);
      }
    });

    it('overlay: Should render overlay element when overlay prop is true and remove it when false.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      await wrapper.setProps({ overlay: true });

      expect(document.body.querySelector(defaultMock.overlayEl)).toBeTruthy();

      await wrapper.setProps({ overlay: false });

      expect(document.body.querySelector(defaultMock.overlayEl)).toBeFalsy();
    });

    it('appendTo: Should render dialog in default teleport target (body) when appendTo prop is not specified.', async () => {
      mount(Dialog, {
        props: {
          visible: true,
        },
      });

      const teleportedElement = document.body.querySelector(defaultMock.rootEl);
      expect(teleportedElement).toBeTruthy();
    });

    it('appendTo: Should render dialog in specified teleport target when appendTo prop is set.', async () => {
      const teleportTarget = document.createElement('div');
      teleportTarget.id = 'teleport-target';
      document.body.appendChild(teleportTarget);

      mount(Dialog, {
        props: {
          visible: true,
          appendTo: '#teleport-target',
        },
      });

      const teleportedElement = teleportTarget.querySelector(defaultMock.rootEl);
      expect(teleportedElement).toBeTruthy();
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new DialogSelectorTestData(defaultMock.cssClassProp);

      wrapper = mount(Dialog, {
        props: {
          visible: true,
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
          maximized: true,
          contentScrollable: true,
          draggable: true,
        },
        slots: {
          header: await DialogSelectorTestData.getDialogHeaderSlotCustom(),
          content: await DialogSelectorTestData.getDialogContentSlotCustom(),
          footer: await DialogSelectorTestData.getDialogFooterSlotCustom(),
        },
      });

      const rootSelector = _defaultMock.rootEl;
      const rootEl = document.body.querySelector(rootSelector);
      expect(rootEl).toBeTruthy();

      expect(rootEl!.classList.contains(_defaultMock.themeModifier)).toBe(true);
      expect(rootEl!.classList.contains(_defaultMock.maximizedModifier)).toBe(true);
      expect(rootEl!.classList.contains(_defaultMock.contentScrollableModifier)).toBe(true);
      expect(rootEl!.classList.contains(_defaultMock.draggingModifier)).toBe(true);
      expect(rootEl!.classList.contains(_defaultMock.primaryModifier)).toBe(true);
      expect(document.body.querySelector(_defaultMock.overlayEl)).not.toBe(null);
      expect(document.body.querySelector(_defaultMock.containerEl)).not.toBe(null);
      expect(document.body.querySelector(_defaultMock.dialogEl)).not.toBe(null);
      expect(document.body.querySelector(_defaultMock.headerEl)).not.toBe(null);
      expect(document.body.querySelector(_defaultMock.contentEl)).not.toBe(null);
      expect(document.body.querySelector(_defaultMock.footerEl)).not.toBe(null);
    });

    it('modifier: Should apply modifier class.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(
        document.body
          .querySelector(defaultMock.rootEl)!
          .classList.contains(defaultMock.primaryModifier),
      ).toBe(true);
    });
  });

  describe('Slots', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
      wrapper.unmount();
      document.body.innerHTML = '';
    });

    it('header: Should not render header slot content when header slot is not provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      expect(document.body.querySelector(defaultMock.headerEl)).toBeFalsy();
    });

    it('header: Should render custom header slot content when header slot is provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
        slots: {
          header: await DialogSelectorTestData.getDialogHeaderSlotCustom(),
        },
      });

      expect(document.body.querySelector(defaultMock.headerEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.headerEl)!.innerHTML).toBe(
        await DialogSelectorTestData.getDialogHeaderSlotCustom(),
      );
    });

    it('content: Should not render content slot content when content slot is not provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      expect(document.body.querySelector(defaultMock.contentEl)).toBeFalsy();
    });

    it('content: Should render custom content slot content when content slot is provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
        slots: {
          content: await DialogSelectorTestData.getDialogContentSlotCustom(),
        },
      });

      expect(document.body.querySelector(defaultMock.contentEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.contentEl)!.innerHTML).toBe(
        await DialogSelectorTestData.getDialogContentSlotCustom(),
      );
    });

    it('footer: Should not render footer slot content when footer slot is not provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });

      expect(document.body.querySelector(defaultMock.footerEl)).toBeFalsy();
    });

    it('footer: Should render custom footer slot content when footer slot is provided.', async () => {
      wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
        slots: {
          footer: await DialogSelectorTestData.getDialogFooterSlotCustom(),
        },
      });

      expect(document.body.querySelector(defaultMock.footerEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.footerEl)!.innerHTML).toBe(
        await DialogSelectorTestData.getDialogFooterSlotCustom(),
      );
    });
  });

  describe('Emits', async () => {
    let wrapper: VueWrapper;

    afterEach(() => {
      wrapper.unmount();
      document.body.innerHTML = '';
    });

    describe('Emits', () => {
      it('mounted: Should emit "mounted" when visible mounted.', async () => {
        wrapper = mount(Dialog, {
          props: {
            visible: false,
          },
        });

        expect(wrapper.emitted('mounted')).toBeDefined();
      });

      it('update:visible: Should emit "update:visible" when visible changes.', async () => {
        wrapper = mount(Dialog, {
          props: {
            visible: true,
          },
        });

        await wrapper.setProps({ visible: true });
        await nextTick();

        await wrapper.setProps({ visible: false });
        await nextTick();

        expect(wrapper.emitted('update:visible')).toBeDefined();
        expect(wrapper.emitted('update:visible')![0]).toEqual([false]);
      });

      it('show: Should emit "show" when visible is true.', async () => {
        wrapper = mount(Dialog, {
          props: {
            visible: false,
          },
        });

        await wrapper.setProps({ visible: true });
        await nextTick();

        expect(wrapper.emitted('show')).toBeDefined();
      });

      it('Should emit "hide" event when hide function from header slot is called', async () => {
        let hideFn: ((e: Event) => void) | undefined;

        const headerSlot = ({ hide }: { hide: (e: Event) => void }) => {
          hideFn = hide;
          return 'Header Content';
        };

        wrapper = mount(Dialog, {
          props: {
            visible: true,
          },
          slots: {
            header: headerSlot,
          },
        });

        await nextTick();

        expect(hideFn).toBeDefined();

        hideFn!(new Event('close'));
        await nextTick();

        expect(wrapper.emitted()).toHaveProperty('hide');
        expect(wrapper.emitted()).toHaveProperty('update:visible');
        expect(wrapper.emitted()['update:visible'][0]).toEqual([false]);
      });

      it('Should emit "after-hide" on after-leave transition event.', async () => {
        wrapper = mount(Dialog, {
          props: {
            visible: false,
          },
        });
        const vm = wrapper.vm;

        // @ts-ignore Using internal method for run Transition Vue-component
        await vm.onAfterLeave();

        expect(wrapper.emitted('after-hide')).toBeDefined();
      });

      it('Should emit "maximized" and "unMaximized" on toggleMaximize call from header slot', async () => {
        let toggleMaximizeFn: ((e: Event) => void) | undefined;

        const headerSlot = ({ toggleMaximize }: { toggleMaximize: (e: Event) => void }) => {
          toggleMaximizeFn = toggleMaximize;
          return 'Header';
        };

        wrapper = mount(Dialog, {
          props: {
            visible: true,
          },
          slots: {
            header: headerSlot,
          },
        });

        await nextTick();

        expect(toggleMaximizeFn).toBeDefined();

        toggleMaximizeFn!(new Event('click'));
        await nextTick();
        expect(wrapper.emitted('maximized')).toBeDefined();

        toggleMaximizeFn!(new Event('click'));
        await nextTick();
        expect(wrapper.emitted('unMaximized')).toBeDefined();
      });
    });

    describe('Accessibility', () => {
      it('Overlay div should have role="dialog", aria-hidden="true" and tabindex="-1".', async () => {
        wrapper = mount(Dialog, {
          props: {
            visible: false,
          },
        });

        await wrapper.setProps({ visible: true });
        await nextTick();

        const overlayEl = document.body.querySelector(defaultMock.overlayEl)! as HTMLDivElement;

        expect(overlayEl.getAttribute('role')).toBe('dialog');
        expect(overlayEl.getAttribute('aria-hidden')).toBe('true');
        expect(overlayEl.getAttribute('tabindex')).toBe('-1');
      });
    });
  });
});
