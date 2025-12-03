import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import Ratelimiting from '../components/Ratelimiting.jsx';
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
// import api from '../lib/axios.js';
import api from "../lib/axios";


import toast from "react-hot-toast";

 const HomePage = () => {
   
  const [rateLimited,setRateLimited] = useState(false);
  const [notes,setNotes]=useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect ( () => {
    const fetchNotes = async () =>{
      try {
        const  res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data.notes);
        setRateLimited(false);
      } 
      catch (error) {
        console.log("error fetching data");
        console.log(error.response);
        if(error.response?.status === 429){
          setRateLimited(true);
        }
        else{
          toast.error("failed to load notes ")
        }
        
      }
      finally{
          setLoading(false);
      }
    }

    fetchNotes(); //call api
   },[]);

  return (
    <div className='min-h-screen'>
    <Navbar/>


    
    {rateLimited && <Ratelimiting/>}

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        
      {notes.length === 0 && !rateLimited && <NotesNotFound/>} 
      {notes.length > 0 && !rateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
         
         {notes.map((note) => (
          <NoteCard key={note._id} note={note} setNotes={setNotes}/>
         ))}

        </div>
      )}
    </div>
    </div>
  )
}

export default HomePage;
