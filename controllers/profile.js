module.exports = {
    getProfile: async (req, res) => {
        try {
            res.render('index.ejs', {routeName: 'profile', user: req.user})
        } catch (error) {
            console.log(error)
        }
    }
}