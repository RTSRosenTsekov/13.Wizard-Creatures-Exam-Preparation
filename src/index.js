const express = require("express");
const path = require("path");
const app = express();
const {PORT} = require("./constants");

// Да зареди CSS 
app.use(express.static(path.resolve(__dirname, "./public")));
// Да може да четем данни от body
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.send("Hello home page!")
});

app.listen(PORT, ()=> console.log(`Server is listening on port: ${PORT}`));