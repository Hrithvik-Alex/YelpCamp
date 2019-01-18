var express= require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX
router.get("/", function(req, res){
    Campground.find({}, function(err, allCamps){
        if(err) {
            console.log(err)
        } else {
             res.render("campgrounds/index", {campgrounds: allCamps}); 
        }
    });
});

//NEW
router.get("/new", function(req, res){
    res.render("campgrounds/new");
})

//CREATE
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
    
    Campground.create(newCamp, function(err, newCampCreated){
       if(err) {
            console.log(err);
       } else {
            res.redirect("campgrounds"); 
       }
    });
});

//SHOW
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

module.exports = router;