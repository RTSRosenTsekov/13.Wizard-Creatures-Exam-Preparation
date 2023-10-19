const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
   email: { type: String, require: true, 
    unique: {
    value:true,
    message:"Email already exists!FROM SCHEMA",
  } 
  },
  password: { type: String, require: true },
});

// Валидация на имейла 
// userSchema.path("email").validate(function(emailInput){
// const email = mongoose.model("User").findOne({emailInput});
// return !!email;
// }, "Email already exists!");

// Проверяваме дали паролата и повторената парола са еднакви
userSchema.virtual("repeatPassword").set(function name(value) {
  
  if(value!==this.password){
    throw new Error("Password missmatch!");

  }
});

// Hash password
userSchema.pre("save", async function(){
  const hash = await bcrypt.hash(this.password , 10);
  this.password = hash;
})

const User = mongoose.model("User", userSchema);

module.exports = User;
