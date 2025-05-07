import { DataSelector } from '@/shared/tests/DataSelector';

export class RenderAttributeOnceSelectorTestData extends DataSelector {
  constructor() {
    super();
  }

  static attrs = { 'data-test': 'value', id: 'test-id' };

  static renderExample = '<div data-test="value" id="test-id"></div>';

  public dummyComponent() {
    return {
      template: `<div v-render-attribute-once="attrs"></div>`,
      props: ['attrs'],
    };
  }
}
