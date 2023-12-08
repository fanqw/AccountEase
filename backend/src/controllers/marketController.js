const Market = require('@/models/market')
const { formatterFields } = require('@/utils/common')

async function findOne(req, res) {
  const { id } = req.query;
  try {
    const market = await Market.findOne({
      _id: id,
      deleted: false,
    })
    if (market) {
      res.status(200).json({
        code: 0,
        data: formatterFields(market.toObject()),
        msg: ''
      })
    } else {
      res.status(200).json({
        code: -1,
        data: null,
        msg: '未找到对应信息'
      })
    }
  } catch (error) {
    res.status(500).json({
      code: -1,
      data: null,
      msg: error.message
    })
  }
}

async function findAll(req, res) {
  const current = parseInt(req.query.current || 1, 10);
  const pageSize = parseInt(req.query.pageSize || 10, 10);
  const search = req.query.search ? req.query.search.trim() : '';
  try {
    const match = {
      deleted: false
    }
    if (search !== '') {
      match.name = { $regex: search, $options: 'i' }
    }
    const pipeline = [
      { $match: match },
      // 排序
      { $sort: { create_at: -1 } },
      // 分页
      { $skip: (current - 1) * pageSize },
      { $limit: pageSize }
    ];
    // 执行聚合查询，获取当前页的数据
    const list = await Market.aggregate(pipeline);

    // 计算匹配搜索条件的总数
    const totalPipeline = [{ $match: match }, { $count: 'total' }];

    const totalResult = await Market.aggregate(totalPipeline);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;
    res.status(200).json({
      code: 0,
      data: {
        current,
        pageSize,
        total,
        list: list.map(formatterFields),
      },
      msg: ''
    })
  } catch (error) {
    res.status(500).json({
      code: -1,
      data: null,
      msg: error.message
    })
  }
}

async function create(req, res) {
  const { name, manager, mobile, address, location } = req.body;
  try {
    const existingMarket = await Market.findOne({ name, deleted: false })
    if (existingMarket) {
      return res.status(200).json({
        code: -1,
        data: null,
        msg: '市场名称已存在'
      })
    }
    const market = new Market({
      name,
      manager,
      mobile,
      address,
      location: Array.isArray(location) ? { type: "Point", coordinates: location } : null
    })
    await market.save()
    res.status(200).json({
      code: 0,
      data: formatterFields(market.toObject()),
      msg: ''
    })
  } catch (error) {
    res.status(500).json({
      code: -1,
      data: null,
      msg: error.message
    })
  }
}

async function update() {

}

async function remove() {

}

module.exports = {
  findOne,
  findAll,
  create,
  update,
  remove
}