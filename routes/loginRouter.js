const express = require("express")
const router = express.Router()
const loginCache = require("../middlewares/loginCache")
const loginController = require("../controller/loginController")

router.post("/", loginCache.loginCache, loginController.loginController)

router.get(
	"/loginChk",
	loginCache.loginCheckCache,
	loginController.loginCheckController
)

router.get("/logout", loginCache.logOutCache, loginController.logOutController)

router.get(
	"/getmember",
	loginCache.getMemberCache,
	loginController.getmemberController
)
module.exports = router
