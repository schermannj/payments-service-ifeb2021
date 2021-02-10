class PaymentServiceError extends Error {
  constructor(title, detail, statusCode) {
    super();
    this.title = title;
    this.detail = detail;
    this.statusCode = statusCode;
  }
}

class ClientError extends PaymentServiceError {
  constructor(detail) {
    super('Client Error', detail, 400);
  }
}

class ServerError extends PaymentServiceError {
  constructor(detail) {
    super('Server Error', detail, 500);
  }
}

module.exports = {
  PaymentServiceError,
  ClientError,
  ServerError,
};
