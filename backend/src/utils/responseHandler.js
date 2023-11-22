function sendResponse(res, code, message) {
  return res.status(code).json({ message });
}

module.exports = { sendResponse };
