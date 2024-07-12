import VueJwtDecode from "vue-jwt-decode";

/**
 * Phương thức kiểm tra để lấy người dùng hiện tại
 * @returns {Object} currun User
 */
const isUser = () => {
  let token = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    token = window.user;
  }

  try {
    let decode = VueJwtDecode.decode(token);

    return decode;
  } catch (error) {
    return undefined;
  }
};

const getToken = () => {
  let token = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    token = window.user;
  }

  return token;
};

export { isUser, getToken };
