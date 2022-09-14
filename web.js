const { query } = require("express")
const express = require("express")
const path = require("path")
const app = express()
const db_config = require(__dirname + "/config/database.js")
const conn = db_config.init()

app.listen(8001, function () {
	console.log("listening on 8001")
})

app.use(express.static(path.join(__dirname, "chat/build")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

app.post("/login", (req, res) => {
	const id = req.body.id ? req.body.id : ""
	const pw = req.body.pw ? req.body.pw : ""
	let data = {
		success: 0,
		msg: "",
	}
	conn.query(
		`SELECT * FROM member WHERE id='${id}' AND pw=${pw}`,
		function (error, results, fields) {
			if (error) {
				data.msg = error
				return res.status(404).send(data)
			}

			if (results.length == 0) {
				data.msg = "no member"
				return res.status(200).send(data)
			}
			data.success = 1
			return res.status(200).send(data)
		}
	)
})

app.get("/code", (req, res) => {
	let data = {
		code: "",
		text: "",
		nextCode: "",
		nextText: "",
	}
	if (req.query.code == undefined) {
		conn.query(
			`SELECT * FROM memberQuestion LIMIT 3`,
			function (error, results, fields) {
				if (error) throw error
				debugger
				res.json(results)
				res.end()
			}
		)
	} else {
		conn.query(
			`SELECT * FROM memberQuestion where code='${req.query.code}'`,
			function (error, results, fields) {
				if (error) throw error
				res.json(results)
				res.end()
			}
		)
	}
})
