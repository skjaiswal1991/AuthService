class ErrorHandler extends Error {
  public statusCode;
  public actualError;
  public isOperational;
  constructor(statusCode, message, actualError) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.actualError = actualError;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
