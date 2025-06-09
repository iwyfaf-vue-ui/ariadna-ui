import { describe, it, expect, beforeEach } from 'vitest';
import SlideCore from '../../core/slide/slide.core';

const createContainerSizeMock = (width: number, scrollWidth: number) => ({
  width,
  scrollWidth,
});

describe('SlideCore: Базовое тестирование.', () => {
  let slideCore: SlideCore;
  const containerSizeMock = createContainerSizeMock(100, 200);
  const paddingsMock: [number, number] = [10, 20];

  beforeEach(() => {
    slideCore = new SlideCore({ containerSize: containerSizeMock, paddings: paddingsMock });
  });

  it('Should initialize correctly.', () => {
    expect(slideCore.offset).toBe(0);
    expect(slideCore.isSliding).toBe(false);
  });

  it('Should start the slide at slideStart.', () => {
    slideCore.slideStart(50);
    expect(slideCore.isSliding).toBe(true);
  });

  it('Should not start the slide if the contents fit into the container.', () => {
    const smallContainer = createContainerSizeMock(200, 200);
    slideCore.updateContainerSize(smallContainer);
    slideCore.slideStart(50);

    expect(slideCore.isSliding).toBe(false);
  });

  it('Should correctly change the offset during a slideMove.', () => {
    slideCore.slideStart(50);
    slideCore.slideMove(40);

    expect(slideCore.offset).toBeGreaterThan(0);
  });

  it('Should not change the offset if the slide is not started.', () => {
    slideCore.slideMove(40);
    expect(slideCore.offset).toBe(0);
  });

  it('Should end the slide at slideEnd.', () => {
    slideCore.slideStart(50);
    slideCore.slideEnd();

    expect(slideCore.isSliding).toBe(false);
  });

  it('Should update the size of the container.', () => {
    const newContainerSize = createContainerSizeMock(150, 300);
    slideCore.updateContainerSize(newContainerSize);

    expect(slideCore['containerSize']).toEqual(newContainerSize);
  });

  it('Should update the paddings.', () => {
    const newPaddings: [number, number] = [15, 25];
    slideCore.updatePaddings(newPaddings);

    expect(slideCore['paddings']).toEqual(newPaddings);
  });

  it('Must not exceed the allowed offset.', () => {
    const maxOffset = containerSizeMock.scrollWidth + paddingsMock[1] - containerSizeMock.width;

    slideCore.slideStart(50);
    slideCore.slideMove(-500);

    // Т.к. внутри метода slideMove значение move инвертируется (умножается на -1).
    expect(slideCore.offset).toBe(maxOffset);

    slideCore.slideMove(500);
    // Т.к. внутри метода slideMove значение move инвертируется (умножается на -1).
    expect(slideCore.offset).toBe(0);
  });
});
