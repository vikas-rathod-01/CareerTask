
// ============          input Parameter  JWT Key, id( RoleId ) 


const Role = require("../../models/Role");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Unauthorized" });

    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "role Not found" });

    if (role.createdBy.toString() !== req.userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await role.remove();

    const index = user.roleID.indexOf(req.params.id);
    user.roleID.splice(index, 1);
    await user.save();

    return res.status(200).json({ message: "role Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
