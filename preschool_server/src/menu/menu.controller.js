const express = require("express");

const menuService = require("./menu.service");
const AccountService = require("../account/account.service");
const ClassService = require("../class/class.service");
const Response = require("../../helpers/response");
const {
  isEmpty,
  isNumber,
  isValidTime,
  isValidDate,
} = require("../../helpers/validation");
const router = express.Router();

router.get("/", getWeeklyMenuById);
router.get("/dish/get", getDishes);
router.delete("/dish/delete", deleleDish);
router.post("/dish/update", updateDish);
router.get("/meals", getMeals);
router.get("/dish/search", searchDish);
router.post("/meals/add", addMeal);
router.post("/dish/add", addDish);
router.get("/class", getMenuByClassId);
router.post("/create", createMenuByClassId);
router.post("/update", updateMenu);

async function updateDish(req, res) {
  const { dishId } = req.query;
  const { name, category } = req.body;

  if (isEmpty(dishId) || !isNumber(dishId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Mã món ăn không hợp lệ!",
    });
  }

  if ((await menuService.isExistDish(dishId)) == false) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Mã món ăn không tồn tại!",
    });
  }

  try {
    await menuService.updateDish(dishId, { name, category });
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error });
  }
}
async function deleleDish(req, res) {
  const { dishId } = req.query;

  if (isEmpty(dishId) || !isNumber(dishId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Mã món ăn không hợp lệ!",
    });
  }

  try {
    await menuService.deleteDish(dishId);
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error });
  }
}
async function searchDish(req, res) {
  const { searchText, limit, offset } = req.query;
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

  const dbResponse = await menuService.searchDish(searchText, limit, offset);

  const countResponse = await menuService.countDishWithSearch(searchText);

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: { dishes: dbResponse || [], count: countResponse || 0 },
  });
}
async function updateMenu(req, res) {
  const { mealMenuId } = req.query;

  const { dishesToDelete, dishesToAdd } = req.body;

  try {
    for (let index = 0; index < dishesToAdd.length; index++) {
      const element = dishesToAdd[index];
      await menuService.createDetailMenu(element.id, mealMenuId);
    }

    for (let index = 0; index < dishesToDelete.length; index++) {
      const element = dishesToDelete[index];

      await menuService.deleteDetailMenu(mealMenuId, element.dish_id);
    }

    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error });
  }
}

async function createMenuByClassId(req, res) {
  const { classId } = req.query;

  const { date, mealId, dishes, createBy, dailyMenuId, mealMenuId } = req.body;

  console.log(dishes, date, mealId, createBy, dailyMenuId, mealMenuId);

  //Kiểm tra định dạng dữ liệu
  if (isEmpty(classId) || !isNumber(classId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "classId phải là số!",
    });
  }

  //Kiểm tra danh sách món ăn được thêm vào
  if (typeof dishes != "object" || dishes.length == 0) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "dishes phải có dạng danh sách!",
    });
  }

  if (isEmpty(dishes) || dishes.length == 0) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Vui lòng thêm món ăn để tạo menu",
    });
  }

  ///Kiểm tra tồn tại lớp học
  const isExistClass = await ClassService.isExistClass(classId);

  if (!isExistClass) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Lớp không tồn tại!",
    });
  }

  const isExistCreator = await AccountService.isExitAccountById(createBy);

  if (!isExistCreator) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "User tạo không tồn tại",
    });
  }

  if (isEmpty(dailyMenuId)) {
    try {
      if (!isValidDate(date)) {
        return Response.sendErrorResponse({
          res,
          statusCode: 400,
          error: "date phải có định dạng YYYY-MM-DD",
        });
      }

      const isExitMeal = await menuService.isExistMeal(mealId);

      if (!isExitMeal) {
        return Response.sendErrorResponse({
          res,
          statusCode: 404,
          error: "Bữa ăn không tồn tại!",
        });
      }

      for (let index = 0; index < dishes.length; index++) {
        const element = dishes[index];
        const isExistDish = await menuService.isExistDish(element.id);

        if (!isExistDish) {
          return Response.sendErrorResponse({
            res,
            statusCode: 404,
            error: `Món ${element.name} không tồn tại!`,
          });
        }
      }

      const resultCreateDaiyMenu = await menuService.createDailyMenu({
        date: date,
        created_by: createBy,
        class_id: classId,
      });

      const isExistDailyMenu = await menuService.isExistDailyMenu(
        resultCreateDaiyMenu
      );

      if (!isExistDailyMenu) {
        return Response.sendErrorResponse({
          res,
          statusCode: 400,
          error: `Tạo thất bại!`,
        });
      }

      const resultCreateMealMenu = await menuService.createMealMenu(
        mealId,
        resultCreateDaiyMenu
      );

      const isExistMealMenu = await menuService.isExistMealMenu(
        resultCreateMealMenu
      );

      if (!isExistMealMenu) {
        return Response.sendErrorResponse({
          res,
          statusCode: 400,
          error: `Tạo thất bại!`,
        });
      }

      for (let index = 0; index < dishes.length; index++) {
        const element = dishes[index];

        console.log(element);

        await menuService.createDetailMenu(element.id, resultCreateMealMenu);
      }

      return Response.sendResponse({
        res,
        statusCode: 200,
      });
    } catch (error) {
      return Response.sendErrorResponse({
        res,
        statusCode: 400,
        error: error,
      });
    }
  }

  if (!isEmpty(dailyMenuId)) {
    //Kiểm tra
    const dailyMenu = await menuService.getDailyMenuByDateAndClassId(
      classId,
      date
    );
    if (!dailyMenu) {
      return Response.sendErrorResponse({
        res,
        statusCode: 400,
        error: "Thất bại",
      });
    }

    try {
      const resultCreateMealMenu = await menuService.createMealMenu(
        mealId,
        dailyMenuId
      );

      const isExistMealMenu = await menuService.isExistMealMenu(
        resultCreateMealMenu
      );

      if (!isExistMealMenu) {
        return Response.sendErrorResponse({
          res,
          statusCode: 400,
          error: `Tạo thất bại!`,
        });
      }

      for (let index = 0; index < dishes.length; index++) {
        const element = dishes[index];

        console.log(element);

        await menuService.createDetailMenu(element.id, resultCreateMealMenu);
      }

      return Response.sendResponse({
        res,
        statusCode: 200,
      });
    } catch (error) {
      return Response.sendErrorResponse({
        res,
        statusCode: 400,
        error: error,
      });
    }
  }
}

async function getMenuByClassId(req, res) {
  const { classId, startDate, endDate } = req.query;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Ngày không hợp lệ!",
    });
  }

  //Kiểm tra định dạng dữ liệu
  if (isEmpty(classId) || !isNumber(classId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "classId phải là số!",
    });
  }

  ///Kiểm tra tồn tại lớp học
  const isExistClass = await ClassService.isExistClass(classId);

  if (!isExistClass) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Lớp không tồn tại!",
    });
  }

  const result = await menuService.getMenuByClassId(
    classId,
    startDate,
    endDate
  );

  Response.sendResponse({ res, statusCode: 200, responseBody: result || [] });
}

async function addDish(req, res) {
  const { dishName, category, description, create_by } = req.body;

  if (isEmpty(dishName) || isEmpty(category) || isEmpty(create_by)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Vui lòng nhập các giá trị dishNamedishName, category, create_by",
    });
  }

  if (!isNumber(create_by)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "create_by phải là số!",
    });
  }
  if (!isNumber(category)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "category phải là số!",
    });
  }

  // Kiểm tra account có tồn tại khong
  const isExistCreator = await AccountService.isExitAccountById(create_by);

  if (!isExistCreator) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Account không tồn tại",
    });
  }

  const result = await menuService.createDish({
    name: dishName,
    category: category,
    created_by: create_by,
  });

  if (!result) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Thất bại",
    });
  }

  return Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: result,
  });
}

async function addMeal(req, res) {
  const { meal, start_time, end_time, create_by } = req.body;

  if (
    isEmpty(meal) ||
    isEmpty(start_time) ||
    isEmpty(end_time) ||
    isEmpty(create_by)
  ) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Vui lòng nhập các giá trị meal, start_time, end_time, create_by",
    });
  }

  if (!isValidTime(start_time) || !isValidTime(end_time)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "start_time, end_time không đúng định dạng",
    });
  }

  if (!isNumber(create_by)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "create_by phải là số!",
    });
  }

  // Kiểm tra account có tồn tại khong
  const isExistCreator = await AccountService.isExitAccountById(create_by);

  if (!isExistCreator) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Account không tồn tại",
    });
  }

  const result = await menuService.createMeal({
    meal: meal,
    start_time: start_time,
    end_time: end_time,
    created_by: create_by,
  });

  if (!result) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Thất bại",
    });
  }

  return Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: result,
  });
}
async function getMeals(req, res) {
  const result = await menuService.getMeals();

  Response.sendResponse({ res, statusCode: 200, responseBody: result || [] });
}

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

  const countResponse = await menuService.countDishes();

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: { dishes: dbResponse || [], count: countResponse || 0 },
  });
}
async function getWeeklyMenuById(req, res) {
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
