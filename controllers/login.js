module.exports = {
    loadLoginPage: (req, res) => {
        res.render('index.ejs', {routeName: 'login'})
    }
}