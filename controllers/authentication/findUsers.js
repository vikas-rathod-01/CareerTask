 
/*
 ist of all users  ( no input require )
 list of users created at a particular date   ( only date parameter is Required     page ,limit  parameter is Optional )
 list of users created between 2 dates   (  startDate  and  endDate Require endDate Should be +1    )
*/
const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startDate=req.query.startDate
    const endDate=req.query.endDate
    const date=req.query.date

    const startIndex = (page - 1) * limit;
    let results = {};

    // user registered between 2 dates 
    if(startDate && endDate){
        results = await User.find({createdAt: { $gte:startDate,$lte:endDate }}).sort({ createdAt: 1 }).limit(limit).skip(startIndex);
    }
    // user registered on Particular Date
    else if(date){
        results = await User.find({createdAt:{$eq:date}}).sort({ createdAt: 1 }).limit(limit).skip(startIndex);

    }
    // get All Users 
    else{
        results = await User.find().sort({ createdAt: 1 }).limit(limit).skip(startIndex);

    }
    return res.status(200).json({ results  });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      error: error.message,
    });
  }
};