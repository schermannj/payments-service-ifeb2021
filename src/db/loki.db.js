const Loki = require('lokijs');
const moment = require('moment');

const db = new Loki('payments.db');

const payments = db.addCollection('payments');

// autoincrement id
payments.on('insert', (input) => Object.assign(input, {
  id: input.$loki,
  createdAt: moment.utc().toISOString(),
  updatedAt: moment.utc().toISOString(),
}));

payments.on('update', (input) => Object.assign(input, {
  updatedAt: moment.utc().toISOString(),
}));

if (!payments.data.length) {
  payments.insert({
    contractId: 17689,
    description: 'Rent payment',
    value: 101,
    time: '2016-12-09T00:00:00.00Z',
    isImported: false,
    createdAt: '2016-12-09T12:57:31.393Z',
    updatedAt: '2016-12-09T12:57:31.393Z',
    isDeleted: false,
  });
  payments.insert({
    contractId: 17689,
    description: 'Rent to be paid',
    value: -100,
    time: '2016-12-10T00:00:00.00Z',
    isImported: false,
    createdAt: '2016-12-09T12:57:09.708Z',
    updatedAt: '2016-12-09T12:57:09.709Z',
    isDeleted: false,
  });
}

module.exports = {
  payments,
};
