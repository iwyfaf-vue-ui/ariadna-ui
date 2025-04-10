import fs from 'fs';

/**
 * @description A utility class for selecting and reading data from files.
 */
export class DataSelector {
  /**
   * Asynchronously reads the contents of a file.
   *
   * @description Reads a file from the specified path and returns its contents as a string.
   *
   * @param {string} filePath - The path to the file to be read.
   * @returns {Promise<string>} A promise that resolves with the file contents as a string, or rejects with an error.
   *
   * @example
   * // Basic usage
   * static async getSlotExampleDefault(): Promise<string> {
   *   return await this.readFile(path.resolve(__dirname, 'props.example.default.html'));
   * }
   */
  public static readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          reject(err);

          return;
        }

        resolve(data);
      });
    });
  }
}
