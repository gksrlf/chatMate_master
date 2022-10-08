const qnaUtils = require("../utils/qnaUtils");
const logger = require("../winston.js");
const axios = require("axios");

//QnAList Call
const getQnaListCache = async (req, res, next) => {
  const code = req.query.code;
  const qnaList = await qnaUtils.getQNA(code); //DB call
  const noLogin = "-1";

  // login check
  // if (req.session.user) {
  // 	return res.status(200).send(noLogin)
  // }

  if (qnaList == null) {
    req.body.msg = 0;
    next();
  } else {
    // logger.info("[DB] QnAList DB Success!!")
    console.log("[DB] QnAList DB Success!!");
    return res.status(200).json(qnaList);
  }
};

//AiCall
const getAiCache = async (req, res, next) => {
  const data = {
    question: req.body.text ? req.body.text : "",
  };
  const noLogin = "-1";
  try {
    // login check
    // if (!req.session.user) {
    // 	return res.status(200).send(noLogin)
    // }

    // logging
    if (data.question == "") {
      // logger.warn("[Ai] Warn!! Ai request text is Null!!! ===>" + data.question)
      console.log(
        "[Ai] Warn!! Ai request text is Null!!! ===>" + data.question
      );
    }

    //Ai call
    const result = await axios.post("http://61.80.148.34:9000/userQnA", data, {
      timeout: 5000,
    });
    req.body.msg = result.data;
    next();
  } catch (err) {
    // logger.error("[Server] Error!! aiServer error!!! ===>" + err)
    console.log("[Server] Error!! aiServer error!!! ===>" + err);
    req.body.msg = -1;
    next();
  }
};

// inquiryHistory call
const getInquiryHistoryCache = async (req, res, next) => {
  //key DataSet
  const memNo = req.body.memNo ? req.body.memNo : 0;
  const noLogin = "-1";
  // login check
  if (!req.session.user) {
    return res.status(200).send(noLogin);
  }

  if (memNo == 0) {
    req.body.msg = "0";
    next();
  }

  //DB Call
  const list = await qnaUtils.getInquiryHistoryList(memNo);

  //list null
  if (list == 0) {
    req.body.msg = "-2";
    next();
  } else {
    //list not null
    return res.status(200).json(list);
  }
};

// inquiryHistory single get
const getSingleInquiryCache = async (req, res, next) => {
  const No = req.body.No ? req.body.No : 0;
  const noLogin = "-1";
  // login check
  if (!req.session.user) {
    return res.status(200).send(noLogin);
  }

  // No is Null
  if (No == 0) {
    req.body.msg = "0";
    console.log(
      "[qnaCache] Error!! qnaCache getSingleInquiryCache No is Null!!"
    );
    next();
  }

  //DB Call
  const inquiryData = await qnaUtils.getInquiry(No);

  // list is Null
  if (inquiryData.length == 0) {
    req.body.msg = "-2";
    next();
  } else {
    return res.status(200).json(inquiryData);
  }
};

// InquiryHistory insert
const setInquiryCache = async (req, res, next) => {
  const noLogin = "-1";

  // data validation
  const validData = await qnaUtils.ValidateData(req.body.member);

  // data have undefined
  if (validData == -10) {
    req.body.msg = "-10";
    next();
  }

  // login check
  if (!req.session.user) {
    return res.status(200).send(noLogin);
  }

  const insData = await qnaUtils.setInquiry(validData);
  // DB Success
  if (insData == "1") {
    return res.status(200).send(insData);
  } else {
    req.body.msg = insData;
    next();
  }
};

module.exports = {
  getQnaListCache,
  getAiCache,
  getInquiryHistoryCache,
  getSingleInquiryCache,
  setInquiryCache,
};
