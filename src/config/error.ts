export class Unauthorized extends Error {
  message: string;

  constructor(message: string = "Unauthorized") {
    super();
    this.message = message;
  }
}

export class BadRequest extends Error {
  message: string;

  constructor(message: string = "Bad Request") {
    super();
    this.message = message;
  }
}

export class InternalFailure extends Error {
  message: string;

  constructor(message: string = "Internal Failure") {
    super();
    this.message = message;
  }
}
