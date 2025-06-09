import { describe, it, expect, beforeAll } from 'vitest';
import { Transliterate } from '../transliterate.utils';

describe('Transliterate', () => {
  let transliterate: Transliterate;

  beforeAll(() => {
    transliterate = new Transliterate();
  });

  describe('toLatin', () => {
    it('Should transliterate simple lowercase Cyrillic word to Latin.', () => {
      const result = transliterate.toLatin('привет');
      expect(result).toEqual('privet');
    });

    it('Should remove soft and hard signs (ь, ъ) during transliteration.', () => {
      const result = transliterate.toLatin('объект');
      expect(result).toEqual('obekt');

      const result2 = transliterate.toLatin('моль');
      expect(result2).toEqual('mol');
    });

    it('Should transliterate uppercase Cyrillic letters to lowercase Latin.', () => {
      const result = transliterate.toLatin('ПрИвЕт');
      expect(result).toEqual('privet');
    });

    it('Should keep characters not in dictionary unchanged.', () => {
      const input = '123!@# абв';
      const expected = '123!@# abv';
      const result = transliterate.toLatin(input);

      expect(result).toEqual(expected);
    });

    it('Should transliterate letters with multiple Latin letters correctly.', () => {
      const result = transliterate.toLatin('щука');
      expect(result).toEqual('shchuka');

      const result2 = transliterate.toLatin('чашка');
      expect(result2).toEqual('chashka');
    });

    it('Should transliterate empty string to empty string.', () => {
      const result = transliterate.toLatin('');
      expect(result).toEqual('');
    });
  });

  describe('toCyrillic', () => {
    it('Should transliterate simple lowercase Latin word to Cyrillic.', () => {
      const result = transliterate.toCyrillic('privet');
      expect(result).toEqual('привет');
    });

    it('Should keep characters not in dictionary unchanged.', () => {
      const input = '123!@# abc';
      const expected = '123!@# абц';
      const result = transliterate.toCyrillic(input);

      expect(result).toEqual(expected);
    });

    it('Should transliterate letters with multiple Latin letters as separate letters (positional limitation).', () => {
      // Since toCyrillic processes letter-by-letter, "shch" will be transliterated as s-h-c-h separately
      const input = 'shch';
      const expected = 'схцх'; // s->с, h->х, c->с, h->х
      const result = transliterate.toCyrillic(input);

      expect(result).toEqual(expected);
    });

    it('Should transliterate mixed case with non-dictionary characters correctly.', () => {
      const input = 'ShCh123!';
      const expected = 'СхЦх123!';
      const result = transliterate.toCyrillic(input);

      expect(result).toEqual(expected);
    });
  });
});
