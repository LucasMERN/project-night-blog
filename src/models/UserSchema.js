const bcrypt = require('bcrypt')    // bcrypt is a library for hashing passwords
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({    // create a new schema for the user model
  userName: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "/images/defaultUser.png" },
  profileHeaderPic: { type: String, default: "/images/defaultUser.png" },
  bio: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  drafts: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pinned: {type: Schema.Types.ObjectId, ref: 'Blog'},
  notifications: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      seen: {
        type: Boolean,
        default: false
      },
      content: {
        type: String
      },
      type: {
        type: String
      }
    }
  ]
}, { timestamps: true })

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
