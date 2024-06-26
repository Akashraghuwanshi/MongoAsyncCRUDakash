const  User = require('../model/User');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin =async(req,res)=>{
    const {user,pwd} =req.body;
    // console.log(user,pwd);
   if(!user || !pwd){
        return res.status(400).json({"message":"Username and password required"});
      }
    const foundUser = await User.findOne({username:user}).exec();
    if(!foundUser){
        return res.sendStatus(401);//unauthorized
    }
     //evaluate password
 const match = await bcrypt.compare(pwd,foundUser.password);
 if(match){
    const roles = Object.values(foundUser.roles);
    //  console.log(roles);//array of roles values
    
    //Access Token  
    const accessToken = jwt.sign(
        { //payload
            "UserInfo": {"username":foundUser.username,
                          "roles":roles  }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'}
         
    );
    //Refresh Token 
    const refreshToken = jwt.sign(
        {"username":foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
         
    ); 
     //saving Refresh Token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

   res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:"none",maxAge:24*60*60*1000});//secure:true, In production we want it backin there becoz we work with chrome. But right here we are checking it with thunderClient at development level we don't require this 

    res.json({accessToken})
 }
    else {
         res.sendStatus(401);
    }
}

module.exports ={handleLogin};