const express = require('express');
const marketController = require('@/controllers/marketController');

const router = express.Router();

router.get('/detail', marketController.findOne);
router.get('/list', marketController.findAll);
router.post('/create', marketController.create);
router.put('/update', marketController.update);
router.delete('/remove', marketController.remove);

module.exports = router;
