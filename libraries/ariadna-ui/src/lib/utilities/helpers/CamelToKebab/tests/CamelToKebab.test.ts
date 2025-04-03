import { describe, expect, it } from 'vitest';
import camelToKebab from '../CamelToKebab';

describe('CamelToKebab.ts: Basic functionality.', () => {
  it('Should convert simple camelCase to kebab-case.', () => {
    expect(camelToKebab('camelCase')).toBe('camel-case');
  });

  it('Should convert PascalCase to kebab-case.', () => {
    expect(camelToKebab('PascalCase')).toBe('pascal-case');
  });

  it('Should handle single word (no conversion needed).', () => {
    expect(camelToKebab('word')).toBe('word');
  });

  it('Should handle all uppercase words.', () => {
    expect(camelToKebab('UPPERCASE')).toBe('uppercase');
  });

  it('Should handle mixed case with multiple words.', () => {
    expect(camelToKebab('mixedCaseWithMultipleWords')).toBe('mixed-case-with-multiple-words');
  });

  it('Should handle strings with numbers.', () => {
    expect(camelToKebab('camelCase123')).toBe('camel-case123');
    expect(camelToKebab('version2API')).toBe('version2-api');
  });

  it('Should preserve existing hyphens.', () => {
    expect(camelToKebab('already-hyphenated')).toBe('already-hyphenated');
    expect(camelToKebab('mixed-HyphenAndCamel')).toBe('mixed-hyphen-and-camel');
  });

  it('Should handle empty string.', () => {
    expect(camelToKebab('')).toBe('');
  });

  it('Should handle strings with consecutive capitals.', () => {
    expect(camelToKebab('XMLHttpRequest')).toBe('xml-http-request');
    expect(camelToKebab('HTMLElement')).toBe('html-element');
  });

  it('Should handle strings with acronyms.', () => {
    expect(camelToKebab('JSONData')).toBe('json-data');
    expect(camelToKebab('parseXMLFile')).toBe('parse-xml-file');
  });

  it('Should handle edge cases with special characters.', () => {
    expect(camelToKebab('$pecialCase')).toBe('$pecial-case');
    expect(camelToKebab('@testComponent')).toBe('@test-component');
  });
});
