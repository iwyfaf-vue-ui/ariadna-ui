/**
 * Notifications class.
 */
export default class Notifications {
  constructor(private readonly message: string) {
    this.message = message;
  }

  /**
   * Method for error notifications.
   */
  error() {
    console.log(`ERROR: ${this.message}`);
  }

  /**
   * Method for success notifications.
   */
  success() {
    console.log(`SUCCESS: ${this.message}`);
  }
}
