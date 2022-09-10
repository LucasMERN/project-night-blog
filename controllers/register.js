const User = require('../models/User')

module.exports = {
    loadRegisterPage: (req, res) =>{
        res.render('sign-up.ejs')
    },
    createUser: async (req, res) => {
        const { email, password, password2 } = req.body
        const exists = await User.findOne({email: email});
        let errors = [];
        //Check fields
        if(!email || !password || !password2){
            errors.push({msg: 'Please fill in all fields.'});
        }if(password !== password2){
            errors.push({msg: 'Passwords must match.'});
        }if(password.length < 8){
            errors.push({msg: 'Password must be at least 8 characters long.'});
        }if(exists){
            errors.push({msg: 'This email is already taken.'});
        }if(errors.length > 0){
            res.render('sign-up.ejs', {
                errors,
                email,
                password,
                password2
            });
        }else{
            const newUser = new User({
                userName: req.body.text,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save()
            res.redirect('/login')
        }
    }
}