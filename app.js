const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const app = express();
const port = 3000;

// --- APP CONFIG

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoder({extended: true}));
app.use(methodOverride("_method"));

// --- DATABASE STUFF -  MONGOOSE/MODEL CONFIG

//Need to create the mongoose schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//need to compile the Schema to a model
 var Blog = mongoose.model("Blog", blogSchema);

// TEST Data
Blog.create({
    title: "Test Blog",
    image: "url",
    body: "Hello there this is the body"
});

// --- RESTFUL Routes
    // Index
    // New
    // Create
    // Show
    // Edit
    // Update
    // Destroy

// it is conventional for the root page/home page to go to the index. 
app.get("/", function (req, res){
    res.redirect("/blogs");
});


// the index route    
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blog});
        }
    });
});

//The NEW and Create routes
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }else
            //then, redirect to the index
            res.redirect("/blogs");
    });
    
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTES
app.put("/blogs/:id", function(req, res){
    //the below will take three arguments id, newData, callback
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }

    });
});


//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //Destroy Blog
    Blob.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
    //Redirect Somewhere
});




app.listen(port, function(){
    console.log("The server is running");
});