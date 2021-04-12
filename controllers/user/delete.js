const User = require("../../model/User");
var CustomError = require("../../error/customError");

exports.userDelete = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  try {
    await User.deleteOne({ email:email }, (err, doc) => {
        if(err)
        throw err;
      return res.status(200).send({message:"Document Deleted Successfully! 🤸‍♂️"});
    });
  } catch (e) {
    console.error(e);
    let error = new CustomError("Failed to delete user", 400);
    return res.status(400).send(error);
  }
};
