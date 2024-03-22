const  User = require('../model/User');
const handleLogout =async(req,res)=>{

const cookies = req.cookies;
   if(!cookies?.jwt){
    return res.status(204);//No content to send back
   }

const refreshToken = cookies.jwt;

//is refreshToken in DataBase ?? 

const foundUser = await User.findOne({refreshToken}).exec();

if(!foundUser){
 res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000});
 return res.sendStatus(204);//no content
   
}
//Delete refreshToken in DataBase
foundUser.refreshToken ='';
const result =await foundUser.save();
console.log(result);

 res.clearCookie('jwt',{httpOnly:true,sameSite:"none"}) //secure:true

res.sendStatus(204);//all is well but we have no content to send back
}

module.exports = {handleLogout}

 //note:- Note here for Front-end  if you are doing fullstack development like => ON client,  also delete the accessToken from the memory of the clientApplication ,we are doing this here in the backend 

    // if we reach this point that means we did find the same refreshToken inthe DataBase .So,now we need to delete the refresh token in the dataBase right here.And  we are using MongoDB or postgres at this point. 

 //IN production both when we send the cookie and when we delete the cookie you also want to add the flag secure:true ,that will make it only serves on https .We are just using dev server that uses http  but you want a secure connection with https .We don't add this in development but we would add in production in the option of secure and set that to true