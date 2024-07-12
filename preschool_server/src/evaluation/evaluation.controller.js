const express = require("express");

const checkService = require("../config/check.service");
const EvaluaitonService = require("./evaluation.service");
const ClassService = require("../class/class.service");
const AccountService = require("../account/account.service");
const { decodeHeader } = require("../../middleware/verifyAuth");
const Response = require("../../helpers/response");

const router = express.Router();

router.get("/evaluation_criterias", decodeHeader, getEvaluationCriterias);
router.get("/criterias_contents", decodeHeader, getCriteriaContents);
router.post("/create/:classId", decodeHeader, createEvaluation);
router.get("/", decodeHeader, getEvaluations);
router.get("/get", decodeHeader, getEvaluationById);

async function getEvaluationById(req, res) {
  const { evaluationId } = req.query;

  try {
    const dbResponse = await EvaluaitonService.getEvaluationById(evaluationId);

    Response.sendResponse({ res, statusCode: 200, responseBody: dbResponse });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400 });
  }
}
async function createEvaluation(req, res) {
  const { classId } = req.params;

  const { evaluationName, criteriasContents, createBy } = req.body;

  console.log(classId, evaluationName, criteriasContents);
  try {
    const studentOfClass = await ClassService.getMembers(classId);
    if (!(await ClassService.isExistClass(classId))) {
      return Response.sendErrorResponse({
        res,
        statusCode: 400,
        error: "Lớp không tồn tại",
      });
    }
    if (!(await AccountService.isExitAccountById(createBy))) {
      return Response.sendErrorResponse({
        res,
        statusCode: 404,
        error: `Nội dung ${criteriasContents[item].name} không tồn tại!`,
      });
    }
    const evaluationIdCreated = await EvaluaitonService.createEvaluation({
      class_id: classId,
      name: evaluationName,
      created_by: createBy,
    });

    for (const item in criteriasContents) {
      if (
        !(await EvaluaitonService.isExitCriteriasContent(
          criteriasContents[item].id
        ))
      ) {
        return Response.sendErrorResponse({
          res,
          statusCode: 404,
          error: `Nội dung ${criteriasContents[item].name} không tồn tại!`,
        });
      }
    }

    //

    //create evaluation form
    //get student of clas
    for (const student in studentOfClass) {
      //create evaluation form
      const evaluationFormId = await EvaluaitonService.createEvaluationForm({
        student_id: studentOfClass[student].id,
        evaluation_id: evaluationIdCreated,
      });

      for (const item in criteriasContents) {
        await EvaluaitonService.createEvaluationContents({
          evaluation_form_id: evaluationFormId,
          criteria_content_id: criteriasContents[item].id,
        });
      }
    }
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    console.log(error);
    Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: error.message,
    });
  }
}

async function getCriteriaContents(req, res) {
  const { limit, offset, searchText, criterias } = req.query;
  try {
    const resultData = await EvaluaitonService.getCriteriasContents(
      limit,
      offset,
      searchText,
      criterias
    );

    Response.sendResponse({
      res,
      statusCode: 200,
      responseBody: resultData || [],
    });
  } catch (error) {
    Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: error.message,
    });
  }
}

async function getEvaluationCriterias(req, res) {
  const { searchText } = req.query;

  try {
    const resultData = await EvaluaitonService.getEvaluationCriterias(
      searchText
    );

    Response.sendResponse({
      res,
      statusCode: 200,
      responseBody: resultData || [],
    });
  } catch (error) {
    Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: error.message,
    });
  }
}

async function getEvaluations(req, res) {
  const { classId } = req.query;

  try {
    const dbResponse = await EvaluaitonService.getEvaluations(classId);

    Response.sendResponse({ res, statusCode: 200, responseBody: dbResponse });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error.message });
  }
}

module.exports = router;
