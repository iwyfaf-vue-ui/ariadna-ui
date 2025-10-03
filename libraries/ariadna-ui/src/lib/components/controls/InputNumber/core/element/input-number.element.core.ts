import type { VNode } from 'vue';
import type IInputNumberElementCore from './input-number.element.core.types';
import type { IInputNumberElement } from '../../types/InputNumber.types';
import { ELibraryConfig } from '@/types/internal';
import { EInputNumberConfig, EInputNumberErrors } from '../../types/InputNumber.enums';
import InputNumberFormatterCore from '../formatter/input-number.formatter.core';
import InputNumberEventsCore from '../events/input-number.events.core';

export default class InputNumberElementCore implements IInputNumberElementCore {
  private isNumeralChar(char: number | string) {
    return typeof char === 'string' && char.length === 1 && char >= '0' && char <= '9';
  }

  private initCaretPosition(input: IInputNumberElement): number {
    const prefix = input.options.prefix || '';
    const suffix = input.options.suffix || '';
    const prefixLength = prefix.length;
    const suffixLength = suffix.length;
    const value = input.value;
    const valueLength = value.length;

    // Текущая позиция курсора
    let pos = input.selectionStart ?? valueLength;

    // Границы допустимой позиции курсора (только основная часть числа)
    const minPos = prefixLength;
    const maxPos = valueLength - suffixLength;

    // Если курсор в prefix — ставим после prefix
    if (pos < minPos) {
      this.updateInputElementCaret(input, minPos);
      return minPos;
    }

    // Если курсор в suffix — ставим перед suffix
    if (pos > maxPos) {
      this.updateInputElementCaret(input, maxPos);
      return maxPos;
    }

    // Если курсор в основной части числа — ищем ближайшую цифру слева или справа
    // Если текущий символ — цифра, оставляем как есть
    if (pos >= minPos && pos < maxPos && this.isNumeralChar(value[pos])) {
      this.updateInputElementCaret(input, pos);
      return pos;
    }

    // Ищем ближайшую цифру слева в основной части числа
    let left = pos - 1;
    while (left >= minPos && !this.isNumeralChar(value[left])) {
      left--;
    }

    if (left >= minPos && this.isNumeralChar(value[left])) {
      this.updateInputElementCaret(input, left + 1);
      return left + 1;
    }

    // Ищем ближайшую цифру справа в основной части числа
    let right = pos + 1;
    while (right < maxPos && !this.isNumeralChar(value[right])) {
      right++;
    }

    if (right < maxPos && this.isNumeralChar(value[right])) {
      this.updateInputElementCaret(input, right);
      return right;
    }

    // Если не нашли цифру — ставим после prefix
    this.updateInputElementCaret(input, minPos);
    return minPos;
  }

  private restoreCaretPosition(
    input: IInputNumberElement,
    prevValue: string,
    nextValue: string,
    prevPos: number,
  ) {
    const prefixLength = input.options.prefix ? input.options.prefix.length : 0;
    const suffixLength = input.options.suffix ? input.options.suffix.length : 0;
    const mainStart = prefixLength;
    const mainEnd = nextValue.length - suffixLength;

    // Получаем часть строки до курсора до форматирования
    const prevLeft = prevValue.slice(0, prevPos);

    // Считаем, сколько цифр было слева от курсора до форматирования
    const digitsLeft = (prevLeft.match(/\d/g) || []).length;

    // Теперь ищем позицию в новом значении, где встречается столько же цифр
    let count = 0;
    let newPos = mainStart;
    for (; newPos < mainEnd; newPos++) {
      if (/\d/.test(nextValue[newPos])) {
        count++;
      }

      if (count >= digitsLeft) {
        newPos++;
        break;
      }
    }
    // Если не нашли, ставим перед суффиксом
    if (count < digitsLeft) newPos = mainEnd;

    // Устанавливаем позицию курсора
    this.updateInputElementCaret(input, newPos);
  }

  public getInputElement(el: HTMLElement | HTMLInputElement): IInputNumberElement {
    const inputElement =
      el instanceof HTMLInputElement ? el : el.querySelector<HTMLInputElement>('input');

    if (!inputElement) {
      throw new Error(
        `${ELibraryConfig.NAME}(${EInputNumberConfig.NAME}): ${EInputNumberErrors.V_INPUT_NUMBER_DIRECTIVE_REQUIRES_INPUT_ELEMENT}`,
      );
    }

    return inputElement as IInputNumberElement;
  }

  public updateInputElementCaret(el: HTMLInputElement, position: number) {
    const setSelectionRange = (): any => {
      el.setSelectionRange(position, position);
    };

    setSelectionRange();
    // Android Fix
    setTimeout(setSelectionRange, 1);
  }

  public updateValue(
    el: IInputNumberElement,
    vNode: VNode | null,
    { emit = true, force = false, validate = false } = {},
  ) {
    const { options, masked } = el;
    const { max, min } = options;
    const currentValue = vNode?.props?.value || el.value;

    if (force || masked !== currentValue) {
      const inputNumberFormat = new InputNumberFormatterCore(options).clean(validate);
      let masked = inputNumberFormat.format(currentValue);
      let unmasked = inputNumberFormat.unFormat(currentValue);

      if (validate) {
        if (Number(max) === max && Number(unmasked) > max) {
          masked = inputNumberFormat.format(max);
          unmasked = Number(max);
        } else if (Number(min) === min && Number(unmasked) < min) {
          masked = inputNumberFormat.format(min);
          unmasked = Number(min);
        }
      }

      el.masked = masked;
      el.unmasked = unmasked;

      if (el.value !== masked) {
        el.value = masked;
        emit = true;
      }

      return emit && el.dispatchEvent(InputNumberEventsCore.createBase('input'));
    }
  }

  public clickHandler(event: InputNumberEventsCore) {
    const { target } = event;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    const hasSelection = selectionStart !== selectionEnd;

    if (!hasSelection) {
      setTimeout(() => {
        const newCaretPos = this.initCaretPosition(target);
        this.updateInputElementCaret(target, newCaretPos);

        this.updateValue(target, null, { emit: false, force: true, validate: false });
      }, 1);
    }
  }

  public inputHandler(event: InputNumberEventsCore) {
    const { target, detail } = event;

    // Нам не нужно запускать этот метод для события, которое мы генерируем (prevent event loop).
    if (detail?.facade) {
      return;
    }

    // Поскольку мы будем генерировать наше собственное пользовательское событие ввода, мы можем остановить распространение этого события.
    event.stopPropagation();

    const { selectionStart, selectionEnd } = target;

    if (selectionStart === null || selectionEnd === null) {
      return;
    }

    const prevValue = target.value;
    const prevPos = target.selectionStart ?? prevValue.length;

    this.updateValue(target, null, { emit: false, force: false, validate: false });

    setTimeout(() => {
      const nextValue = target.value;
      this.restoreCaretPosition(target, prevValue, nextValue, prevPos);
    });

    target.dispatchEvent(InputNumberEventsCore.createBase('input'));
  }

  public blurHandler(event: InputNumberEventsCore) {
    const { target } = event;

    this.updateValue(target, null, { emit: false, force: true, validate: true });
  }
}
