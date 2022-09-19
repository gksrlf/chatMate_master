const express = require("express")
const router = express.Router()
const qnaCache = require("../middlewares/qnaCache")
const qnaController = require("../controller/qnaController")

// qna list get
router.get("/", qnaCache.getQnaListCache, qnaController.getQnaListController)

// ai server api
router.post("/text", qnaCache.getAiCache, qnaController.getAiController)

// inquiryHistory get
router.post(
	"/history",
	qnaCache.getInquiryHistoryCache,
	qnaController.getInquiryHistoryController
)

// inquiryHistory single get
router.post(
	"/inquiry",
	qnaCache.getSingleInquiryCache,
	qnaController.getSingleInquiryController
)

router.post(
	"/ins",
	qnaCache.setInquiryCache,
	qnaController.setInquiryController
)

module.exports = router
