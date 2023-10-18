const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const {PORT} = require("./constants");
const routes = require("./router");

// -- Express configuration
// Да зареди CSS 
app.use(express.static(path.resolve(__dirname, "./public")));
// Да може да четем данни от body
app.use(express.urlencoded({extended:false}));
//--

// -- Handlebarse configuration
app.engine('hbs', handlebars.engine({extname: "hbs"}));
app.set("view engine" , "hbs");
app.set("views", "src/views");
//--





app.use(routes);

app.listen(PORT, ()=> console.log(`Server is listening on port: ${PORT}`));