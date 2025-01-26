export class Message<T> {
  private _messages: Record<string, T>;
  constructor(initialMessages: Record<string, T>) {
    this._messages = initialMessages;
  }

  async listen() {}
}
