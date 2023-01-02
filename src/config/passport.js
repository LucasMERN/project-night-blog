const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose')
const User = require('../models/UserSchema')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email not found.` })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  }),

//   passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:2002/login/facebook/callback"
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log(profile)
//     const newUser = {
//       userName: profile.displayName,
//       // We will be filtering our database by email address which must be unique, therefore we will assign the unique profile id to our email property
//       email: profile.id,
//       password: 'N/A',
//     }
//     try {
//       let user = await User.findOne({ email: profile.id })

//       if (user) {
//         done(null, user)
//       } else {
//         user = await User.create(newUser)
//         done(null, user)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// ));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile', 'email'],
  callbackURL: "http://localhost:2002/login/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  const newUser = {
    userName: profile._json.name,
    // We will be filtering our database by email address which must be unique, therefore we will assign the unique profile id to our email property
    email: profile._json.email,
    profilePic: profile._json.picture,
    password: 'N/A',
  }
  try {
    let user = await User.findOne({ 
      $or: [
        { email: profile._json.email },
        { userName: profile._json.name }
      ]
    })

    if (user) {
      done(null, user)
    } else {
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (error) {
    console.log(error)
  }
}
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  accessToken: process.env.GITHUB_ACCESS_TOKEN,
  callbackURL: "http://localhost:2002/login/github/callback",
  scope: ['user:email'],
},
async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    const newUser = {
      userName: profile._json.login,
      // We will be filtering our database by email address which must be unique, therefore we will assign the unique profile id to our email property
      email: profile.emails[0].value,
      profilePic: profile._json.avatar_url,
      password: 'N/A',
    }
  try {
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails[0].value },
        { userName: profile._json.login }
      ]
    })

    if (user) {
      done(null, user)
    } else {
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (error) {
    console.log(error)
  }
}
));

// passport.use(new TwitterStrategy({
//   consumerKey: process.env.TWITTER_CONSUMER_KEY,
//   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//   callbackURL: "http://localhost:2002/login/twitter/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   console.log(profile)
//   const newUser = {
//     userName: profile.displayName,
//     // We will be filtering our database by email address which must be unique, therefore we will assign the unique profile id to our email property
//     email: profile.id,
//     password: 'N/A',
//   }
// try {
//   let user = await User.findOne({ email: profile.id })

//   if (user) {
//     done(null, user)
//   } else {
//     user = await User.create(newUser)
//     done(null, user)
//   }
// } catch (error) {
//   console.log(error)
// }
// }
// ));

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })

}