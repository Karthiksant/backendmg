console.log('hello there ...! ');

const express=require("express");
const mongoose = require('mongoose');

const app=express();
const PORT = 5000;
const cors=require("cors");

app.use(cors( ));
app.use(express.json());
// db.connection

require('dotenv').config();
mongoose.connect(process.env.mongoAtlasURL).then(()=> {
//mongoose.connect('mongodb+srv://karthikgammath13:karthIK1011SAnt@cluster0.urezgtz.mongodb.net/mern_crud').then(()=> {
//mongoose.connect('mongodb://127.0.0.1:27017/crud').then(()=> {
  console.log('db connected successfully...!')
}).catch((error)=>{
  console.log(error);
})

// create Schema
const userSchema=new  mongoose.Schema({
        name:{
          type: String,
          required: true,
        },
        email:{
          type: String,
          required: true,
        },
        password:{
          type: String,
          required: true,
        },
},{ timestamps : true})

const User=mongoose.model("User",userSchema);

// create user
app.post("/createuser", async (req,res)=>{
  try {
    const bodyData=req.body;
    const user=new User(bodyData);
    const userData=await user.save();

    res.send(userData);

  } catch (error) {
    res.send(error);
  }
});
// read all user

app.get("/getallusers", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// getOne User
app.get("/getoneuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update user

app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.get("/",(req,res)=>{
      res.send(" im routingg...! ")
});

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
});


