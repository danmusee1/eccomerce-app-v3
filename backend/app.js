const express = require("express");
const app= express();
const errorMiddleware= require("./middleware/error")
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser())

//Route imports
const product= require("./routes/productRoute");
const user= require("./routes/userRoute");
app.use("/api/v1",product);
//route import-user
app.use("/api/v1", user)
//Midleware for erros
app.use(errorMiddleware);
module.exports=app;