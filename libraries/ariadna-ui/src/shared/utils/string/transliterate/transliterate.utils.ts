/**
 * Provides methods to transliterate text between Cyrillic (Russian) and Latin alphabets.
 */
export class Transliterate {
  private static ruToEn = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'j',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'je',
    ю: 'u',
    я: 'ya',
    ь: '',
    ъ: '',
  };

  private static enToRu = Object.fromEntries(
    Object.entries(Transliterate.ruToEn).map(([ru, en]) => [en, ru]),
  );

  /**
   * Transliterates a given Cyrillic (Russian) word into Latin characters.
   *
   * @param {string} word - The Cyrillic word to be transliterated.
   * @returns {string}
   * @example
   * const latin = new Transliterate().toLatin('привет');
   * console.log(latin); // Output: privet
   */
  public toLatin(word: string): string {
    return word
      .replace(/[ъь]+/g, '')
      .split('')
      .map((letter) => {
        const lowLetter = letter.toLowerCase();
        const en = Transliterate.ruToEn[lowLetter as keyof typeof Transliterate.ruToEn] ?? letter;
        return lowLetter === letter ? en : en.toLowerCase();
      })
      .join('');
  }

  /**
   * Transliterates a given Latin word into Cyrillic (Russian) characters.
   *
   * @param {string} word - The Latin word to be transliterated.
   * @returns {string}
   * @example
   * const cyrillic = new Transliterate().toCyrillic('privet');
   * console.log(cyrillic); // Output: привет
   */
  public toCyrillic(word: string): string {
    return word
      .split('')
      .map((letter) => {
        const lowLetter = letter.toLowerCase();
        const ru = Transliterate.enToRu[lowLetter as keyof typeof Transliterate.enToRu] ?? letter;
        return lowLetter === letter ? ru : ru.toUpperCase();
      })
      .join('');
  }
}
