const express = require('express')
const router = express.Router()
const { getAllData } = require('../controller/controller')

router.get('/datas', async (req, res) => {
    const data = await getAllData();
    res.send(data)
});

module.exports = router;
