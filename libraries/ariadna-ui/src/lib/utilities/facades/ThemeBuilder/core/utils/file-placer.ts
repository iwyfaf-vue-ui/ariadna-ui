import * as fs from 'fs';
import Notifications from '../notifications';
import { ErrorMessages } from '../notifications/locales/errors.notifications.locales';

/**
 * Represents a class responsible for placing files (e.g., SCSS themes or Markdown documentation) in a specified
 * destination.
 */
export default class FilePlacer {
  /**
   * Creates an instance of the `Placement` class.
   *
   * @param projectName - The name of the project.
   * @param destination - The destination directory where the file will be placed.
   * @param fileName - The name of the file (without extension).
   */
  constructor(
    private readonly projectName: string,
    private readonly destination: string,
    private readonly fileName: string,
  ) {
    this.projectName = projectName;
    this.destination = destination;
    this.fileName = fileName;
  }

  /**
   * Places an SCSS theme file in the specified destination.
   * @param themeData - The content of the SCSS theme file.
   * @throws {Notifications} - Throws an error notification if `projectName`, `destination`, or `fileName` is not specified.
   * @returns {void}
   */
  theme(themeData: string): void {
    if (!this.projectName) {
      return new Notifications(ErrorMessages.NAME_IS_NOT_SPECIFIED).error();
    }

    if (!this.destination) {
      return new Notifications(ErrorMessages.DESTINATION_IS_NOT_SPECIFIED).error();
    }

    if (!this.fileName) {
      return new Notifications(ErrorMessages.THEME_NAME_IS_NOT_SPECIFIED).error();
    }

    const themeFile = `${this.destination}${this.fileName}.scss`;
    fs.writeFileSync(themeFile, themeData);
  }

  /**
   * Places a Markdown documentation file in the specified destination.
   *
   * @param documentation - The content of the Markdown documentation file.
   * @throws {Notifications} - Throws an error notification if `projectName`, `destination`, or `fileName` is not specified.
   * @returns {void}
   */
  documentation(documentation: string): void {
    if (!this.projectName) {
      return new Notifications(ErrorMessages.NAME_IS_NOT_SPECIFIED).error();
    }

    if (!this.destination) {
      return new Notifications(ErrorMessages.DESTINATION_IS_NOT_SPECIFIED).error();
    }

    if (!this.fileName) {
      return new Notifications(ErrorMessages.THEME_NAME_IS_NOT_SPECIFIED).error();
    }

    const themeFile = `${this.destination}${this.fileName}.md`;
    fs.writeFileSync(themeFile, documentation);
  }
}
