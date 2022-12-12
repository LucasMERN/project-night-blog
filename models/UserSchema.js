const bcrypt = require('bcrypt')    // bcrypt is a library for hashing passwords
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({    // create a new schema for the user model
  userName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },    
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
  },
  bio: {
    type: String
  }
})

 UserSchema.pre('save', function save(next) {   // hash the password before saving the user
  const user = this   // get the user from the context
  if (!user.isModified('password')) { return next() }   // if the password hasn't been modified, skip the hashing
  bcrypt.genSalt(10, (err, salt) => {   // generate a salt with 10 rounds
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {  // compare the candidate password to the hashed password
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)