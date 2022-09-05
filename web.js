const express = require("express")
const path = require("path")
const app = express()

app.listen(8001, function () {
	console.log("listening on 8001")
})

app.use(express.static(path.join(__dirname, "chat/build")))

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/chat/build/index.html"))
})
