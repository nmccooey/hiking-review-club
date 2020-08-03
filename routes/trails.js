const express = require("express");
const router = express.Router();
const Trail = require("../models/trail");

// INDEX - show all trails.
router.get("/", function(req, res){
    Trail.find({}, function(err, allTrails){
        if(err){
            console.log(err);
        } else {
            res.render("trails/index", {trails: allTrails});
        }
    });
});

// CREATE - add new trail to DB
router.post("/", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newTrail = {name: name, image: image, description: desc, author: author}
    Trail.create(newTrail, function(err, newlyAddedTrail){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/trails");
        }
    });
});

// NEW - show form to create new trail
router.get("/new", isLoggedIn, function(req, res){
    res.render("trails/new");
});

// SHOW - shows more info about one trail.
router.get("/:id", function(req, res){
    // Find trail with provided ID.
    Trail.findById(req.params.id).populate("comments").exec(function(err, foundTrail){
        if(err){
            console.log(err);
        } else {
            res.render("trails/show", {trail: foundTrail});
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