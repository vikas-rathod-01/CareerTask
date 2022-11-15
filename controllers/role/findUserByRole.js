const User = require("../../models/User");
const Role = require("../../models/Role");

module.exports=async (req,res)=>{
try{
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    
    const roleName=req.query.name
    const id=req.query.id
    let uid
    uid=await Role.aggregate([{
      $lookup:{from:'users',
      localField:'createdBy',
      foreignField:'_id',
      as:"Created by "

    }},
    {$match:{name:roleName}},
    { $skip :startIndex },
    { $limit :limit }
  ])

  // .limit(limit).skip(startIndex);
  // {$match:{_id:id}}

    // const uuid=await User.find({roleID:[uid[new Object( _id)]]})  
    // console.log(uuid)
    return res.status(200).json({uid});
} catch (error) {
  console.error({ error });
  return res.status(500).json({
    error: error.message,
  });
}


}
