
const User = require('../model/User');
const jwt  = require('jsonwebtoken');



const handleRefreshToken = async(req,res)=>{
    const cookies =req.cookies;
    if(!cookies?.jwt){
        return res.status(401).json({"message":"both cookies and jwt required"});//unauthorized
    }
    // console.log(cookies);
    const refreshToken = cookies.jwt;

    // console.log(users);
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){
        return res.status(401).json({"message":"User not found"});//forbidden
    }

    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username){
                return res.sendStatus(403)//forbidden{Either error occured while refresh token verification or foundUser.username !== decoded.username"};
            };
            const roles = Object.values(foundUser.roles);
        //   console.log(roles)
            const accessToken = jwt.sign(
                {//payload
                    "UserInfo":{"username":decoded.username,
                               "roles":roles }
               },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'10m'}
                );
                res.json({accessToken})
            }
        )

    }

    module.exports = {handleRefreshToken}
   



