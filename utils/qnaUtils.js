const { json } = require("express")
const connect = require("../config/database")
const logger = require("../winston")
const conn = connect.connection

//get QNAList
const getQNA = async (code) => {
	try {
		if (code == undefined) {
			const [rows, fields] = await conn.query(
				`SELECT * FROM memberQuestion LIMIT 3`
			)
			connect.release
			return rows
		} else {
			const [rows, fields] = await conn.query(
				`SELECT * FROM memberQuestion where code='${code}'`
			)
			connect.release
			return rows
		}
	} catch (err) {
		// logger.error("[qnaUtils] Error!! qnaUtils MySql Error!! ===>" + err)
		console.log("[qnaUtils] Error!! qnaUtils getQNA Error!! ===>" + err)
	}
}

//get InquiryHistoryList
const getInquiryHistoryList = async (memNo) => {
	try {
		const [rows, fields] = await conn.query(
			`SELECT * FROM inquiryHistory WHERE memNo = ${memNo}`
		)
		connect.release
		return rows
	} catch (err) {
		console.log(
			"[qnaUtils] Error!! qnaUtils getInquiryHistoryList Error!!! ===>" +
				err
		)
	}
}

// inquiryHistory single get
const getInquiry = async (No) => {
	try {
		const [rows, fields] = await conn.query(
			`SELECT * FROM inquiryHistory WHERE no = ${No}`
		)
		connect.release
		return rows
	} catch (err) {
		console.log("[qnaUtils] Error!! qnaUtils getInquiry Error!! ===>" + err)
	}
}
/**
 *
 * param  data
 * Return data Not Null => {Object} data
 *         data is Null => -10
 */
const ValidateData = async (data) => {
	const values = Object.values(data)
	for (let i in values) {
		if (
			values[i] == undefined ||
			values[i] == null ||
			values[i] == "undefined"
		) {
			return -10
		}
	}
	return data
}

// inquiryHistory insert
const setInquiry = async (data) => {
	// data parse
	const { memNo, memNick, code, question, answer, score } = data
	try {
		const [rows, fields] = await conn.query(
			`INSERT INTO inquiryHistory(memNo,memNick,code,question,answer,score) 
            VALUES (${memNo},${memNick},${code},${question},${answer},${score})`
		)
		connect.release
		return "1"
	} catch (err) {
		console.log("[qnaUtils] Error!! qnaUtils setInquiry Error!! ===>" + err)
		return "-2"
	}
}

module.exports = {
	getQNA,
	getInquiryHistoryList,
	getInquiry,
	setInquiry,
	ValidateData,
}
