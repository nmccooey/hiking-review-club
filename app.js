const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Connect mongoose.
mongoose.connect('mongodb://localhost:27017/hiking_review_club', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// SCHEMA SETUP
let trailSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Model
let Trail = mongoose.model("Trail", trailSchema);


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
            res.render("index", {trails: allTrails});
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
    res.render("new");
});

// SHOW - shows more info about trail.
app.get("/trails/:id", function(req, res){
    // Find trail with provided ID.
    Trail.findById(req.params.id, function(err, foundTrail){
        if(err){
            console.log(err);
        } else {
            res.render("show", {trail: foundTrail});
        }
    });
});

app.listen(port, function(){
    console.log("hiking review club server has started");
});