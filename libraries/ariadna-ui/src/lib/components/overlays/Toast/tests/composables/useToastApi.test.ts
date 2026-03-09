import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { defineComponent, h, nextTick, ref } from 'vue';
import type { Ref } from 'vue';
import { mount } from '@vue/test-utils';
import useToastApi from '../../composables/useToastApi/useToastApi';
import type { TToastProps, TToastEmits } from '../../Toast';
import type { TToastMessage, TToastMessageInternal } from '../../types/Toast.types';
import { EToastPropsDefault } from '../../types/Toast.enums';
import { ToastSelectorTestData } from '../test-data/Toast.selector.test-data';

const defaultMock = new ToastSelectorTestData();

function createMessage(override: Partial<TToastMessage> = {}): TToastMessageInternal {
  return {
    _id: 0,
    summary: 'Test summary',
    detail: 'Test detail',
    ...override,
  };
}

function mountWithComposable(
  props: TToastProps = defaultMock.mockProps,
  hovered: Ref<boolean> = ref(false),
) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useToastApi(props, emits as unknown as TToastEmits, hovered);
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useToastApi', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('messages');
      expect(vm).toHaveProperty('messageClasses');
      expect(vm).toHaveProperty('add');
      expect(vm).toHaveProperty('remove');
      expect(vm).toHaveProperty('removeAll');
      expect(vm).toHaveProperty('filterMessagesByGroup');
    });

    it('Should initialize with an empty messages array.', () => {
      const wrapper = mountWithComposable();
      expect(wrapper.vm.messages).toEqual([]);
    });

    it('Should expose add, remove, removeAll, filterMessagesByGroup as functions.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      expect(vm.add).toBeInstanceOf(Function);
      expect(vm.remove).toBeInstanceOf(Function);
      expect(vm.removeAll).toBeInstanceOf(Function);
      expect(vm.filterMessagesByGroup).toBeInstanceOf(Function);
    });
  });

  describe('messageClasses ComputedRef', () => {
    it('Should return base message class without modifier.', () => {
      const wrapper = mountWithComposable();
      const classes = wrapper.vm.messageClasses(createMessage());

      expect(classes).toContain(defaultMock.getSelectorWithoutDot(defaultMock.messageEl));
      expect(classes).not.toContain('--');
    });

    it('Should include modifier class when message has modifier.', () => {
      const wrapper = mountWithComposable();
      const classes = wrapper.vm.messageClasses(createMessage({ modifier: 'info' }));

      expect(classes).toContain(defaultMock.getSelectorWithoutDot(defaultMock.messageEl));
      expect(classes).toContain(defaultMock.getSelectorWithoutDot(defaultMock.messageInfoModifier));
    });

    it('Should generate correct classes for all modifiers.', () => {
      const wrapper = mountWithComposable();

      const cases: Array<[string, string]> = [
        ['info', defaultMock.messageInfoModifier],
        ['warning', defaultMock.messageWarningModifier],
        ['danger', defaultMock.messageDangerModifier],
        ['success', defaultMock.messageSuccessModifier],
      ];

      cases.forEach(([modifier, expectedClass]) => {
        const classes = wrapper.vm.messageClasses(createMessage({ modifier }));
        expect(classes).toContain(defaultMock.getSelectorWithoutDot(expectedClass));
      });
    });

    it('Should use custom cssClass from props.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        cssClass: defaultMock.cssClassProp,
      });
      const classes = wrapper.vm.messageClasses(createMessage({ modifier: 'info' }));

      expect(classes).toContain(`${defaultMock.cssClassProp}__message`);
      expect(classes).toContain(`${defaultMock.cssClassProp}__message--info`);
    });
  });

  describe('add', () => {
    it('Should add a message to messages.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage());

      expect(vm.messages.length).toBe(1);
    });

    it('Should assign sequential _id to each added message.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage());
      vm.add(createMessage());

      expect(vm.messages[0]._id).toBe(1);
      expect(vm.messages[1]._id).toBe(2);
    });

    it('Should emit "add" with the correct payload.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'Hello' }));

      expect(vm.emits).toHaveBeenCalledWith(
        'add',
        expect.objectContaining({
          message: expect.objectContaining({ summary: 'Hello', _id: 1 }),
        }),
      );
    });

    it('Should set closable to true by default when undefined.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ closable: undefined }));

      expect(vm.messages[0].closable).toBe(true);
    });

    it('Should preserve explicit closable: false.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ closable: false }));

      expect(vm.messages[0].closable).toBe(false);
    });

    it('Should add multiple messages.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'First' }));
      vm.add(createMessage({ summary: 'Second' }));
      vm.add(createMessage({ summary: 'Third' }));

      expect(vm.messages.length).toBe(3);
    });

    it('Should remove the oldest message when max is reached.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, max: 2 });
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'First' }));
      vm.add(createMessage({ summary: 'Second' }));
      vm.add(createMessage({ summary: 'Third' }));

      expect(vm.messages.length).toBe(2);
      expect(vm.messages[0].summary).toBe('Second');
      expect(vm.messages[1].summary).toBe('Third');
    });

    it('Should not enforce limit when max is 0 (unlimited).', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, max: 0 });
      const vm = wrapper.vm;

      for (let i = 0; i < 5; i++) {
        vm.add(createMessage({ summary: `Message ${i}` }));
      }

      expect(vm.messages.length).toBe(5);
    });
  });

  describe('remove', () => {
    it('Should remove a message by id.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage());
      const id = vm.messages[0]._id;
      vm.remove(id);

      expect(vm.messages.length).toBe(0);
    });

    it('Should emit "close" with the correct payload.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'Close me' }));
      const id = vm.messages[0]._id;
      vm.remove(id);

      expect(vm.emits).toHaveBeenCalledWith(
        'close',
        expect.objectContaining({
          message: expect.objectContaining({ summary: 'Close me' }),
        }),
      );
    });

    it('Should not include _id in the close event payload.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage());
      const id = vm.messages[0]._id;
      vm.remove(id);

      const closeCall = vm.emits.mock.calls.find((call) => call[0] === 'close');
      expect(closeCall).toBeDefined();
      expect(closeCall![1].message).not.toHaveProperty('_id');
    });

    it('Should only remove the message with the matching id.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'First' }));
      vm.add(createMessage({ summary: 'Second' }));
      const firstId = vm.messages[0]._id;
      vm.remove(firstId);

      expect(vm.messages.length).toBe(1);
      expect(vm.messages[0].summary).toBe('Second');
    });

    it('Should do nothing when id does not exist.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage());
      vm.remove(9999);

      expect(vm.messages.length).toBe(1);
      expect(vm.emits).not.toHaveBeenCalledWith('close', expect.anything());
    });
  });

  describe('removeAll', () => {
    it('Should remove all messages.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'First' }));
      vm.add(createMessage({ summary: 'Second' }));
      vm.removeAll();

      expect(vm.messages.length).toBe(0);
    });

    it('Should not throw when messages array is already empty.', () => {
      const wrapper = mountWithComposable();

      expect(() => wrapper.vm.removeAll()).not.toThrow();
      expect(wrapper.vm.messages.length).toBe(0);
    });
  });

  describe('filterMessagesByGroup', () => {
    it('Should add a message when group matches props.group.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, group: 'my-group' });
      const vm = wrapper.vm;

      vm.filterMessagesByGroup(createMessage({ group: 'my-group' }));

      expect(vm.messages.length).toBe(1);
    });

    it('Should not add a message when group does not match.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, group: 'my-group' });
      const vm = wrapper.vm;

      vm.filterMessagesByGroup(createMessage({ group: 'other-group' }));

      expect(vm.messages.length).toBe(0);
    });

    it('Should add message with undefined group when props.group is the default group.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        group: EToastPropsDefault.GROUP,
      });
      const vm = wrapper.vm;

      vm.filterMessagesByGroup(createMessage({ group: undefined }));

      expect(vm.messages.length).toBe(1);
    });

    it('Should not add message with undefined group when props.group is not the default.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, group: 'custom' });
      const vm = wrapper.vm;

      vm.filterMessagesByGroup(createMessage({ group: undefined }));

      expect(vm.messages.length).toBe(0);
    });
  });

  describe('Timer behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('Should automatically remove a message after its ttl expires.', async () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      expect(vm.messages.length).toBe(1);

      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(vm.messages.length).toBe(0);
    });

    it('Should emit "ttl-end" when a message timer expires.', async () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ summary: 'Timed', ttl: 500 }));

      vi.advanceTimersByTime(500);
      await nextTick();

      expect(vm.emits).toHaveBeenCalledWith(
        'ttl-end',
        expect.objectContaining({
          message: expect.objectContaining({ summary: 'Timed' }),
        }),
      );
    });

    it('Should not remove a message when ttl is not set.', async () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: undefined }));
      vi.advanceTimersByTime(10000);
      await nextTick();

      expect(vm.messages.length).toBe(1);
    });

    it('Should not start a timer when hovered at the time of add.', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      vi.advanceTimersByTime(2000);
      await nextTick();

      expect(vm.messages.length).toBe(1);
    });

    it('Should start the timer and remove the message when hover ends.', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      vi.advanceTimersByTime(500);
      expect(vm.messages.length).toBe(1);

      hovered.value = false;
      await nextTick();

      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(vm.messages.length).toBe(0);
    });

    it('Should remove message correctly when removeAll is called with active timers.', async () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      vm.add(createMessage({ ttl: 2000 }));
      vm.removeAll();

      vi.advanceTimersByTime(2000);
      await nextTick();

      expect(vm.messages.length).toBe(0);
      expect(vm.emits).not.toHaveBeenCalledWith('ttl-end', expect.anything());
    });

    it('Should reset hovered to false after last message is removed via remove().', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      const id = vm.messages[0]._id;

      vm.remove(id);
      await nextTick();

      expect(hovered.value).toBe(false);
    });

    it('Should start timer for new message added after hovered toast was closed via remove().', async () => {
      // Scenario: user taps toast (hovered=true, timer paused), closes it via close button,
      // then a new toast is added — the new toast timer must start automatically.
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      // Step 1: add first toast while hovered (timer should be paused)
      vm.add(createMessage({ ttl: 1000 }));
      const firstId = vm.messages[0]._id;

      vi.advanceTimersByTime(1000);
      await nextTick();

      // Timer is paused — message still present
      expect(vm.messages.length).toBe(1);

      // Step 2: user closes the toast via close button
      vm.remove(firstId);
      await nextTick();

      // hovered must be reset
      expect(hovered.value).toBe(false);
      expect(vm.messages.length).toBe(0);

      // Step 3: new toast is added for the same group
      vm.add(createMessage({ ttl: 1000 }));
      expect(vm.messages.length).toBe(1);

      // Step 4: timer must run and remove the new toast after its ttl
      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(vm.messages.length).toBe(0);
    });

    it('Should reset hovered to false after removeAll() is called.', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      vm.add(createMessage({ ttl: 2000 }));

      vm.removeAll();
      await nextTick();

      expect(hovered.value).toBe(false);
    });

    it('Should start timer for new message added after removeAll() while hovered.', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 1000 }));
      vm.add(createMessage({ ttl: 2000 }));
      vm.removeAll();
      await nextTick();

      expect(hovered.value).toBe(false);

      vm.add(createMessage({ ttl: 1000 }));
      expect(vm.messages.length).toBe(1);

      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(vm.messages.length).toBe(0);
    });

    it('Should reset hovered to false after remove() even when other messages still exist.', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 5000 }));
      vm.add(createMessage({ ttl: 5000 }));
      const firstId = vm.messages[0]._id;

      vm.remove(firstId);
      await nextTick();

      // После явного закрытия через кнопку — hovered должен сброситься, даже если другие сообщения ещё есть
      expect(hovered.value).toBe(false);
      expect(vm.messages.length).toBe(1);
    });

    it('Should start timer for new message added after one of multiple hovered toasts is closed via remove().', async () => {
      const hovered = ref(true);
      const wrapper = mountWithComposable(defaultMock.mockProps, hovered);
      const vm = wrapper.vm;

      vm.add(createMessage({ ttl: 5000 }));
      vm.add(createMessage({ ttl: 5000 }));
      const firstId = vm.messages[0]._id;

      // Закрываем один из toast'ов
      vm.remove(firstId);
      await nextTick();

      expect(vm.messages.length).toBe(1);

      // Добавляем новый toast
      vm.add(createMessage({ ttl: 1000 }));
      expect(vm.messages.length).toBe(2);

      // Таймер нового toast'а должен стартовать автоматически
      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(vm.messages.length).toBe(1);
    });
  });
});
