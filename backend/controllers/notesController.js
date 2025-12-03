import Note from "../models/Note.js";

export const getAllNotes = async (req,res) =>{

    try {
        
        const notes = await Note.find().sort({createAt:-1});
 
        res.status(200).json({
            success:true,
            message:"fetched  data successfully",
            notes,
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            success:false,
            message:"internal server error ",
        })
        
    }
} 

export const  createNote = async (req,res) => {
        
     try {
       
     
       const  {title,content} = req.body;

       if(!title || !content){
       
        return res.status(403).json({
            success:false,
            message:"All fields required",
        })
    }
        
    
       
    const newNote = await Note.create({
        title,content
     }) ;

     return res.status(200).json({
        success:true,
        message:"Entry created in DB",
        newNote,
     });
   
        
     } 
     catch (error) {

        console.log(error);

        return res.status(500).json({
                
            success:false,
            message:"Internal Server error ",
        });
        
     }


}

export const getNote = async (req,res) =>{

    try {

        const getNote = await Note.findById(req.params.id);

        if(!getNote) return res.status(404).json({message:"Note not found"});

        return res.status(200).json({
            success:true,
            data:getNote,
            message:"Note fetched successfully"
        })
        
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success:false,
            message:"Error in fetching Note"
         })
        

        
    }
}

export const updateNote = async (req,res) =>{


    try {
        const {title,content} = req.body;

     const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {new:true}
     );
     
     if(!updatedNote) return res.status(404).json({message:"Note not found"});
      return res.status(200).json({
        success:true,
        data:updatedNote,
        message:"Note updated succesfully",
      })
        
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success:false,
            message:"Error in update Note"
         })
        
    }
      
      




}


export const deleteNote = async (req,res) =>{


    try {


       const deleteNote = await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Note deleted succesfully",
        })
        
    } catch (error) {

         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Error in deleting  Note"
         })
        
    }

}

