const mysql = require("mysql2/promise")
const logger = require("../winston.js")
const db_info = {
	host: "nodejs-014.cafe24.com",
	port: "3306",
	user: "gksrlf7895",
	password: "chatmate@24",
	database: "gksrlf7895",
}

const connection = mysql.createPool(db_info)

const connect = connection.getConnection((err) => {
	if (err) {
		logger.error("mysql connection error : " + err)
		console.log("mysql connection error : " + err)
	} else {
		logger.info("mysql is connected successfully!")
		console.log("mysql is connected successfully!")
	}
})

const release = () => {
	connect.release()
}

module.exports = {
	connect,
	connection,
	release,
}
