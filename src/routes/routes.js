const express = require('express');
const router = express.Router();

const { SpecialitiesController } = require('./../controllers');

router.route('/api/specialities').get(SpecialitiesController.getAll);

router.use(express.static('./public'));

module.exports = router;
