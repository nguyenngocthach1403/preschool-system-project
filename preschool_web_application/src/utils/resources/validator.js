/**
 * Phương thức kiểm tra để lấy người dùng hiện tại
 * @returns {Object} currun User
 */
const isUser = () => {
  let user = localStorage.getItem("user");

  if (!user) {
    user = window.user;
  } else {
    user = JSON.parse(user);
  }

  return user;
};

export { isUser };
