const connect = require("../config/database")
const logger = require("../winston")
const conn = connect.connection

const getQNA = async (code) => {
	try {
		if (code == undefined) {
			const [rows, fields] = await conn.query(
				`SELECT * FROM memberQuestion LIMIT 3`
			)
			return rows
		} else {
			const [rows, fields] = await conn.query(
				`SELECT * FROM memberQuestion where code='${req.query.code}'`
			)
			return rows
		}
	} catch (err) {
		logger.error("[qnaUtils] Error!! qnaUtils MySql Error!! ===>" + err)
	}
}

module.exports = {
	getQNA,
}
