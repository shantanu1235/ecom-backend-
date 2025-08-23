const mongoose =require ('mongoose')

const {Schema}=mongoose 

const aboutschema=new Schema({
    image:{
        type:String
    },
    bgcolor:{
            type:String,
            required:true
    },
    title:{
            type:String,
            required:[true, 'Title is required'],
            maxlngth:[100, 'Title cannot exceed 100 characters'],
            minlngth:[3, 'Title must be at least 5 characters'],
            trim:true
    },
       heading:{
           type:String,
            required:[true, 'Heading is required'],
            maxlngth:[50, 'Heading cannot exceed 30 characters'],
            minlngth:[3, 'Heading must be at least 5 characters'],
            trim:true
    },
            subheading:{
            type:String,
            required:[true, 'Subheading is required'],
            maxlngth:[50, 'Subheading cannot exceed 50 characters'],
            minlngth:[3, 'Subheading must be at least 10 characters'],
            trim:true
        },


  
},{timestamps:true})

const  aboutModel=mongoose.model("About",aboutschema)

module.exports=aboutModel