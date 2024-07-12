import { api } from "../services/Api";

const getEvaluationCriterias = (searchText) => {
  return api().get(`/evaluation/evaluation_criterias?searchText=${searchText}`);
};
const getCriteriasContents = (limit, page, searchText, criterias) => {
  return api().get(
    `/evaluation/criterias_contents?limit=${limit}&offset=${
      limit * page
    }&searchText=${searchText}&criterias=${criterias}`
  );
};

const createEvaluation = (classId, dataToCreate) => {
  return api().post(`/evaluation/create/${classId}`, dataToCreate);
};
const getEvaluations = (classId) => {
  return api().get(`/evaluation?classId=${classId}`);
};

const getEvaluationById = (evaluationId) => {
  return api().get(`/evaluation/get?evaluationId=${evaluationId}`);
};

// const getEvaluationById = (evaluationId) => {
//   return api().get(`/evaluation/get?evaluationId=${evaluationId}`);
// };

export default {
  getEvaluationCriterias,
  getCriteriasContents,
  createEvaluation,
  getEvaluations,
  getEvaluationById,
};
