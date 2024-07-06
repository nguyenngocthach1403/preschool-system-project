/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};
/**
 * Phương thức kiểm tra gia trị thời gian
 * @param {String} timeStr
 * @returns {Boolean} True đúng định or False là sai định dạng
 */
const isValidTime = (timeStr) => {
  const pattern = /^([01]?\d|2[0-3]):[0-5]\d$/;

  return pattern.test(timeStr);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
  if (password.length <= 5 || password === "") {
    return false;
  }
  return true;
};
/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
  return false;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const empty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
};
// /**
//  * comparePassword
//  * @param {string} hashPassword
//  * @param {string} password
//  * @returns {Boolean} return True or False
//  */
// const comparePassword = (hashedPassword, password) =>
//   bcrypt.compareSync(password, hashedPassword);

/**
 * is number method
 * @param {string} number
 * @returns {Boolean} True or False
 */
const isNumber = (number) => {
  if (typeof number !== "number" && Number.isNaN(parseInt(number))) {
    return false;
  }
  return true;
};

/**
 * Phương thức kiểm tra kiểu dữ liệu ngày YYYY-MM-DD
 * @param {string} dateStr
 * @returns True là hợp lệ or False là không hợp lệ
 */
const isValidDate = (dateStr) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateStr);
};

module.exports = {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  isNumber,
  isValidTime,
  isValidDate,
  //   comparePassword,
};
