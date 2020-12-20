const express = require('express');
const router = express.Router();
const {validator} = require('../../middleware/validator');
const {getRecords} = require('./RecordController');
router.post('/', validator(), getRecords);
