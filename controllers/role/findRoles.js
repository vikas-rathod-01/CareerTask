const Role = require("../../models/Role");
const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    let results = {};
  
    results = await Role.find().limit(limit).skip(startIndex);
    return res.status(200).json({ results });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      error: error.message,
    });
  }
};
