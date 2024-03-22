
const verifyRoles =(...allowedRoles)=>{

    return (req,res,next)=>{
        if(!req?.roles){
            return res.sendStatus(401);//unauthorized;
        }
             
        const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        // console.log(req.roles);
        const result = req.roles.map((role)=>rolesArray.includes(role)).find((val)=>val === true);
        //  console.log(result);
        if(!result){
            return res.status(401).json({"message":"Not have valid permissons"});//unauthorized
        }
        next();
    }

}

module.exports = verifyRoles;