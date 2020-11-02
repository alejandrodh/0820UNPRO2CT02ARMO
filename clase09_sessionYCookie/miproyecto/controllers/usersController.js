
let usersController = {
    logout: function(req, res){
        req.session.destroy();
        res.clearCookie('userId');

        return res.redirect('/');
    }
    
}

module.exports = usersController;