class APiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    statck=""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default APiError