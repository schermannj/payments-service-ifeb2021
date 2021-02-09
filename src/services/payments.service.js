class PaymentsService {
  constructor(db) {
    /**
     * The db object have to support mongo-like interface
     */
    this.db = db;
  }

  get(id) {
    return this.db.payments.find({ id });
  }

  list() {
    return this.db.payments.find({});
  }

  create(payment) {
    return this.db.payments.insert(payment);
  }

  update(id, payment) {
    return this.db.payments.findAndUpdate({ id }, payment);
  }

  remove(id) {
    return this.db.payments.findAndRemove({ id });
  }
}

module.exports = (...args) => new PaymentsService(...args);
