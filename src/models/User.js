const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
   email: { type: String, required: true, 
  //   unique: {
  //   value:true,
  //   message:"Email already exists!FROM SCHEMA",
  // } 
  },
  password: { type: String, required: true },
});

// Валидация на имейла 
// userSchema.path("email").validate(function(emailInput){
// const email = mongoose.model("User").findOne({emailInput});
// return !!email;
// }, "Email already exists!");

// Проверяваме дали паролата и повторената парола са еднакви
userSchema.virtual("repeatPassword").set(function (value) {
  
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
