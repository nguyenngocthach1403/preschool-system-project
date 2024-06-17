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

export { convertRegisterStatus, convertParentRole };
