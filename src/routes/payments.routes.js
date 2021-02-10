const router = require('express').Router();
const { sumBy } = require('lodash/fp');
const db = require('../db');
const payments = require('../services/payments.service')(db);
const { success, failure } = require('../utils/router.utils');
const {
  parseIntParam, parseDateQueryParams, parseIntQueryParams, validateBodyWithSchema,
} = require('../middlewares');
const { paymentUpdateSchema, paymentCreateSchema } = require('./schemas/payment.schemas');

const NAMESPACE = '/payments';

const list = async ({ query }, res) => {
  try {
    const data = await payments.list(
      query.contractId, query.startDate, query.endDate,
    );

    const rentTotal = sumBy('value', data);

    success(res, { sum: rentTotal, items: data });
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const getOne = async ({ params: { id } }, res) => {
  try {
    const data = await payments.get(id);

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const create = async (req, res) => {
  try {
    const data = payments.create(req.body);

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const update = async ({ params: { id }, body }, res) => {
  try {
    const data = await payments.update(id, body);

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const remove = async ({ params: { id } }, res) => {
  try {
    await payments.remove(id);

    success(res);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

router.get(
  NAMESPACE,
  parseIntQueryParams(['contractId']),
  parseDateQueryParams(['startDate', 'endDate']),
  list,
);
router.get(`${NAMESPACE}/:id`, parseIntParam('id'), getOne);
router.post(NAMESPACE, validateBodyWithSchema(paymentCreateSchema), create);
router.patch(
  `${NAMESPACE}/:id`,
  parseIntParam('id'),
  validateBodyWithSchema(paymentUpdateSchema),
  update,
);
router.delete(`${NAMESPACE}/:id`, parseIntParam('id'), remove);

module.exports = {
  router,
  api: {
    list,
    getOne,
    create,
    update,
    remove,
  },
};
