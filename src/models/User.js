const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

// Проверяваме дали паролата и повторената парола са еднакви
userSchema.virtual("repeatePassword").set(function name(value) {
  console.log({ value });
  if(value!==this.password){
    throw new Error("Password missmatch!");
    
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
