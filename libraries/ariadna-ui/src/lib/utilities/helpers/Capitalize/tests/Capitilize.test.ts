import { describe, expect, it } from 'vitest';
import capitalize from '../Capitalize';

describe('Capitalize.ts: Basic functionality', () => {
  it('Should capitalize the first letter of a string.', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('Should return the same string if the first letter is already capitalized.', () => {
    expect(capitalize('Hello')).toBe('Hello');
    expect(capitalize('World')).toBe('World');
  });

  it('Should handle empty string.', () => {
    expect(capitalize('')).toBe('');
  });

  it('Should handle single character strings.', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('z')).toBe('Z');
  });

  it('Should handle strings with leading whitespace.', () => {
    expect(capitalize(' hello')).toBe(' hello');
    expect(capitalize('  world')).toBe('  world');
  });

  it('Should handle strings with numbers and special characters.', () => {
    expect(capitalize('1hello')).toBe('1hello');
    expect(capitalize('@world')).toBe('@world');
    expect(capitalize('$test')).toBe('$test');
  });

  it('Should handle non-ASCII characters.', () => {
    expect(capitalize('éclair')).toBe('Éclair');
    expect(capitalize('über')).toBe('Über');
  });
});
