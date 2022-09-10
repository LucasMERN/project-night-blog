module.exports = {
    loadRegisterPage: (req, res) =>{
        res.render('index.ejs', {routeName: 'register'})
    }
}