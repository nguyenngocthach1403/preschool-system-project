const express = require("express");

const menuService = require("./menu.service");
const Response = require("../../helpers/response");
const { isEmpty, isNumber } = require("../../helpers/validation");
const router = express.Router();

router.get("/", getMeals);
router.get("/dish/get", getDishes);

async function getDishes(req, res) {
  const { limit, offset } = req.query;
  if (
    isEmpty(limit) ||
    isEmpty(offset) ||
    !isNumber(limit) ||
    !isNumber(offset)
  ) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Limit và offset không hợp lệ!",
    });
  }

  const dbResponse = await menuService.getDishes(limit, offset);

  console.log(dbResponse);

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: dbResponse || [],
  });
}
async function getMeals(req, res) {
  const { weeklyMenuId } = req.query;

  if (isEmpty(weeklyMenuId) || !isNumber(weeklyMenuId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "ID không đúng định dạng!",
    });
  }

  const dbResponse = await menuService.getMeals();

  const menuReponse = await menuService.getWeeklyMenuById(weeklyMenuId);
  console.log(menuReponse);

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: {
      meals: dbResponse,
      menu: menuReponse ? menuReponse["weekly_menu"] : [],
    },
  });
}

module.exports = router;
