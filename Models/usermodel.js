const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

const {Schema}=mongoose

const userscehma=new Schema ({
    name:{type:String},
    email:{type:String},
    password:{type:String,required:true,select: false}
    },{timestamps:true})

    userscehma.pre('save' , async function(next){
    if (!this.isModified('password')) return next(); // <-- yeh line fix hai
    if (!this.password) return next(new Error('Password is required'));
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userscehma.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// JWT method (example)
userscehma.methods.generatejwtToken = function() {
  // ...your JWT logic...
};

    const userModel=mongoose.model('User',userscehma)

module.exports=userModel