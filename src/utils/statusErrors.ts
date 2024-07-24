class HttpError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype); 
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error') {
      super(message, 500);
    }
  }
  
  export class AcceptedError extends HttpError {
    constructor(message: string) {
      super(message, 202);
    }
  }