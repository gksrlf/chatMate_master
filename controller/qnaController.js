const logger = require("../winston.js");

//QnAList Call
const getQnaListController = async (req, res) => {
  const data = req.body.msg;
  const code = req.query.code;

  //QnA List is Null
  if (data == 0) {
    // logger.error("[DB] Error!! qnaListController No Rows!! ===>" + code)
    console.log("[DB] Error!! qnaListController No Rows!! ===>" + code);
    return res.status(200).send("0");
  }
};

//AiCall
const getAiController = async (req, res) => {
  const data = req.body.msg;

  // ai Server Error No return data
  if (data == 0) {
    return res
      .status(200)
      .send(
        "회원님 접수해 주신 내용만으로 문의 사항을 정확히 파악할 수 없는 점 양해 부탁드립니다 좀 더 자세히 접수해 주시면 확인 후 즉시 답변드리도록 하겠습니다"
      );
  } else if (data == -1) {
    return res
      .status(500)
      .send(
        "서버 문제로 인해 답변을 드릴 수 없습니다. 빠른 시일내에 복구하도록 하겠습니다."
      );
  }
  return res.status(200).send(req.body.msg.answer);
};

// inquiryHistory call
const getInquiryHistoryController = async (req, res) => {
  const data = req.body.msg;
  const memNo = req.body.memNo ? req.body.memNo.toString() : "0";

  // memNo is Null
  if (data === "0") {
    console.log("[Parameter] Error!! inquiryHistory memNo is Null!!!");
    return res.status(200).send(data);
  }

  // list is Null
  if (data === "-2") {
    console.log("[DB] Error!! inquiryHistory No Rows!!!===>" + memNo);
    return res.status(200).send(data);
  }
};

// inquiryHistory single get
const getSingleInquiryController = async (req, res) => {
  const data = req.body.msg;
  const No = req.body.No ? req.body.No.toString() : "0";

  // No is Null
  if (data == "0") {
    console.log("[Parameter] Error!! getSingleInquiry No is Null!!!");
    return res.status(200).send(data);
  }

  // list is Null
  if (data == "-2") {
    console.log("[DB] Error!! getSingleInquiry No Rows!!!===>" + No);
    return res.status(200).send(data);
  }
};

// InquiryHistory insert
const setInquiryController = async (req, res) => {
  const data = req.body.msg;
  const member = req.body.member.toString();

  // Data Error
  if (data == "-10") {
    console.log(
      "[Parameter] Error!! setInquiryController Data is undefined!! ===>" +
        member
    );
    return res.status(200).send(data);
  }

  // qnaUtils.setInquiry DB Error
  if (data == "-2") {
    console.log("[DB] Error!! setInquiryController DB INSERT Error!!!");
    return res.status(200).send(data);
  }
};

// History score insert
const setScoreController = async (req, res) => {
  const data = req.body.msg;

  // DB Error
  if (data === "2") {
    return res.status(200).send(data);
  } else {
    // unKnown Error!!
    console.log(
      "[unKnown Error] Error!! unKnown Error!! ===>" +
        req.query.No +
        "@@" +
        req.query.score
    );
    return res.status(200).send("-10");
  }
};
module.exports = {
  getQnaListController,
  getAiController,
  getInquiryHistoryController,
  getSingleInquiryController,
  setInquiryController,
  setScoreController,
};
