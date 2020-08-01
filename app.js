const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Trail = require("./models/trail");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


seedDB();
// Connect mongoose.
mongoose.connect('mongodb://localhost:27017/hiking_review_club', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// ROUTES
// Landing page
app.get("/", function(req, res){
    res.render("landing");
})

// INDEX - show all trails.
app.get("/trails", function(req, res){
    Trail.find({}, function(err, allTrails){
        if(err){
            console.log(err);
        } else {
            res.render("trails/index", {trails: allTrails});
        }
    });
});

// adds new trail to db
app.post("/trails", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newTrail = {name: name, image: image, description: desc}
    Trail.create(newTrail, function(err, newlyAddedTrail){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/trails");
        }
    });
});

app.get("/trails/new", function(req, res){
    res.render("trails/new");
});

// SHOW - shows more info about trail.
app.get("/trails/:id", function(req, res){
    // Find trail with provided ID.
    Trail.findById(req.params.id).populate("comments").exec(function(err, foundTrail){
        if(err){
            console.log(err);
        } else {
            res.render("trails/show", {trail: foundTrail});
        }
    });
});

// COMMENT ROUTES
app.get("/trails/:id/comments/new", function(req, res){
    Trail.findById(req.params.id,function(err, trail){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {trail: trail});
        }
    });
});

app.post("/trails/:id/comments", function(req, res){
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

app.listen(port, function(){
    console.log("hiking review club server has started");
});