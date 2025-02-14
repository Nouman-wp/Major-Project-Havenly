module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "you must be logged in to do that");
        return res.redirect("/signup");
      }
      next();
};