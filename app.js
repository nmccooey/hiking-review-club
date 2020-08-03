const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const Trail = require("./models/trail");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

let commentRoutes = require("./routes/comments");
let trailRoutes = require("./routes/trails");
let indexRoutes = require("./routes/index");

const app = express();
const port = 3000;

// Connect mongoose.
mongoose.connect('mongodb://localhost:27017/hiking_review_club', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); seed the database.

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Rusty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/trails", trailRoutes);
app.use("/trails/:id/comments", commentRoutes);

app.listen(port, function(){
    console.log("hiking review club server has started");
});