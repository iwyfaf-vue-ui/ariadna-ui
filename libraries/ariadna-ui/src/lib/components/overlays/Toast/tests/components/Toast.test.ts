import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Toast from '../../Toast.vue';
import toastEventBus from '../../event-bus/Toast.event-bus';
import { EToastApi, EToastPropsDefault, EViewerErrors } from '../../types/Toast.enums';
import { ToastApiProviderKey } from '../../providers/Toast.provider';
import { ToastSelectorTestData } from '../test-data/Toast.selector.test-data';
import type { TToastMessage } from '../../types/Toast.types';
import type { TToastApi } from '../../Toast';

const defaultMock = new ToastSelectorTestData();

const mockToastService: TToastApi = {
  created: vi.fn(),
  mounted: vi.fn(),
  unMounted: vi.fn(),
  add: vi.fn(),
  remove: vi.fn(),
  removeGroup: vi.fn(),
  removeAll: vi.fn(),
};

function mountToast(props = defaultMock.mockProps, slots: Record<string, any> = {}): VueWrapper {
  return mount(Toast, {
    props,
    slots,
    attachTo: document.body,
    global: {
      provide: {
        [ToastApiProviderKey]: mockToastService,
      },
    },
  });
}

async function addMessage(message: Partial<TToastMessage> = {}): Promise<void> {
  toastEventBus.emit(EToastApi.ADD, {
    summary: 'Test summary',
    detail: 'Test detail',
    group: EToastPropsDefault.GROUP,
    ...message,
  } as any);
  await nextTick();
}

describe('Toast.vue', () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper?.unmount();
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('Basic render', () => {
    it('Should render root element in body when ToastService is provided.', () => {
      wrapper = mountToast();

      expect(document.body.querySelector(defaultMock.rootEl)).toBeTruthy();
    });

    it('Should apply default CSS classes on root element.', () => {
      wrapper = mountToast();

      const rootEl = document.body.querySelector(defaultMock.rootEl);
      expect(rootEl).toBeTruthy();

      const classList = rootEl!.className.split(/\s+/);
      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.positionYTopModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.positionXRightModifier),
      ];

      expect(classList).toEqual(expect.arrayContaining(expectedClasses));
    });

    it('Should render with empty messages list initially.', () => {
      wrapper = mountToast();

      const messageEls = document.body.querySelectorAll(defaultMock.messageEl);

      expect(messageEls.length).toBe(0);
    });

    it('Should throw error when ToastService is not installed.', () => {
      expect(() =>
        mount(Toast, {
          props: defaultMock.mockProps,
          attachTo: document.body,
        }),
      ).toThrow(EViewerErrors.NOT_INSTALL_SERVICE);
    });

    it('Should render message element when message is added via event bus.', async () => {
      wrapper = mountToast();
      await addMessage();

      const messageEls = document.body.querySelectorAll(defaultMock.messageEl);

      expect(messageEls.length).toBe(1);
    });
  });

  describe('Props', () => {
    it('positionY: Should apply top modifier class by default.', () => {
      wrapper = mountToast();

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYTopModifier),
      );
    });

    it('positionY: Should apply bottom modifier class when positionY is "bottom".', () => {
      wrapper = mountToast({ ...defaultMock.mockProps, positionY: 'bottom' });

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYBottomModifier),
      );
      expect(rootEl!.className).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYTopModifier),
      );
    });

    it('positionY: Should apply center modifier class when positionY is "center".', () => {
      wrapper = mountToast({ ...defaultMock.mockProps, positionY: 'center' });

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionYCenterModifier),
      );
    });

    it('positionX: Should apply right modifier class by default.', () => {
      wrapper = mountToast();

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXRightModifier),
      );
    });

    it('positionX: Should apply left modifier class when positionX is "left".', () => {
      wrapper = mountToast({ ...defaultMock.mockProps, positionX: 'left' });

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXLeftModifier),
      );
      expect(rootEl!.className).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXRightModifier),
      );
    });

    it('positionX: Should apply center modifier class when positionX is "center".', () => {
      wrapper = mountToast({ ...defaultMock.mockProps, positionX: 'center' });

      const rootEl = document.body.querySelector(defaultMock.rootEl);

      expect(rootEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.positionXCenterModifier),
      );
    });

    it('group: Should use "default" group by default.', async () => {
      wrapper = mountToast();
      await addMessage({ group: EToastPropsDefault.GROUP });

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('group: Should render message when group matches the configured group.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'my-group' });

      toastEventBus.emit(EToastApi.ADD, { summary: 'Matched', group: 'my-group' });
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('group: Should not render message when group does not match the configured group.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'my-group' });

      toastEventBus.emit(EToastApi.ADD, { summary: 'Not matched', group: 'other-group' });
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('group: Should render message with undefined group when configured group is "default".', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: EToastPropsDefault.GROUP });

      toastEventBus.emit(EToastApi.ADD, { summary: 'No group', group: undefined });
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('group: Should not render message with undefined group when configured group is not "default".', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'custom-group' });

      toastEventBus.emit(EToastApi.ADD, { summary: 'No group', group: undefined });
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('group: Should only render messages belonging to the configured group when multiple groups emit.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'group-a' });

      toastEventBus.emit(EToastApi.ADD, { summary: 'Group A', group: 'group-a' });
      toastEventBus.emit(EToastApi.ADD, { summary: 'Group B', group: 'group-b' });
      toastEventBus.emit(EToastApi.ADD, { summary: 'Group A again', group: 'group-a' });
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(2);
    });

    it('max: Should limit displayed messages to max count and remove oldest.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, max: 2 });

      await addMessage({ summary: 'First' });
      await addMessage({ summary: 'Second' });
      await addMessage({ summary: 'Third' });

      const messageEls = document.body.querySelectorAll(defaultMock.messageEl);

      expect(messageEls.length).toBe(2);
    });

    it('hideProgressbar: Should hide progress bar when hideProgressbar is true.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, hideProgressbar: true });
      await addMessage({ ttl: 5000 });

      expect(document.body.querySelector(defaultMock.messageProgressEl)).toBeFalsy();
    });

    it('hideProgressbar: Should show progress bar when hideProgressbar is false and ttl is set.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, hideProgressbar: false });
      await addMessage({ ttl: 5000 });

      expect(document.body.querySelector(defaultMock.messageProgressEl)).toBeTruthy();
      expect(document.body.querySelector(defaultMock.messageProgressBarEl)).toBeTruthy();
    });

    it('hideProgressbar: Should not show progress bar for message without ttl.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, hideProgressbar: false });
      await addMessage({ ttl: undefined });

      expect(document.body.querySelector(defaultMock.messageProgressEl)).toBeFalsy();
    });

    it('appendTo: Should render Toast in body by default.', () => {
      wrapper = mountToast();

      expect(document.body.querySelector(defaultMock.rootEl)).toBeTruthy();
    });

    it('appendTo: Should render Toast in specified teleport target when appendTo is set.', () => {
      const teleportTarget = document.createElement('div');
      teleportTarget.id = 'toast-teleport-target';
      document.body.appendChild(teleportTarget);

      wrapper = mountToast({ ...defaultMock.mockProps, appendTo: '#toast-teleport-target' });

      expect(teleportTarget.querySelector(defaultMock.rootEl)).toBeTruthy();
    });

    it('onMouseEnter: Should call onMouseEnter callback when mouseenter event fires.', async () => {
      const onMouseEnter = vi.fn();
      wrapper = mountToast({ ...defaultMock.mockProps, onMouseEnter });

      const rootEl = document.body.querySelector(defaultMock.rootEl);
      rootEl?.dispatchEvent(new MouseEvent('mouseenter'));
      await nextTick();

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('onMouseLeave: Should call onMouseLeave callback when mouseleave event fires.', async () => {
      const onMouseLeave = vi.fn();
      wrapper = mountToast({ ...defaultMock.mockProps, onMouseLeave });

      const rootEl = document.body.querySelector(defaultMock.rootEl);
      rootEl?.dispatchEvent(new MouseEvent('mouseleave'));
      await nextTick();

      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('onClick: Should call onClick callback when component is clicked.', async () => {
      const onClick = vi.fn();
      wrapper = mountToast({ ...defaultMock.mockProps, onClick });

      const rootEl = document.body.querySelector(defaultMock.rootEl);
      rootEl?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('cssClass: Should apply custom root CSS class and child element classes.', async () => {
      const customMock = new ToastSelectorTestData(defaultMock.cssClassProp);

      wrapper = mountToast({ ...defaultMock.mockProps, cssClass: defaultMock.cssClassProp });
      await addMessage();

      expect(document.body.querySelector(customMock.rootEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageHeaderEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageSummaryEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageAsideEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageCaptionEl)).toBeTruthy();
      expect(document.body.querySelector(customMock.messageDetailEl)).toBeTruthy();

      expect(document.body.querySelector(defaultMock.rootEl)).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('detail: Should render message detail text in detail element by default.', async () => {
      const defaultDetailHtml = await ToastSelectorTestData.getToastDetailSlotDefault();

      wrapper = mountToast();
      await addMessage({ detail: defaultDetailHtml });

      const detailEl = document.body.querySelector(defaultMock.messageDetailEl);

      expect(detailEl).toBeTruthy();
      expect(detailEl!.textContent?.trim()).toBe(defaultDetailHtml);
    });

    it('detail: Should render custom detail slot content.', async () => {
      const customDetailHtml = await ToastSelectorTestData.getToastDetailSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { detail: customDetailHtml });
      await addMessage({ detail: 'Original detail' });

      const detailEl = document.body.querySelector(defaultMock.messageDetailEl);

      expect(detailEl!.innerHTML).toBe(customDetailHtml);
    });

    it('messageIcon: Should render custom messageIcon slot for message with modifier.', async () => {
      const customMessageIconHtml = await ToastSelectorTestData.getToastMessageIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { messageIcon: customMessageIconHtml });
      await addMessage({ modifier: 'info' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.innerHTML).toContain(customMessageIconHtml);
    });

    it('messageIcon: Should show icon element when messageIcon slot is provided with no modifier.', async () => {
      const customMessageIconHtml = await ToastSelectorTestData.getToastMessageIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { messageIcon: customMessageIconHtml });
      await addMessage({ summary: 'No modifier', modifier: undefined });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.innerHTML).toContain(customMessageIconHtml);
    });

    it('summary: Should render message summary text in summary element by default.', async () => {
      const defaultSummaryHtml = await ToastSelectorTestData.getToastSummarySlotDefault();

      wrapper = mountToast();
      await addMessage({ summary: defaultSummaryHtml });

      const summaryEl = document.body.querySelector(defaultMock.messageSummaryEl);

      expect(summaryEl).toBeTruthy();
      expect(summaryEl!.textContent?.trim()).toBe(defaultSummaryHtml);
    });

    it('summary: Should render custom summary slot content.', async () => {
      const customSummaryHtml = await ToastSelectorTestData.getToastSummarySlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { summary: customSummaryHtml });
      await addMessage({ summary: 'Original summary' });

      const summaryEl = document.body.querySelector(defaultMock.messageSummaryEl);

      expect(summaryEl!.innerHTML).toBe(customSummaryHtml);
    });

    it('summary: Should not render summary content when message has no summary.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: undefined });

      const summaryEl = document.body.querySelector(defaultMock.messageSummaryEl);

      expect(summaryEl).toBe(null);
    });

    it('caption: Should render message caption text in caption element by default.', async () => {
      const defaultCaptionHtml = await ToastSelectorTestData.getToastCaptionSlotDefault();
      wrapper = mountToast();
      await addMessage({ caption: defaultCaptionHtml });

      const captionEl = document.body.querySelector(defaultMock.messageCaptionEl);

      expect(captionEl).toBeTruthy();
      expect(captionEl!.textContent?.trim()).toBe(defaultCaptionHtml);
    });

    it('caption: Should render custom caption slot content.', async () => {
      const customCaptionHtml = await ToastSelectorTestData.getToastCaptionSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { caption: customCaptionHtml });
      await addMessage({ caption: 'Original caption' });

      const captionEl = document.body.querySelector(defaultMock.messageCaptionEl);

      expect(captionEl!.innerHTML).toBe(customCaptionHtml);
    });

    it('caption: Should not render caption content when message has no caption.', async () => {
      wrapper = mountToast();
      await addMessage({ caption: undefined });

      const captionEl = document.body.querySelector(defaultMock.messageCaptionEl);

      expect(captionEl!.textContent?.trim()).toBe('');
    });

    it('closeIcon: Should render default close Button when message is closable.', async () => {
      wrapper = mountToast();
      await addMessage({ closable: true });

      const closeButton = document.body.querySelector('button[aria-label="Close"]');

      expect(closeButton).toBeTruthy();
    });

    it('closeIcon: Should not render close Button when message is not closable.', async () => {
      wrapper = mountToast();
      await addMessage({ closable: false });

      const closeButton = document.body.querySelector('button[aria-label="Close"]');

      expect(closeButton).toBeFalsy();
    });

    it('closeIcon: Should render custom close icon slot content instead of default Button.', async () => {
      const customCloseIconHtml = await ToastSelectorTestData.getToastCloseIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { closeIcon: customCloseIconHtml });
      await addMessage({ closable: true });

      expect(document.body.querySelector('button[aria-label="Close"]')).toBeFalsy();
      expect(document.body.querySelector('.custom-close')).toBeTruthy();
    });

    it('infoIcon: Should render default info icon for message with modifier "info".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'info' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.textContent?.trim()).toBe('!');
    });

    it('infoIcon: Should render custom infoIcon slot content for modifier "info".', async () => {
      const customInfoIconHtml = await ToastSelectorTestData.getToastInfoIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { infoIcon: customInfoIconHtml });
      await addMessage({ modifier: 'info' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl!.innerHTML).toContain(customInfoIconHtml);
    });

    it('warnIcon: Should render default warn icon for message with modifier "warning".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'warning' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.textContent?.trim()).toBe('!');
    });

    it('warnIcon: Should render custom warnIcon slot content for modifier "warning".', async () => {
      const customWarnIconHtml = await ToastSelectorTestData.getToastWarnIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { warnIcon: customWarnIconHtml });
      await addMessage({ modifier: 'warning' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl!.innerHTML).toContain(customWarnIconHtml);
    });

    it('dangerIcon: Should render default danger icon for message with modifier "danger".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'danger' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.textContent?.trim()).toBe('X');
    });

    it('dangerIcon: Should render custom dangerIcon slot content for modifier "danger".', async () => {
      const customDangerIconHtml = await ToastSelectorTestData.getToastDangerIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { dangerIcon: customDangerIconHtml });
      await addMessage({ modifier: 'danger' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl!.innerHTML).toContain(customDangerIconHtml);
    });

    it('successIcon: Should render default success icon for message with modifier "success".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'success' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl).toBeTruthy();
      expect(iconEl!.textContent?.trim()).toBe('✓');
    });

    it('successIcon: Should render custom successIcon slot content for modifier "success".', async () => {
      const customSuccessIconHtml = await ToastSelectorTestData.getToastSuccessIconSlotCustom();
      wrapper = mountToast(defaultMock.mockProps, { successIcon: customSuccessIconHtml });
      await addMessage({ modifier: 'success' });

      const iconEl = document.body.querySelector(defaultMock.messageIconEl);

      expect(iconEl!.innerHTML).toContain(customSuccessIconHtml);
    });
  });

  describe('Emits', () => {
    it('add: Should emit "add" event when a message is added via event bus.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'New message' });

      expect(wrapper.emitted('add')).toBeDefined();
      expect(wrapper.emitted('add')![0][0]).toMatchObject({
        message: expect.objectContaining({ summary: 'New message' }),
      });
    });

    it('add: Should emit "add" for each added message.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'First' });
      await addMessage({ summary: 'Second' });

      expect(wrapper.emitted('add')?.length).toBe(2);
    });

    it('close: Should emit "close" event when close button is clicked.', async () => {
      wrapper = mountToast();
      await addMessage({ closable: true });

      const closeButton = document.body.querySelector(
        'button[aria-label="Close"]',
      ) as HTMLButtonElement;
      expect(closeButton).toBeTruthy();

      closeButton.click();
      await nextTick();

      expect(wrapper.emitted('close')).toBeDefined();
    });

    it('close: Should emit "close" with correct id and message payload.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'Closable message', closable: true });

      const closeButton = document.body.querySelector(
        'button[aria-label="Close"]',
      ) as HTMLButtonElement;
      closeButton.click();
      await nextTick();

      expect(wrapper.emitted('close')![0][0]).toMatchObject({
        message: expect.objectContaining({ summary: 'Closable message' }),
      });
    });

    it('close: Should remove message from DOM when close button is clicked.', async () => {
      wrapper = mountToast();
      await addMessage({ closable: true });

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);

      const closeButton = document.body.querySelector(
        'button[aria-label="Close"]',
      ) as HTMLButtonElement;
      closeButton.click();
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('ttl-end: Should emit "ttl-end" event when message lifetime expires.', async () => {
      vi.useFakeTimers();
      wrapper = mountToast();
      await addMessage({ ttl: 1000 });

      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(wrapper.emitted('ttl-end')).toBeDefined();
      vi.useRealTimers();
    });

    it('ttl-end: Should remove message from DOM when ttl expires.', async () => {
      vi.useFakeTimers();
      wrapper = mountToast();
      await addMessage({ ttl: 500 });

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);

      vi.advanceTimersByTime(500);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
      vi.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('Should set role="alert" for message with modifier "danger".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'danger' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl?.getAttribute('role')).toBe('alert');
    });

    it('Should set role="status" for message with modifier "info".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'info' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl?.getAttribute('role')).toBe('status');
    });

    it('Should set role="status" for message with modifier "warning".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'warning' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl?.getAttribute('role')).toBe('status');
    });

    it('Should set role="status" for message with modifier "success".', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'success' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl?.getAttribute('role')).toBe('status');
    });

    it('Should set role="status" for message with no modifier.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: undefined });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl?.getAttribute('role')).toBe('status');
    });

    it('Should set aria-label="Close" on the default close button.', async () => {
      wrapper = mountToast();
      await addMessage({ closable: true });

      const closeButton = document.body.querySelector('button[aria-label="Close"]');

      expect(closeButton).toBeTruthy();
      expect(closeButton?.getAttribute('aria-label')).toBe('Close');
    });
  });

  describe('Edge cases', () => {
    it('Should not render messages that belong to a different group.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'my-group' });
      toastEventBus.emit(EToastApi.ADD, {
        summary: 'Different group',
        group: 'other-group',
      } as any);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('Should render messages that belong to the matching group.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'my-group' });
      toastEventBus.emit(EToastApi.ADD, {
        summary: 'My group message',
        group: 'my-group',
      } as any);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('Should remove specific message via REMOVE event on event bus.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'First' });
      await addMessage({ summary: 'Second' });

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(2);

      toastEventBus.emit(EToastApi.REMOVE, 1);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('Should remove all messages via REMOVE_ALL event on event bus.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'First' });
      await addMessage({ summary: 'Second' });

      toastEventBus.emit(EToastApi.REMOVE_ALL, null);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('Should remove messages by group via REMOVE_GROUP event on event bus.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'target-group' });
      toastEventBus.emit(EToastApi.ADD, { summary: 'Message 1', group: 'target-group' } as any);
      toastEventBus.emit(EToastApi.ADD, { summary: 'Message 2', group: 'target-group' } as any);
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(2);

      toastEventBus.emit(EToastApi.REMOVE_GROUP, 'target-group');
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(0);
    });

    it('Should not remove messages for non-matching group via REMOVE_GROUP event.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, group: 'my-group' });
      toastEventBus.emit(EToastApi.ADD, { summary: 'Message', group: 'my-group' } as any);
      await nextTick();

      toastEventBus.emit(EToastApi.REMOVE_GROUP, 'other-group');
      await nextTick();

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(1);
    });

    it('Should not show icon element when message has no modifier and no messageIcon slot.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: undefined });

      expect(document.body.querySelector(defaultMock.messageIconEl)).toBeFalsy();
    });

    it('Should not show progress bar when message has no ttl.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, hideProgressbar: false });
      await addMessage({ ttl: undefined });

      expect(document.body.querySelector(defaultMock.messageProgressEl)).toBeFalsy();
    });

    it('Should apply info modifier class to message element.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'info' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.messageInfoModifier),
      );
    });

    it('Should apply warning modifier class to message element.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'warning' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.messageWarningModifier),
      );
    });

    it('Should apply danger modifier class to message element.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'danger' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.messageDangerModifier),
      );
    });

    it('Should apply success modifier class to message element.', async () => {
      wrapper = mountToast();
      await addMessage({ modifier: 'success' });

      const messageEl = document.body.querySelector(defaultMock.messageEl);

      expect(messageEl!.className).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.messageSuccessModifier),
      );
    });

    it('Should render multiple messages simultaneously.', async () => {
      wrapper = mountToast();
      await addMessage({ summary: 'First' });
      await addMessage({ summary: 'Second' });
      await addMessage({ summary: 'Third' });

      expect(document.body.querySelectorAll(defaultMock.messageEl).length).toBe(3);
    });

    it('Should set animation duration on progress bar equal to message ttl.', async () => {
      wrapper = mountToast({ ...defaultMock.mockProps, hideProgressbar: false });
      await addMessage({ ttl: 3000 });

      const progressBar = document.body.querySelector(
        defaultMock.messageProgressBarEl,
      ) as HTMLElement;

      expect(progressBar).toBeTruthy();
      expect(progressBar.style.animationDuration).toBe('3000ms');
    });
  });
});
