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

	//DB Call
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
			// logger.info("[DB] Login Success !!!")
			console.log("[DB] Login Success !!!")
			res.status(200).json(login)
			break
	}
}

const loginCheckCache = (req, res, next) => {
	req.body.msg = "0"
	// session & cookie check
	if (req.session.user && req.cookies.autoLogin) {
		// logger.info("[Check] LoginCheck result : Success")
		console.log("[Check] LoginCheck result : Success")
		req.body.msg = "1"
	} else {
		// logger.warn("[Check] LoginCheck result : False")
		console.log("[Check] LoginCheck result : False")
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

const getMemberCache = async (req, res, next) => {
	const memNo = req.query.memNo ? req.query.memNo : 0
	const noLogin = "-1"
	// login check
	if (!req.session.user) {
		req.body.msg = noLogin
		next()
	}

	//DB Call
	const member = await loginUtils.getMember(memNo)

	if (member.length == 0) {
		req.body.msg = "0"
		next()
	} else {
		console.log("[getMember] member Inquiry Success")
		return res.status(200).json(member)
	}
}

module.exports = {
	loginCache,
	loginCheckCache,
	logOutCache,
	getMemberCache,
}
