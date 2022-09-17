const logger = require("../winston.js")

const getQnaListController = async (req, res) => {
	const data = req.body.msg
	const code = req.query.code
	if (data == 0) {
		logger.error("[DB] Error!! qnaListController No Rows!! ===>" + code)
		return res.status(400).send("0")
	}
}

const getAiController = async (req, res) => {
	const data = req.body.msg

	if (data == 0) {
		return res
			.status(500)
			.send(
				"회원님 접수해 주신 내용만으로 문의 사항을 정확히 파악할 수 없는 점 양해 부탁드립니다 좀 더 자세히 접수해 주시면 확인 후 즉시 답변드리도록 하겠습니다"
			)
	}
	return res.status(200).send(req.body.msg.answer)
}
module.exports = {
	getQnaListController,
	getAiController,
}
