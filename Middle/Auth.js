const jwt =require('jsonwebtoken')


const isLoggedIn=async (req,res,next)=>{

    const {token}=req.cookies

    if(!token){
        return res.status(400).json({
        success:true,
        message:'token not found'
   })
    }

    const userDetails=await jwt.verify(token,process.env.SECRET)

    req.user=userDetails

    next()

}

module.exports={
    isLoggedIn
}