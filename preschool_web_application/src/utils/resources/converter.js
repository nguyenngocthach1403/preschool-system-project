function convertRegisterStatus(params) {
  switch (params) {
    case 0:
      return "Đơn mới";
    case 1:
      return "Chờ duyệt";

    case 2:
      return "Chờ liên hệ";
    case 3:
      return "Đã liên hệ";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Hủy đơn";
    default:
      return "none";
  }
}

export { convertRegisterStatus };