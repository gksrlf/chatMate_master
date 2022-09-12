const express = require("express")
const path = require("path")
const app = express()
const db_config = require(__dirname + "/config/database.js")
const conn = db_config.init()

app.listen(8001, function () {
	console.log("listening on 8001")
})

app.use(express.static(path.join(__dirname, "chat/build")))

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/chat/build/index.html"))
})

app.get("/test", (req, res) => {
	conn.query(
		"SELECT * FROM `memberQuestion`",
		function (error, results, fields) {
			if (error) throw error
			res.json(results)
			res.end()
		}
	)
})
