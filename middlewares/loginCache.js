const loginUtils = require("../utils/loginUtils")
const logger = require("../winston.js")

const loginCache = async (req, res, next) => {
	const id = req.body.id ? req.body.id : ""
	const pw = req.body.pw ? req.body.pw : ""

	if (id === "" || pw === "") {
		// request body data error
		req.body.msg = 400
		next()
	}

	const login = await loginUtils.login(id, pw)

	switch (login.result) {
		case -1:
			// db error
			req.body.msg = 500
			next()
			break
		case 0:
			//no member
			res.status(200).send("0")
			break
		case 1:
			// session set
			req.session.user = {
				no: login.no,
				id: login.id,
				pw: login.pw,
				nick: login.nick,
				authorized: true,
			}
			// cookie set
			res.cookie("autoLogin", "1")
			logger.info("[DB] Login Success !!!")
			res.status(200).send("1")
			break
	}
}

const loginCheckCache = (req, res, next) => {
	req.body.msg = "0"
	// session & cookie check
	if (req.session.user && req.cookies.autoLogin) {
		logger.info("[Check] LoginCheck result : Success")
		req.body.msg = "1"
	} else {
		logger.warn("[Check] LoginCheck result : False")
		req.body.msg = "0"
	}
	next()
}

const logOutCache = (req, res, next) => {
	if (req.session.user && req.cookies.autoLogin) {
		req.body.msg = "1"
	} else {
		req.body.msg = "0"
	}
	next()
}

module.exports = {
	loginCache,
	loginCheckCache,
	logOutCache,
}
