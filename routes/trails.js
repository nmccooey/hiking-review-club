const express = require("express");
const router = express.Router();
const Trail = require("../models/trail");
const middleware = require("../middleware");


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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT TRAIL ROUTE
router.get("/:id/edit", middleware.checkTrailOwnership, function(req, res){
    Trail.findById(req.params.id, function(err, foundTrail){
        res.render("trails/edit", {trail: foundTrail});
    });
});

// UPDATE TRAIL ROUTE
router.put("/:id", middleware.checkTrailOwnership, function(req, res){
    // find and update the correct trail.
    Trail.findByIdAndUpdate(req.params.id, req.body.trail, function(err, updatedTrail){
       if(err){
           res.redirect("/trails");
       } else {
           //redirect somewhere(show page)
           res.redirect("/trails/" + req.params.id);
       }
    });
});

// DESTROY TRAIL ROUTE
router.delete("/:id", middleware.checkTrailOwnership, function(req, res){
    Trail.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/trails");
       } else {
           res.redirect("/trails");
       }
    });
});



module.exports = router;