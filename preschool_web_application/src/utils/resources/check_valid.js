const REGEX_NAME = /[A-Za-z\W]+$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_PHONE = /^0\d{9}$/;

function nameStudentValid(text) {
  if (text.trim() === "") return "*Không được bỏ trống";
  if (!REGEX_NAME.exec(text.trim()))
    return "*Không được có chữ số hoặc ký tự đặc biệt";
  return "";
}
function birthdayStudentValid(date) {
  const birthday = new Date(date);

  const now = new Date();
  if (now < birthday) return "*Ngày sinh không hợp lệ!";
  return "";
}

function isEmpty(text) {
  if (text == "" || text == undefined || text == null) return true;
  return false;
}

function isEmailValid(email) {
  if (REGEX_EMAIL.exec(email)) return true;
  return false;
}

function isPhoneValid(phone) {
  if (REGEX_PHONE.exec(phone)) return true;
  return false;
}

/**
 * Phương thức kiểm tra quyền
 * @param {interger} role
 * @returns {Boolean} return True or False
 */
function checkPermissions(role) {
  if (role == 1 || role == 2) {
    return true;
  }

  return false;
}

/**
 * Phương thức kiểm tra gia trị thời gian
 * @param {String} timeStr
 * @returns {Boolean} True đúng định or False là sai định dạng
 */
const isValidTime = (timeStr) => {
  const pattern = /^([01]?\d|2[0-3]):[0-5]\d$/;

  return pattern.test(timeStr);
};

export {
  nameStudentValid,
  birthdayStudentValid,
  isEmpty,
  isEmailValid,
  isPhoneValid,
  isValidTime,
  checkPermissions,
};
