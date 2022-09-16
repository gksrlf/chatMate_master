const logger = require("../winston.js")

const getQnaListController = async (req, res) => {
	const data = req.body.msg
	const code = req.query.code
	if (data == 0) {
		logger.error("[DB] Error!! qnaListController No Rows!! ===>" + code)
		return res.status(400).send("0")
	}
}

module.exports = {
	getQnaListController,
}
