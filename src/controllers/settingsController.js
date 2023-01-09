const User = require('../models/UserSchema')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('settings.ejs', {user: req.user, routeName: 'settings'})
        } catch (error) {
            console.log(error)
        }
    },

    getAccountInfo: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'accountInfo', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },

    getDisplay: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'display', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },

    getGone: async (req, res) => {
        try {
            res.render('settings.ejs', {routeName: 'deactivate', user: req.user})
        } catch (error) {
            console.log(error)
        }
    },

    updateUsername: async (req, res) => {
        try {
            // Check if the username is already in the database
            const usernameExists = await User.exists({ userName: req.body.username });
            if (usernameExists) {
                res.render('settings.ejs', { user: req.user, routeName: 'settings' });
                return;
            }
            // If the username is not in the database, update the user's username
            await User.findOneAndUpdate({ _id: req.user.id }, { userName: req.body.userName });
            res.redirect('back');
        } catch (error) {
            console.log(error);
        }
    },

    updateEmail: async (req, res) => {
        try {
            // Check if the email is already in the database
            const emailExists = await User.exists({ email: req.body.email });
            if (emailExists) {
                res.render('settings.ejs', { user: req.user, routeName: 'settings' });
                return;
            }
            // If the email is not in the database, update the user's email
            await User.findOneAndUpdate({ _id: req.user.id }, { email: req.body.email });
            res.redirect('back');
        } catch (error) {
            console.log(error);
        }
    },

    updatePassword: async (req, res) => {
        try {
            // Check if the password contains at least one uppercase letter, lowercase letter, special character, and number
            if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)){
                res.render('settings.ejs', { user: req.user, routeName: 'settings' });
                return;
            }
            // If the password adheres to the specified parameters, hash the password and update the user's password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.findOneAndUpdate({ _id: req.user.id }, { password: hashedPassword });
            res.redirect('back');
        } catch (error) {
            console.log(error);
        }
    }
      
}