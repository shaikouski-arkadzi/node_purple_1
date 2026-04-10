export class HTTPError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (context !== undefined) {
      this.context = context;
    }
  }
}
