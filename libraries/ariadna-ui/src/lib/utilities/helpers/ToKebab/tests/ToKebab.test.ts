import { describe, expect, it } from 'vitest';
import toKebab from '../ToKebab';

describe('ToKebab.ts: Basic functionality.', () => {
  it('Should convert simple camelCase to kebab-case.', () => {
    expect(toKebab('camelCase')).toBe('camel-case');
  });

  it('Should convert PascalCase to kebab-case.', () => {
    expect(toKebab('PascalCase')).toBe('pascal-case');
  });

  it('Should handle single word (no conversion needed).', () => {
    expect(toKebab('word')).toBe('word');
  });

  it('Should handle all uppercase words.', () => {
    expect(toKebab('UPPERCASE')).toBe('uppercase');
  });

  it('Should handle mixed case with multiple words.', () => {
    expect(toKebab('mixedCaseWithMultipleWords')).toBe('mixed-case-with-multiple-words');
  });

  it('Should handle strings with numbers.', () => {
    expect(toKebab('camelCase123')).toBe('camel-case123');
    expect(toKebab('version2API')).toBe('version2-api');
  });

  it('Should preserve existing hyphens.', () => {
    expect(toKebab('already-hyphenated')).toBe('already-hyphenated');
    expect(toKebab('mixed-HyphenAndCamel')).toBe('mixed-hyphen-and-camel');
  });

  it('Should handle empty string.', () => {
    expect(toKebab('')).toBe('');
  });

  it('Should handle strings with consecutive capitals.', () => {
    expect(toKebab('XMLHttpRequest')).toBe('xml-http-request');
    expect(toKebab('HTMLElement')).toBe('html-element');
  });

  it('Should handle strings with acronyms.', () => {
    expect(toKebab('JSONData')).toBe('json-data');
    expect(toKebab('parseXMLFile')).toBe('parse-xml-file');
  });

  it('Should handle edge cases with special characters.', () => {
    expect(toKebab('$pecialCase')).toBe('$pecial-case');
    expect(toKebab('@testComponent')).toBe('@test-component');
  });
});
