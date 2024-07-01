function isEmpty(value) {
  if (value == undefined || value == null || value == "") return true;
  return false;
}

function isNumber(number) {
  if (typeof number !== "number" && Number.isNaN(parseInt(number))) {
    return false;
  }
  return true;
}

function isNotValidDate(dateString) {
  // Kiểm tra chuỗi có định dạng yyyy-mm-dd
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return true; // Không đúng định dạng ngày
  }

  // Kiểm tra chuỗi có phải là ngày hợp lệ
  const date = new Date(dateString);
  const timestamp = date.getTime();
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return true; // Không phải là ngày hợp lệ
  }

  // Kiểm tra tính hợp lệ của ngày
  const [year, month, day] = dateString.split("-").map(Number);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return true; // Ngày không hợp lệ
  }

  return false; // Là ngày hợp lệ và đúng định dạng
}
module.exports = {
  isEmpty,
  isNumber,
  isNotValidDate,
};
