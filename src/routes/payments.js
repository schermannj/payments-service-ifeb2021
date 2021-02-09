const router = require('express').Router();

const NAMESPACE = '/payments';

router.get(NAMESPACE, (req, res) => {
  res.send('respond with a resource');
});

router.get(`${NAMESPACE}/:id`, (req, res) => {
  res.send(`respond with a resource ${req.params.id}`);
});

router.post(NAMESPACE, (req, res) => {
  res.send('create');
});

router.patch(`/${NAMESPACE}/:id`, (req, res) => {
  res.send(`respond with a resource ${req.params.id}`);
});

module.exports = router;
