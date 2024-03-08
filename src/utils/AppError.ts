export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperation: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 500 ? "error" : "fail";
    this.isOperation = true;
    //!! this is neccessary to maintain right stack trace if class is not extended to Error class
    // Error.captureStackTrace(this, this.constructor);
  }
}
