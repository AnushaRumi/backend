const bcrypt=require("bcryptjs");
const User=require("../models/User");

exports.signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
            message: 'User already Exists', //  Correct
     });
        
        }
            let hashedPassword;
            try{
                hashedPassword=await bcrypt.hash(password,10);

            }
            catch(err){
                return res.status(500).json({
                    success:false,
                    message:'Error in hashing Password'
                });
            }

            const user=await User.create({
                name,email,paswsword:hashedPassword,role
            })

            return res.status(200).json({
                success:true,
                message:"User Created Successfully",
            });
       
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,plz try again later"
        
        })

    }
}