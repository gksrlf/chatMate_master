const connect = require("../config/database")
const logger = require("../winston")
const conn = connect.connection

// login
const login = async (id, pw) => {
	let data = {
		result: 0,
		no: 0,
		id: "",
		pw: "",
		nick: "",
	}
	try {
		const [rows, fields] = await conn.query(
			`SELECT * FROM member WHERE id='${id}' AND pw=${pw}`
		)
		if (rows.length == 0) {
			// noMember
			data.result = 0
		} else {
			// success
			data.result = 1
			data.no = rows[0].NO
			data.id = rows[0].id
			data.pw = rows[0].pw
			data.nick = rows[0].nick
		}
		connect.release
	} catch (err) {
		// logger.error("[LoginUtils] Error!! loginUtils MySql Error!!" + err)
		console.log("[LoginUtils] Error!! loginUtils MySql Error!!" + err)
		//error
		data.result = -1
		connect.release
	}
	return data
}

const getMember = async (memNo) => {
	try {
		const [rows, fields] = await conn.query(
			`SELECT * FROM member WHERE No = ${memNo}`
		)
		connect.release
		return rows
	} catch (err) {
		//error
		console.log("[LoginUtils] Error!! loginUtils getMember Error!!" + err)
		connect.release
		return "-1"
	}
}

module.exports = {
	login,
	getMember,
}
