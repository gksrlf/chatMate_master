const { query } = require("express")
const express = require("express")
const path = require("path")
const app = express()
const db_config = require(__dirname + "/config/database.js")
const conn = db_config.init()
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")

app.listen(8001, function () {
	console.log("listening on 8001")
})

app.use(express.static(path.join(__dirname, "chat/build")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// cookie and session assign middleWare
app.use(cookieParser())
// 세션 세팅
app.use(
	expressSession({
		secret: "my key",
		resave: true,
		saveUninitialized: true,
	})
)

app.get("/", async (req, res) => {
	res.sendFile(path.join(__dirname, "/chat/build/index.html"))
})

app.post("/login", async (req, res) => {
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

			// 세션 생성
			req.session.user = {
				no: results[0].NO,
				id: results[0].id,
				pw: results[0].pw,
				name: results[0].nick,
				authorized: true,
			}
			res.cookie("autoLogin", "1")
			data.success = 1
			return res.status(200).send(data)
		}
	)
})

app.get("/loginChk", async (req, res) => {
	let data = "0"
	if (req.session.user && req.cookies.autoLogin) {
		data = "1"
	}
	console.log(req.cookies.autoLogin)
	console.log(req.session)
	return res.status(200).send(data)
})

app.get("/logout", async (req, res) => {
	let data = {
		code: 0,
	}
	if (req.session.user) {
		req.session.destroy((err) => {
			if (err) {
				console.log("세션 삭제시 에러 발생")
				return res.send(data)
			}
			console.log("세션 삭제")
			data.code = 1
			res.clearCookie("autoLogin")
			return res.send(data)
		})
	} else {
		console.log("로그인 안됨")
		data.code = -1
		return res.send(data)
	}
})

app.get("/code", async (req, res) => {
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
