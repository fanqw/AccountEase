function sendResponse(res, code, data, message) {
  return res.status(code).json({ data, message });
}

module.exports = { sendResponse };
