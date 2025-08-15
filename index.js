const express=require("express");
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/database").connect();

const user=require("./routes/user");
app.use("/api/v1",user);

//activate
app.listen(PORT,()=>{
    console.log(`App is Listening at ${PORT}`)
})