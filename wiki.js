const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('wiki home page');
});

router.get('/about', (req, res) => {
  res.send('About this wiki');
});

module.exports = router;
