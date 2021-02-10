const router = require('express').Router();
const db = require('../db');
const payments = require('../services/payments.service')(db);
const { success, failure } = require('../utils/router.utils');
const { parseIntParam } = require('../middlewares');

const NAMESPACE = '/payments';

const list = async (req, res) => {
  try {
    const data = await payments.list();

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const get = async ({ params: { id } }, res) => {
  try {
    const data = await payments.get(id);

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const create = async (req, res) => {
  try {
    // TODO: joi schema
    const data = payments.create(req.body);

    success(res, data);
  } catch (e) {
    failure(res, e.title, e.detail, e.statusCode);
  }
};

const update = async ({ params: { id }, body }, res) => {
  try {
    // TODO: joi schema
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

router.get(NAMESPACE, list);
router.get(`${NAMESPACE}/:id`, parseIntParam('id'), get);
router.post(NAMESPACE, create);
router.patch(`/${NAMESPACE}/:id`, parseIntParam('id'), update);
router.delete(`/${NAMESPACE}/:id`, parseIntParam('id'), remove);

module.exports = {
  router,
  api: {
    list,
    get,
    create,
    update,
    remove,
  },
};
