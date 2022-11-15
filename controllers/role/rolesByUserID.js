const User = require("../../models/User");
const Role = require("../../models/Role");

module.exports=async (req,res)=>{
try{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  

    const id=req.query.id
    console.log(id)
    let data=await User.aggregate([{
      $lookup:{from:'roles',
      localField:'roleID',
      foreignField:'_id',
      as:"Created Roles "

    }},
    { $skip :startIndex },
    { $limit :limit }
  ])
  let  results=data.filter((key)=>{
    return key._id==id
  })
  


    return res.status(200).json({results});
} catch (error) {
  console.error({ error });
  return res.status(500).json({
    error: error.message,
  });
}


}
