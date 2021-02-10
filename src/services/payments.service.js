const moment = require('moment');
const { omitBy, isNil } = require('lodash/fp');
const { ClientError } = require('../errors');

class PaymentsService {
  /**
   * The db object have to support mongo-like interface
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Returns a single payment item if it exists, otherwise fails.
   *
   * @param id - int value
   */
  get(id) {
    const response = this.db.payments.find({ id, isDeleted: false });

    if (!response.length) {
      throw new ClientError(`No payments found with id = ${id}`);
    }

    return response[0];
  }

  /**
   * Returns list of payment items by contractId - if contract id is not supplied - fails.
   * The method exposes functionality to filter result by startDate and endDate.
   *
   * @param contractId - int, id of the rent contract
   * @param startDate - Date, start date of the rent contract
   * @param endDate - Date, end date of the rent contract
   */
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

  /**
   * Creates a payment item.
   *
   * @param payment - {contractId, description, value, time}
   * @returns payment
   */
  create(payment) {
    return this.db.payments.insert(payment);
  }

  /**
   * Updates a payment by id.
   *
   * @param id - int, payment id
   * @param description - str, payment description
   * @param value - number, payment value
   * @param time - ISO date str, time of the payment
   * @param isDeleted - bool, is used for paranoid delete
   * @returns {*}
   */
  update(id, {
    description, value, time, isDeleted = false,
  }) {
    const item = this.get(id);

    const updatePayload = omitBy(isNil, {
      description, value, time, updatedAt: new Date().toISOString(), isDeleted,
    });

    Object.assign(item, updatePayload);

    return this.db.payments.update(item);
  }

  /**
   * Deletes a payment by id.
   *
   * @param id - int, payment id
   * @returns {*}
   */
  remove(id) {
    return this.update(id, { isDeleted: true });
  }
}

module.exports = (...args) => new PaymentsService(...args);
