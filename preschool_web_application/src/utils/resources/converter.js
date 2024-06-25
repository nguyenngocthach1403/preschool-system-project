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

export {
  convertRegisterStatus,
  convertParentRole,
  convertAccountRole,
  convertStudentStatus,
  convertGender,
};
