

// ============          input Parameter  JWT Key, role Name (USER /ADMIN ) it should be in capital

const Role = require("../../models/Role");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { name  } = req.body;
    if (!name) return res.status(400).json({message: "Name is required"});
    
    const isValid = name === 'USER' || name === 'ADMIN' ; 
    if(!isValid) {return  res.status(401).json({ message: `name should be either ADMIN or USER` });}
     
    const user = await User.findById(req.userId);

    if (!user) return res.status(403).json({ message: "Unauthorized" });

    const newRoleData = await new Role({
      name, 
      createdBy: req.userId,
    });

    const role = await newRoleData.save();
    if (!role._id) return res.status(400).json({ message: "Failed to Create Role" });

    user.roleID.push(role._id);
    await user.save();

    return res.status(201).json({ message: "Role Created Successfully...", id: role._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Opps, Something went wrong. Please try again later",
    });
  }
};
