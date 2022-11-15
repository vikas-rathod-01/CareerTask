
// list of users for a particular role  ( input Parameter  JWT Key, role Name (USER /ADMIN ) it should be in capital)  ============================

// === page and limit Parameter are Optional


const User = require("../../models/User");
const Role = require("../../models/Role");

module.exports=async (req,res)=>{
try{
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    
    const roleName=req.query.name
    let uid=await Role.aggregate([{
      $lookup:{from:'users',
      localField:'createdBy',
      foreignField:'_id',
      as:"Created by "

    }},
    {$match:{name:roleName}},
    { $skip :startIndex },
    { $limit :limit }
  ])

    return res.status(200).json({uid});
} catch (error) {
  console.error({ error });
  return res.status(500).json({
    error: error.message,
  });
}


}
