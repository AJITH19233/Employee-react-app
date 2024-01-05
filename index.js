const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;
const Employee=require("./Models/Employeemodel");
const path = require('path');
app.use(express.static(path.join(__dirname,'/build'))); 

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);


app.get("/api/get",async(req,res)=>{
  const data = await Employee.find({})
  res.json({success : true , data : data})
})  


//create data || save data in mongodb
//http://localhost:8080/create
/*
{
  name,
  email,
  mobile
}
*/
app.post("/api/create",async(req,res)=>{
  console.log(req.body)
  const data = new Employee(req.body)
  await data.save()
  res.send({success : true, message : "data save successfully" , data : data})
})

//update data 
// http://localhost:8080/update
/**
*  {
*      id :"",
*      name : "",
*      email : "",
*       moible : ""
* }
*/

app.put("/api/update",async(req,res)=>{
  console.log(req.body)
  const { _id,...rest} = req.body 

  console.log(rest)
  const data = await Employee.updateOne({ _id : _id},rest)
  res.send({success : true, message : "data update successfully", data : data})
})

//delete api
// http://localhost:8080/delete/id
app.delete("/api/delete/:id",async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const data = await Employee.deleteOne({_id : id})
  res.send({success : true, message : "data delete successfully", data : data})
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});