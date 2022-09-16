const express = require("express")
const router = express.Router()
const qnaCache = require("../middlewares/qnaCache")
const qnaController = require("../controller/qnaController")

router.get("/", qnaCache.getQnaListCache, qnaController.getQnaListController)

module.exports = router
