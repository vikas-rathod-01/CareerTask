const User = require("../../models/User");
const Role = require("../../models/Role");

module.exports = async (req, res) => {
  try {
    let { name } = req.body;
    let id = req.query.id
    
    if (!name) {
      return res.status(400).json({message: "Name is required"});
    }
    const isValid = name === 'USER' || name === 'ADMIN' ; 
    if(!isValid) {return  res.status(401).json({ message: `name should be either ADMIN or USER` });}

    let role = await Role.findById(id).select("+name");
    if (!role) return res.status(404).json({ message: "role Not found" });

    if (role.name===name) return res.status(401).json({ message: `id is already ${name}` });

    role.name = name;
    await role.save();
   
    return res.status(200).json({ message: "updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Oops, Something went wrong. please try again later",
    });
  }
};
