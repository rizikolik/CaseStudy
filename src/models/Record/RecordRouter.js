const express = require('express');
const router = express.Router();
const {validator} = require('../../middleware/validator');
const {getRecords} = require('./RecordController');

router
  .route('/records')
  //Divide Route for reusebility
  .get((req, res) => {
    res.status(201).json({
      Message: 'No view Template Created for this route',
    });
  })
  //Request goes to middleware firstly

  .post((req, res) => {
    return validator(req, res, getRecords);
  });

module.exports = router;
