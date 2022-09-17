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

const getAiCache = async (req, res, next) => {
	const data = {
		question: req.body.text ? req.body.text : "",
	}
	try {
		if (data.question == "") {
			logger.warn(
				"[Ai] Warn!! Ai request text is Null!!! ===>" + data.question
			)
		}
		const result = await axios.post(
			"http://61.80.148.34:9000/userQnA",
			data
		)
		req.body.msg = result.data
		next()
	} catch (err) {
		logger.error("[Server] Error!! aiServer error!!! ===>" + err)
		req.body.msg = 0
		next()
	}
}
module.exports = {
	getQnaListCache,
	getAiCache,
}
