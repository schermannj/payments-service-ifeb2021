const router = require('express').Router();
const { router: paymentsRouter } = require('./payments');

const NAMESPACE = '/api';

router.use(NAMESPACE, paymentsRouter);

module.exports = router;
