const router = require('express').Router();
const db = require('../db');
const payments = require('../services/payments.service')(db);
const { success, failure } = require('../utils/router.utils');

const NAMESPACE = '/payments';

router.get(NAMESPACE, async (req, res) => {
  try {
    const data = await payments.list();

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
});

router.get(`${NAMESPACE}/:id`, async ({ params: { id } }, res) => {
  try {
    const data = await payments.get(id);

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
});

router.post(NAMESPACE, async (req, res) => {
  try {
    // TODO: joi schema
    const data = payments.create(req.body);

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
});

router.patch(`/${NAMESPACE}/:id`, async ({ params: { id }, body }, res) => {
  try {
    // TODO: joi schema
    const data = await payments.update(id, body);

    success(res, data);
  } catch (e) {
    failure(res, e.message);
  }
});

router.delete(`/${NAMESPACE}/:id`, async ({ params: { id } }, res) => {
  try {
    await payments.remove(id);

    success(res);
  } catch (e) {
    failure(res, e.message);
  }
});

module.exports = router;
