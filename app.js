const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

let trails = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1562607913-56ccafbaa1fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1032&q=80"},
    {name: "Tuckerman Ravine Trail", image: "https://images.unsplash.com/photo-1560191292-f56f9ae47e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Olomana Trail", image: "https://images.unsplash.com/photo-1520927920056-3c8a6f66e0c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1562607913-56ccafbaa1fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1032&q=80"},
    {name: "Tuckerman Ravine Trail", image: "https://images.unsplash.com/photo-1560191292-f56f9ae47e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Olomana Trail", image: "https://images.unsplash.com/photo-1520927920056-3c8a6f66e0c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1562607913-56ccafbaa1fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1032&q=80"},
    {name: "Tuckerman Ravine Trail", image: "https://images.unsplash.com/photo-1560191292-f56f9ae47e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Olomana Trail", image: "https://images.unsplash.com/photo-1520927920056-3c8a6f66e0c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/trails", function(req, res){
    res.render("trails", {trails: trails});
});

app.post("/trails", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newTrail = {name: name, image: image}
    trails.push(newTrail);

    res.redirect("/trails")
});

app.get("/trails/new", function(req, res){
    res.render("new");
});

app.listen(port, function(){
    console.log("hiking review club server has started");
});