const Users = require('../model/User');

/* GET all Users */

const getAllUsers  = async(req,res)=>{
    const users = await Users.find();
    if(!users){
        return res.status(204).json({"message":"No Users found in my DataBase"})
    }
    res.json(users);
}

/* Delete user */
const deleteUser = async(req,res)=>{

    if(!req?.body?.id){
        return res.status(400).json({"message":"User Id required"});
    }

    const user = await Users.findOne({_id:req.body.id}).exec();

    if(!user){
        return res.status(204).json({"message":`No User matches Id ${req.body.id}`});
    }

    const result = await user.deleteOne({_id:req.body.id});
    res.json(result);
}

module.exports = {
    getAllUsers,
    deleteUser
}
    