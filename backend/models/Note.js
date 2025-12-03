import mongoose  from "mongoose";

// create scehma 

const nodeSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,

    },
    content:{
        type:String,
        required:true,
    },
    
},
 {timestamps:true} // created at updated at

 
);

const Note = mongoose.model("Note",nodeSchema);
export default Note;