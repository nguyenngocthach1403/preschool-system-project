const db = require("../config/db.service");
const config = require("../config/config");
const ClassService = require("../class/class.service");
const getEvaluationCriterias = async (searchText) => {
  try {
    const response = await db.select(
      "evaluation_criterias",
      "*",
      `WHERE deleted = 0 AND name LIKE '%${searchText}%'`
    );

    if (response.length == 0) return undefined;

    return response;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const getCriteriasContents = async (limit, offset, searchText, criterias) => {
  try {
    const response = await db.selectLimit(
      "criteria_contents",
      "*",
      `WHERE deleted = 0 AND name LIKE '%${searchText}%' AND evaluation_criteria_id = ${criterias}`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );

    if (response.length == 0) return undefined;

    return response;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const createEvaluation = async (dataToCreate) => {
  try {
    const result = await db.insert(`evaluations`, dataToCreate);

    if (result.affectedRows == 0) {
      throw new Error("Thất bại!");
    }

    return result.insertId;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const createEvaluationContents = async (dataToCreate) => {
  try {
    const result = await db.insert(`evaluation_contents`, dataToCreate);

    if (result.affectedRows == 0) {
      throw new Error("Thất bại!");
    }

    return result.insertId;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const createEvaluationForm = async (dataToCreate) => {
  try {
    const result = await db.insert("evaluation_form", dataToCreate);

    if (result.affectedRows == 0) throw new Error("Thất bại!");

    return result.insertId;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const isExitCriteriasContent = async (criteriaContentId) => {
  try {
    const result = await db.select(
      "criteria_contents",
      "COUNT(*) AS total",
      `WHERE id = ${criteriaContentId}`
    );
    const dbResponse = result[0];

    if (!dbResponse["total"]) return false;

    return true;
  } catch (error) {
    return false;
  }
};

const getEvaluations = async (classId) => {
  try {
    const response = await db.query(`
      SELECT 
    e.id,
    e.name,
    e.created_by,
    e.created,
    a.username,
    COUNT(CASE WHEN ef.status = 0 THEN 1 END) AS status_0,
    COUNT(CASE WHEN ef.status = 1 THEN 1 END) AS status_1,
    COUNT(CASE WHEN ef.status = 2 THEN 1 END) AS status_2
    FROM 
        evaluations e
    LEFT JOIN 
        evaluation_form ef
    ON 
        e.id = ef.evaluation_id
    LEFT JOIN 
      accounts a
    ON
      a.id = e.created_by
    WHERE
      e.class_id = ${classId}
    GROUP BY 
    e.id,
    e.class_id,
    e.name,
    e.created_by,
    e.created;`);
    if (response.length == 0) return;
    return response;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const getEvaluationById = async (evaluaitonId) => {
  try {
    const response = await db.select(
      "evaluations eva LEFT JOIN accounts a ON a.id = eva.created_by",
      "eva.*, a.username",
      `WHERE eva.id = ${evaluaitonId}`
    );

    const evaluationResponse = response[0];
    if (!evaluationResponse) return undefined;

    const evaluationFormByEvaluationId = await getEvaluationFormByEvaluationId(
      evaluaitonId
    );
    evaluationResponse.evaluationForms = evaluationFormByEvaluationId || [];

    return evaluationResponse;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const getEvaluationFormByEvaluationId = async (evaluaitonId) => {
  try {
    //
    const response = await db.query(`
      SELECT 
          ef.evaluation_id,
          ef.id AS evaluation_form_id,
          s.name AS student_name,
          s.id AS student_id,
          s.birthday AS student_birthday,
          s.avatar AS student_avatar,
          e.class_id,
          c.name AS class_name,
          e.name AS evaluation_name,
          a.username AS evaluator_name,
          ef.last_update,
          ef.status
      FROM 
          evaluation_form ef
      JOIN 
          students s ON ef.student_id = s.id
      JOIN 
          evaluations e ON ef.evaluation_id = e.id
      JOIN 
          classes c ON e.class_id = c.id
      LEFT JOIN 
          accounts a ON ef.evaluator_id = a.id
      WHERE ef.evaluation_id = ${evaluaitonId}
  `);
    if (response.length == 0) return undefined;

    for (const item in response) {
      response[item].evaluationContents =
        await getEvaluationContentsByEvaluationFormId(
          response[item].evaluation_form_id
        );
    }
    return response;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const getEvaluationContentsByEvaluationFormId = async (evaluationFormId) => {
  try {
    const response = await db.query(`
      SELECT 
          ec.criteria_content_id,
          ec.achieve,
          ec.description,
          cc.name AS criteria_content_name,
          cc.evaluation_criteria_id
          ,
          ec2.name AS evaluation_criteria_name
      FROM 
          evaluation_contents ec
      LEFT JOIN 
          criteria_contents cc ON ec.criteria_content_id = cc.id
      LEFT JOIN 
          evaluation_criterias ec2 ON cc.evaluation_criteria_id = ec2.id
      WHERE ec.evaluation_form_id = ${evaluationFormId};
    `);
    if (response.length == 0) return undefined;

    return response;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};
const updateEvaluationContent = async (
  evaluationFormId,
  criteriaContentId,
  dataToUpData
) => {
  try {
    const response = await db.update("evaluation_contents", dataToUpData, {
      evaluation_form_id: evaluationFormId,
      criteria_content_id: criteriaContentId,
    });
    if (response == 0) throw new Error("Thất bại!");

    console.log("Thành công!");
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

module.exports = {
  getEvaluationCriterias,
  getCriteriasContents,
  createEvaluation,
  createEvaluationForm,
  createEvaluationContents,
  isExitCriteriasContent,
  getEvaluations,
  getEvaluationById,
  getEvaluationFormByEvaluationId,
  getEvaluationContentsByEvaluationFormId,
  updateEvaluationContent,
};
