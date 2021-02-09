const Loki = require('lokijs');

const db = new Loki('payments.db');

const payments = db.addCollection('payments');

if (!payments.data.length) {
  payments.insert({
    id: 1366,
    contractId: 17689,
    description: 'Rent payment',
    value: 100,
    time: '2016-12-09T00:00:00.00Z',
    isImported: false,
    createdAt: '2016-12-09T12:57:31.393Z',
    updatedAt: '2016-12-09T12:57:31.393Z',
    isDeleted: false,
  });
  payments.insert({
    id: 1365,
    contractId: 17689,
    description: 'Rent to be paid',
    value: -100,
    time: '2016-12-09T00:00:00.00Z',
    isImported: false,
    createdAt: '2016-12-09T12:57:09.708Z',
    updatedAt: '2016-12-09T12:57:09.709Z',
    isDeleted: false,
  });
}

module.exports = {
  payments,
};
