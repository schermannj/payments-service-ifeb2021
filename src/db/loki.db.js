const Loki = require('lokijs');

const db = new Loki('payments.db');

const payments = db.addCollection('payments');

module.exports = {
  payments,
};
