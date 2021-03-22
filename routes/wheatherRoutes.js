const express = require('express');
let router = express.Router();

const dataRouter = require('./dataRouter')
const summarizeRouter = require('./summarizeRouter')

router.use('/data',dataRouter)

router.use('/summarize',summarizeRouter)

module.exports = router;