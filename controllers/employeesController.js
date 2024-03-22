
const  Employee = require('../model/Employee')

    
     /* get all employees */
const getAllEmployees= async (req,res)=>{
    const employees = await Employee.find();
    if(!employees){
        return res.status(204).json({"message":"No employees found"})
    }
    res.json(employees);
}
      /* create New Employee */
const createNewEmployee =async(req,res)=>{
     if(!req?.body?.firstname || !req?.body?.lastname || !req?.body?.city ||!req?.body?.MobileNumber){
        return res.status(400).json({"message":"Firstname,Lastname,City and MobileNumber are required"})
     }

    try {
         const result = await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            city:req.body.city,
            MobileNumber:req.body.MobileNumber
         });
         res.status(201).json({result});


    } catch (error) {

        console.error(error);
    }
}
   
                 /* Update Employee function */
const updateEmployee =async(req,res)=>{
  
  if(!req?.body?.id){
    return res.status(400).json({"message":"Id parameter is required."})
  }

  const employee = await Employee.findOne({_id:req.body.id}).exec();
//remember MongoDB uses an underScoreid(_id) it automatically generates that.

   if(!employee){
    return res.status(204).json({"message":`NO employee matches id ${req.body.id}`});
   }
   if(req.body?.firstname){
    employee.firstname = req.body.firstname;
   }
   if(req.body?.lastname){
    employee.lastname = req.body.lastname;
   }
   if(req.body?.city){
    employee.city = req.body.city;
   }
   if(req.body?.MobileNumber){
    employee.MobileNumber = req.body.MobileNumber;
   }
    
 const result =await employee.save()
 res.json(result);
} 
 
   
         /* delete employee function */

const deleteEmployee = async(req,res)=>{
   
    if(!req?.body?.id){
        return res.status(400).json({"message":"Employee Id required"});
    }

    const employee = await Employee.findOne({_id:req.body.id}).exec();

    if(!employee){
        return res.status(204).json({"message":`No employee matches Id ${req.body.id}`})
    }
    
    const result = await employee.deleteOne({_id:req.body.id});
    res.json(result);
    //we are not putting .exec() here it is just all based on the documents.So, once again look at Mongoosejs.com  those docs and You will get to know in which different methods you need to put that after and which one you don't.
}

           /* getting employee with there params id that we get from the  url in the route  */
    
const getEmployee = async(req,res)=>{
    if(!req?.params?.id){
  return res.status(204).json({"message":`Employee Id required`})
    }
    const employee = await Employee.findOne({_id:req.params.id}).exec();

    if(!employee){
        return res.status(204).json({"message":`NO employee Id matches ${req.params.id}`})
    }
    
    res.json(employee);
}

module.exports ={
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}

//get employee  and of course this is handling a request for the data of just one employee 
    //fetching parameter from url 