function convertRegisterStatus(params) {
  switch (params) {
    case 0:
      return "Đơn mới";
    case 1:
      return "Đã hẹn";
    case 2:
      return "Liên hệ lại";
    case 3:
      return "Đơn ảo";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Chờ hủy";
    default:
      return "none";
  }
}
function convertGender(gender) {
  switch (gender) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
  }
}

function convertParentRole(role) {
  switch (role) {
    case 0:
      return "Bố";
    case 1:
      return "Mẹ";
    case 2:
      return "Người giám hộ";
    default:
      return "None";
  }
}
/**
 * Phương thức chuyển loại món ăn thành chuỗi
 * @param {interger} category
 * @returns {String} String
 */
function convertFoodCategory(category) {
  switch (category) {
    case 1:
      return "Món nước";
    case 2:
      return "Nước";
    case 3:
      return "Món chiên";
    case 4:
      return "Cơm";
    case 5:
      return "Trái cây";
    case 6:
      return "Món luộc";
    case 7:
      return "Món mặn";
    default:
      return "None";
  }
}

function convertAccountRole(role) {
  switch (role) {
    case 1:
      return "Admin";
    case 2:
      return "Quản lý";

    case 3:
      return "Giáo viên";
    case 4:
      return "Phụ huynh";
    case 5:
      "Nhân viên";
  }
}
function convertStatusEvaluationForm(status) {
  switch (status) {
    case 0:
      return "Chờ đánh giá";
    case 1:
      return "Chờ duyệt";
    case 2:
      return "Hoàn thành";
  }
}

function convertStudentStatus(status) {
  switch (status) {
    case 0:
      return "Chờ xếp lớp";
    case 1:
      return "Đang học";
    case 2:
      return "Nghỉ";
    case 3:
      return "Tốt nghiệp";
  }
}

/**
 *  Phương thức kiểm tra trạng thái lớp
 * @param {Date} start_date
 * @param {Date} end_date
 * @return  {String} String
 */
function convertClassStatus(start_date, end_date) {
  if (new Date(start_date) > new Date()) {
    return "Sắp bắt đầu";
  } else if (new Date(end_date) < new Date()) {
    return "Kết thúc";
  } else {
    return "Đang hoạt động";
  }
}

export {
  convertRegisterStatus,
  convertParentRole,
  convertAccountRole,
  convertStudentStatus,
  convertGender,
  convertFoodCategory,
  convertClassStatus,
  convertStatusEvaluationForm,
};
