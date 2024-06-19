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
module.exports = {
  isEmpty,
  isNumber,
};
