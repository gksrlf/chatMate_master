const logger = require("../winston.js")

const loginController = async (req, res) => {
	const status = req.body.msg

	if (status == 400) {
		const data = req.body
		// logger.error("[Request] Error!! login ID, PW Null!!!")
		console.log("[Request] Error!! login ID, PW Null!!!")
		return res.status(status).send(data)
	} else if (status == 500) {
		// logger.error("[DB] Error!! loginUtils login Error!!!")
		console.log("[DB] Error!! loginUtils login Error!!!")
		return res.status(status).send("DB Error!")
	}
}

const loginCheckController = (req, res) => {
	const data = req.body.msg
	res.status(200).send(data)
}

const logOutController = (req, res) => {
	const data = req.body.msg

	if (data === "0") {
		// logger.error("[LogOut] Error!! Not Login !! Session & Cookie is Null!!")
		console.log("[LogOut] Error!! Not Login !! Session & Cookie is Null!!")
		return res.status(400).send(data)
	}

	req.session.destroy((err) => {
		if (err) {
			// logger.error("[LogOut] Error!! Session & Cookie destroy Error!!")
			console.log("[LogOut] Error!! Session & Cookie destroy Error!!")
			return res.status(500).send("-1")
		}
		res.clearCookie("autoLogin")
		// logger.info("[LogOut] Log Out Success!!")
		console.log("[LogOut] Log Out Success!!")
		return res.status(200).send(data)
	})
}

const getmemberController = (req, res) => {
	const data = req.body.msg
	const memNo = req.query.memNo.toString()
	// noLogin Error
	if (data === "-1") {
		console.log(
			"[getMember] Error!! not Login !! Session & Cookie is Null!!"
		)
		return res.status(400).send(data)
	}

	// DB null
	if (data === "0") {
		console.log("[getMember] Error!! member is Null!!!")
		return res.status(400).send(memNo)
	}
}
module.exports = {
	loginController,
	loginCheckController,
	logOutController,
	getmemberController,
}
