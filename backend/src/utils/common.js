const dayjs = require("dayjs");

// 格式化mongo 查询的字段
const formatterFields = (origin) => {
  console.log('origin', origin);
  const target = {};
  Object.keys(origin).forEach(key => {
    const value = origin[key];
    switch (key) {
      case '_id':
        target.id = value;
        break;
      case 'create_at':
      case 'update_at':
        target[key] = value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null;
        break;
      case '__v':
      case 'deleted':
        // 不做任何处理
        break;
      case 'location':
        target[key] = value?.coordinates || null;
        break;
      default:
        target[key] = value;
        break;
    }
  });
  return target;
};


module.exports = {
  formatterFields
}