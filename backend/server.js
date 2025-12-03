import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// connect db

// middleware
app.use(cors(
  {
    origin:"http://localhost:5173"
  }
));
app.use(express.json());
app.use(rateLimiter);


// routes
app.use("/api/notes", notesRoutes);

app.get('/',(req,res)=>{
  res.json({message:"hello"});
}
);

connectDB().then( ()=>{
    app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});

})


