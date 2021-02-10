const moment = require('moment');
const { ClientError } = require('../errors');

class PaymentsService {
  constructor(db) {
    /**
     * The db object have to support mongo-like interface
     */
    this.db = db;
  }

  get(id) {
    const response = this.db.payments.find({ id, isDeleted: false });

    if (!response.length) {
      throw new ClientError(`No payments found with id = ${id}`);
    }

    return response[0];
  }

  list(contractId, startDate, endDate) {
    if (!contractId) {
      throw new ClientError('contractId is a required query parameter');
    }

    // this does not look like a great solution, but with this
    // stupid in-memory database it's kinda complex
    // and I don't want to spend a ton of time on a thing like this.
    return this.db.payments.where((it) => (
      it.contractId === contractId
        && !it.isDeleted
        && (startDate ? moment(it.time) >= startDate : true)
        && (endDate ? moment(it.time) < endDate : true)
    ));
  }

  create(payment) {
    return this.db.payments.insert(payment);
  }

  update(id, {
    description, value, time, isDeleted = false,
  }) {
    const item = this.get(id);

    Object.assign(item, {
      description, value, time, updatedAt: new Date().toISOString(), isDeleted,
    });

    return this.db.payments.update(item);
  }

  remove(id) {
    this.update(id, { isDeleted: true });
  }
}

module.exports = (...args) => new PaymentsService(...args);
