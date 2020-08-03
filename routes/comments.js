const express = require("express");
const router  = express.Router({mergeParams: true});
const Trail = require("../models/trail");
const Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
    Trail.findById(req.params.id,function(err, trail){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {trail: trail});
        }
    });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
    Trail.findById(req.params.id, function(err, trail) {
        if(err) {
            console.log(err);
            res.redirect("/trails");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    trail.comments.push(comment);
                    trail.save();
                    res.redirect("/trails/" + trail._id);
                }
            });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;