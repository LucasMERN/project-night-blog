const mongoose = require('mongoose');
const Agenda = require('agenda');
const User = require('../models/UserSchema');
const Blog = require('../models/BlogSchema');

const agenda = new Agenda();

agenda.define('check banned users', async (job, done) => {
  try {
    // Find all banned users
    const bannedUsers = await User.find({ banned: true });

    // Loop through banned users
    for (let i = 0; i < bannedUsers.length; i++) {
      const user = bannedUsers[i];

      // Update user's profile picture, bio, and username
      user.profilePic = "/images/defaultUser.png";
      user.profileHeaderPic = "/images/defaultUser.png";
      user.bio = "";
      user.userName = "Suspended";
      await user.save();
      
      // Clear user's posts, bookmarks, followers and following 
      user.posts = [];
      user.bookmarks = [];
      user.followers = [];
      user.following = [];
      user.active = 'false'
      await user.save();

      // Delete user's posts that exists in other user's bookmarks
      await User.updateMany({ bookmarks: { $in: user.posts } }, { $pull: { bookmarks: { $in: user.posts } } });
      await Blog.deleteMany({ author: user._id });

    }
    done();
  } catch (error) {
    console.log(error);
    done(error);
  }
});

agenda.every('0 * * * *', 'check banned users');

agenda.start();