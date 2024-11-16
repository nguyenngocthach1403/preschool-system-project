const sendResponse = ({
  res,
  statusCode = 200,
  message = "success",
  responseBody,
}) => {
  res.status(statusCode).send({
    data: responseBody,
    status: true,
    message,
  });
};

const sendErrorResponse = ({
  res,
  statusCode = 500,
  message = "error",
  error,
  responseBody,
}) => {
  res.status(statusCode).send({
    data: responseBody,
    status: false,
    message,
    error,
  });
};

module.exports = { sendErrorResponse, sendResponse };
