const express=require("express");
const coer=require("cors");
const mysql=require("mysql2");
const port=5000;
const app= express();

//middle ware
app.use(cors());
app.use(express.json());

//connectivit

db =mysql.createConnection({
    host:"locolhost",
    user:"root",
    password:"",
    database:"megdata"

});
if(db){
    console.log("connection is successful!!!!")
}else{
    console.log("connection is failed!!!")
}


app.listen(5000, () =>{
console.log("application is running on port 500")
})
app.post('/api/post',(req,res) =>{

    const {email,password} =req.body;
    const query= "INSERT INTO etude (username, email,password)";

    db.query(query, [email,password], (err,result) =>{
        if(err){
            console.log("post oready fail");
        }else{
            console.log("insert successfuly");
        }
    })
})
//put
app.put("/api/connection/:id",(req,res)=>{
    const{id}=req.params
    const{email,password}=req.body
    const query ="UPDATE megdata SET email=? ,password=?, WHERE id =?";
    db.query(query,[email ,password,id],(err,result)=>{
        if(err){
            console.log("update is successful!!!!!")
        }else{
            console.log("update is faild!!!!")
        }
    })
    

})
//delet
app.delete("/api/delet/:id",(req,res) =>{
    const {id}=req.params
    const query ="DELETE FROM megdata WHERE id=?"
    db.query(query,[id],(err,result)=>{
        if( err){
            console.log("delet is successful!!!")
        }else{
            console.log("deletr id faild ");
            
        }

    })

}
)




    
    
  












