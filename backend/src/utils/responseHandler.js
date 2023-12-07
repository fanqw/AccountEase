function sendResponse({ res, code, data, msg }) {
  return res.status(code).json({
    code: code === 200 ? 0 : -1,
    data,
    msg
  });
}

module.exports = { sendResponse };
