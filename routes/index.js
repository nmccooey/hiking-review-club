const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// Show register form
router.get("/register", function(req, res){
    res.render("register");
});

// Handle sign up route.
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/trails"); 
        });
    });
});

// Show login form.
router.get("/login", function(req, res){
    res.render("login");
});

// Handle login logic.
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/trails",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logic route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/trails");
});
 
// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;