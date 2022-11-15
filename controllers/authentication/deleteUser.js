
// =========         JWT Key and id Parameter    =============

const Role = require("../../models/Role");
const User = require("../../models/User");
/* Delete User */
module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    await user.remove();

    return res.status(200).json({ message: "User Deleted Successfully..." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
