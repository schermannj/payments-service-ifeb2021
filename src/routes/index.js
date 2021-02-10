const router = require('express').Router();
const { router: paymentsRouter } = require('./payments.routes');

const NAMESPACE = '/api';

router.use(NAMESPACE, paymentsRouter);

module.exports = router;
