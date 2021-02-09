const router = require('express').Router();
const paymentsRouter = require('./payments');

const NAMESPACE = '/api';

router.use(NAMESPACE, paymentsRouter);

module.exports = router;
