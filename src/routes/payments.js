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
    failure(res, e.message);
  }
};

const get = async ({ params: { id } }, res) => {
  try {
    const data = await payments.get(id);

    if (data?.length === 0) {
      return failure(res, `No payments found with id = ${id}`, 404);
    }

    return success(res, data);
  } catch (e) {
    return failure(res, e.message);
  }
};

const create = async (req, res) => {
  try {
    // TODO: joi schema
    const data = payments.create(req.body);

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
};

const update = async ({ params: { id }, body }, res) => {
  try {
    // TODO: joi schema
    const data = await payments.update(id, body);

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
};

const remove = async ({ params: { id } }, res) => {
  try {
    await payments.remove(id);

    success(res);
  } catch (e) {
    failure(res, e.message);
  }
};

router.get(NAMESPACE, list);
router.get(`${NAMESPACE}/:id`, parseIntParam('id'), get);
router.post(NAMESPACE, create);
router.patch(`/${NAMESPACE}/:id`, parseIntParam('id'), update);
router.delete(`/${NAMESPACE}/:id`, parseIntParam('id'), remove);

module.exports = router;
