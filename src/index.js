const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const { PORT, DB_URL } = require("./constants");
const routes = require("./router");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// -- Express configuration
// Да зареди CSS
app.use(express.static(path.resolve(__dirname, "./public")));
// Да може да четем данни от body
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//--

// -- Handlebarse configuration
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");
//--

// Database connecting

async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
    .then(()=>{
        console.log("Successfuly connected to the database...");
    })
    .catch(err => console.log(`Error while connection to the DB. Error: ${err}`));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
