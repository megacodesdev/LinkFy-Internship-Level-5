const express=require("express");
const cors=require("cors");
const app=express();
const port=6000;
const mysql=require("mysql2");

//moddle ware
app.use(cors());
app.use(express.json());

//connectivity
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"join"
});
//crude
app.get("/",(req,res)=>{
    console.log("connection is successfuy")
});
//post
app.post("/api/:id",(req,res)=>{
    const {id}=req.params
    const{username,email,password}=req.body
    const query="INSERT INTO etude(username,email,password,id) VALUES(?,?,?,?)"
    db.query=(query,[username,email,password,id],(err,result)=>{
        if (err){
            console.log("faild")
            
        
        
        }else{
            console.log("user inserted");
            res.send(result)
            
        }
    })
})

//login
app.post("/api/login",(res,req)=>{
    const {username,password} = req.body
    const query = "SELECT * FROM etude WHERE username=?,password=?";
    db.query =(query,[username,password],(err,result)=>{
        if(err){
            console.log("Failed to login");
            
        }
        else{
            console.log("login successful");
            res.send(result);
            
        }
        if(result.length>0){
            console.log("login");
            res.send(result);
            
        }
    })
})

//put
app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params
    const {username,email,password}=req.body
    const query= "UPDATE etude SET username=?,email=?,password=? WHERE id=?"
    db.query = (query,[username,email,password],(err,result)=>{
        if(err){
            console.log("user not updated");
            
        }
        else{
            console.log("user updated");
            res.send(result);
            
        }
    })
})

//delete

app.delete("/api/delete/:id",(req,res)=>{
    const {id} = req.params
    const query = "DELETE FROM etude WHERE id=?";
    db. query = (query,[id],(err,result)=>{
        if(err){
            console.log("Failed to delete user");
            
        }
        else{
            console.log("user deleted");
            res.send(result)
            
        }
    })
})






app.listen(port,()=>{
    console.log(`sever is running on port${port}`)
});
