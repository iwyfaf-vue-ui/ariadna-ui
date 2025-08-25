import { describe, it, expect, beforeEach } from 'vitest';
import { ViewerPositionCore } from '../../core/position/viewer.position.core';
import type { TViewerPositionCoreElementSize } from '../../core/position/viewer.position.core.types';

describe('ViewerPositionCore', () => {
  let initialItems: TViewerPositionCoreElementSize[];
  let initialContainer: TViewerPositionCoreElementSize;
  let instance: ViewerPositionCore;

  beforeEach(() => {
    initialItems = [
      { width: 10, height: 20 },
      { width: 30, height: 40 },
    ];
    initialContainer = { width: 100, height: 200 };
    instance = new ViewerPositionCore({
      items: initialItems,
      container: initialContainer,
    });
  });

  describe('constructor', () => {
    it('Should initialize coords as empty array when no options provided.', () => {
      const emptyInstance = new ViewerPositionCore();

      expect(emptyInstance.coords).toEqual([]);
    });

    it('Should calculate initial coords based on provided items and container.', () => {
      // расчёт для первого элемента: x=(100−10)/2=45, y=(200−20)/2=90
      // расчёт для второго: x=(100−30)/2=35, y=(200−40)/2=80
      expect(instance.coords).toEqual([
        { x: 45, y: 90 },
        { x: 35, y: 80 },
      ]);
    });
  });

  describe('updateContainerSize', () => {
    it('Should update coords when container size is changed.', () => {
      instance.updateContainerSize({ width: 200, height: 100 });
      // новый расчёт для первого: x=(200−10)/2=95, y=(100−20)/2=40
      // второй: x=(200−30)/2=85, y=(100−40)/2=30
      expect(instance.coords).toEqual([
        { x: 95, y: 40 },
        { x: 85, y: 30 },
      ]);
    });
  });

  describe('updateMoveItemSize', () => {
    it('Should update coords for specified item when updateMoveItemSize is called.', () => {
      // изменяем размер второго элемента
      instance.updateMoveItemSize({ width: 50, height: 50 }, 1);

      // первый остаётся прежним
      expect(instance.coords[0]).toEqual({ x: 45, y: 90 });
      // проверяем второй: x=(100−50)/2=25, y=(200−50)/2=75
      expect(instance.coords[1]).toEqual({ x: 25, y: 75 });
    });

    it('Should not update coords for item with zero dimension.', () => {
      const before = [...instance.coords];
      instance.updateMoveItemSize({ width: 0, height: 50 }, 0);

      // высота ≠ 0, но ширина = 0 → пропускаем обновление
      expect(instance.coords).toEqual(before);
    });
  });

  describe('updateMoveItemsSize', () => {
    it('Should update coords for all items when updateMoveItemsSize is called.', () => {
      const newItems: TViewerPositionCoreElementSize[] = [
        { width: 20, height: 20 },
        { width: 40, height: 40 },
      ];
      instance.updateMoveItemsSize(newItems);

      // расчёты: первый x=(100−20)/2=40,y=(200−20)/2=90; второй x=(100−40)/2=30,y=(200−40)/2=80
      expect(instance.coords).toEqual([
        { x: 40, y: 90 },
        { x: 30, y: 80 },
      ]);
    });
  });
});
