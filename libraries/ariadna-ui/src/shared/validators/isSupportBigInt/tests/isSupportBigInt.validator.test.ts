import { afterEach, describe, expect, it } from 'vitest';
import isSupportBigIntValidator from '../isSupportBigInt.validator';

describe('isSupportBigIntValidator', () => {
  // Сохраняем оригинальное значение BigInt для восстановления после тестов
  const originalBigInt = globalThis.BigInt;

  afterEach(() => {
    // Восстанавливаем оригинальное значение BigInt после каждого теста
    globalThis.BigInt = originalBigInt;
  });

  describe('BigInt support detection', () => {
    it('Should return true when BigInt is supported.', () => {
      // Создаем мок, реализующий интерфейс BigIntConstructor
      globalThis.BigInt = Object.assign((value: any) => value, {
        asIntN: (_: number, int: bigint) => int,
        asUintN: (_: number, int: bigint) => int,
      });
      const result = isSupportBigIntValidator();

      expect(result).toEqual(true);
    });

    it('Should return false when BigInt is not defined.', () => {
      // Удаляем BigInt из глобального объекта
      // @ts-expect-error: testing absence of BigInt
      delete globalThis.BigInt;
      const result = isSupportBigIntValidator();

      expect(result).toEqual(false);
    });
  });
});
