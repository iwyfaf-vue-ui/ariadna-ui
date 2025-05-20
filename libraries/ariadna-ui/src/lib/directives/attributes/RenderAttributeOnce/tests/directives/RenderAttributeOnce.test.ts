import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { RenderAttributeOnceSelectorTestData } from '../test-data/RenderAttributeOnce.selector.test-data';
import vRenderAttributeOnce from '../../RenderAttributeOnce';
import { createSSRApp } from 'vue';

const defaultMock = new RenderAttributeOnceSelectorTestData();

describe('RenderAttributeOnce.', () => {
  describe('CSR', () => {
    it('Should add attributes if they do not exist.', () => {
      const wrapper = mount(defaultMock.dummyComponent(), {
        global: {
          directives: { renderAttributeOnce: vRenderAttributeOnce },
        },
        props: {
          attrs: RenderAttributeOnceSelectorTestData.attrs,
        },
      });

      const el = wrapper.element as HTMLElement;

      expect(el.getAttribute('data-test')).toBe(
        RenderAttributeOnceSelectorTestData.attrs['data-test'],
      );
      expect(el.getAttribute('id')).toBe(RenderAttributeOnceSelectorTestData.attrs['id']);
    });

    it('Should not overwrite existing attributes.', () => {
      const wrapper = mount(defaultMock.dummyComponent(), {
        global: {
          directives: { renderAttributeOnce: vRenderAttributeOnce },
        },
        props: {
          attrs: { 'data-test': 'new-value' },
        },
        attrs: { 'data-test': RenderAttributeOnceSelectorTestData.attrs['data-test'] },
      });

      const el = wrapper.element as HTMLElement;

      expect(el.getAttribute('data-test')).toBe(
        RenderAttributeOnceSelectorTestData.attrs['data-test'],
      );
    });

    it('Should not throw if no attributes provided.', () => {
      const wrapper = mount(defaultMock.dummyComponent(), {
        global: {
          directives: { renderAttributeOnce: vRenderAttributeOnce },
        },
        props: { attrs: {} },
      });

      const el = wrapper.element as HTMLElement;

      expect(el.attributes.length).toBe(0);
    });
  });

  describe('SSR', () => {
    it('Should not mutate SSR-generated DOM during hydration with v-render-attribute-once directive.', async () => {
      const body = `<body id="app">${RenderAttributeOnceSelectorTestData.renderExample}</body>`;
      document.body.id = 'app';
      document.body.innerHTML = RenderAttributeOnceSelectorTestData.renderExample;

      const app = createSSRApp({
        template: `<div v-render-attribute-once="bindingData"></div>`,
        directives: { RenderAttributeOnce: vRenderAttributeOnce },
        data: () => ({
          bindingData: Object.fromEntries(
            Object.keys(RenderAttributeOnceSelectorTestData.attrs).map((k) => [k, Math.random()]),
          ),
        }),
      });

      app.mount('#app');

      expect(document.body.outerHTML).toBe(body);
    });

    it('Should not mutate SSR-generated DOM if no attributes are provided.', async () => {
      const body = `<body id="app"><div></div></body>`;
      document.body.id = 'app';
      document.body.innerHTML = `<div></div>`;

      const app = createSSRApp({
        template: `<div v-render-attribute-once="bindingData"></div>`,
        directives: { RenderAttributeOnce: vRenderAttributeOnce },
        data: () => ({
          bindingData: {},
        }),
      });

      app.mount('#app');

      expect(document.body.outerHTML).toBe(body);
    });

    it('Should not overwrite existing attributes in SSR-generated DOM during hydration.', async () => {
      const attrs = RenderAttributeOnceSelectorTestData.attrs;
      const attrString = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      const body = `<body id="app"><div ${attrString}></div></body>`;
      document.body.id = 'app';
      document.body.innerHTML = `<div ${attrString}></div>`;

      const app = createSSRApp({
        template: `<div v-render-attribute-once="bindingData"></div>`,
        directives: { RenderAttributeOnce: vRenderAttributeOnce },
        data: () => ({
          bindingData: Object.fromEntries(Object.keys(attrs).map((k) => [k, 'DIFFERENT_VALUE'])),
        }),
      });

      app.mount('#app');

      expect(document.body.outerHTML).toBe(body);
    });
  });
});
