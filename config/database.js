const mysql = require("mysql")
const db_info = {
	host: "nodejs-014.cafe24.com",
	port: "3306",
	user: "gksrlf7895",
	password: "chatmate@24",
	database: "gksrlf7895",
}

module.exports = {
	init: function () {
		return mysql.createConnection(db_info)
	},
	connect: function (conn) {
		conn.connect(function (err) {
			if (err) console.error("mysql connection error : " + err)
			else console.log("mysql is connected successfully!")
		})
	},
}
