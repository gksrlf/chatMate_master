const qnaUtils = require("../utils/qnaUtils")
const logger = require("../winston.js")
const axios = require("axios")

const getQnaListCache = async (req, res, next) => {
	const code = req.query.code
	const qnaList = await qnaUtils.getQNA(code)
	if (qnaList == null) {
		req.body.msg = 0
		next()
	} else {
		logger.info("[DB] QnAList DB Success!!")
		res.status(200).json(qnaList)
	}
}

const getAiCache = async (req, res, next) => {}
module.exports = {
	getQnaListCache,
}
