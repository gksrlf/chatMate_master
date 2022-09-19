const express = require("express")
const path = require("path")
const app = express()
// const db_config = require(__dirname + "/config/database.js")
// const conn = db_config.init()
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const loginRouter = require("./routes/loginRouter")
const qnaRouter = require("./routes/qnaRouter")

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

app.use("/login", loginRouter)

app.use("/code", qnaRouter)

app.get("/", async (req, res) => {
	res.sendFile(path.join(__dirname, "/chat/build/index.html"))
})

// app.listen(8001, function () {
// 	console.log("listening on 8001")
// })
