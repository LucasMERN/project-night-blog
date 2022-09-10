module.exports = {
    // Using this method makes it so ONLY logged in users may proceed to requested page
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/login')
        }
    },
    // Logged in users will not be able to view a page with this method
    ensureGuest: function(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/')
        }
    }
}