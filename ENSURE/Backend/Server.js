const express=require("express");
const cors=require("cors");
const mysql=require("mysql2");

const port=5000;
const app=express();

//middleware
app.use(cors());
app.use(express.json());

//connectivity

const connection=mysql.createConnection({
 host:"localhost",
 user:"root",
 password:"ELSOFTMEGACODER30333el",
 database:"development", 
})

// CRUD
app.get("/",(req,res)=>{
  res.send("getting")
});

//CREATE
app.post("/api/create",async(req,res) => {
  const {username,email,password}=req.body

  //hashing

  try{

    //finding existing user
    
    const query="INSERT INTO hello(username,email,password) VALUES(?,?,?)"
    await connection.query(query, [username,email,password],(err)=>{
      if (err){
        console.log("failed to insert to user",err)
      }
    })
    res.status (201).json({message:"hello rubyogo"})
    console.log("new user created")
  } catch(err){
    console.log("err while rtying to add new user",err)
  }

  
});
  //update
  app.put("/api/update/:id",async(req,res)=>{
    const{username,email,password}=req.body
    const {id} = req.params
    try{
      const update = "UPDATE hello SET username=?, email=?, password=? WHERE id=?"
      await connection.query(update,[username,email,password],(err)=>{
        if(err){
          console.log("failed to update user")

        }
      })
      console.log("new user updated")

    }catch (err){
        console.log("err while trying to update new user,err")
      
    }
  })
  //delete
  app.get("/api/delete/:id",async(req,res)=>{
    try{
      const query="DELETE FROM hello WHERE id=?"
      await connection.query(query,(err)=>{
        if(err){
          console.log("failed to delete user")
        }
      })
      
    }catch(err){
      console.log("new user is deleted")
        console.log("err while delete user,err")
    }
  })
  






app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
});