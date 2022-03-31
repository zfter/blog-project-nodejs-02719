const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { sendFile, redirect } = require("express/lib/response");
const { forEach } = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const homeContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aspernatur ipsa officiis incidunt tempora, explicabo reprehenderit aperiam labore vero autem saepe laudantium inventore quo? Tempora quis ad mollitia quibusdam velit."

const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aspernatur ipsa officiis incidunt tempora, explicabo reprehenderit aperiam labore vero autem saepe laudantium inventore quo? Tempora quis ad mollitia quibusdam velit."

const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aspernatur ipsa officiis incidunt tempora, explicabo reprehenderit aperiam labore vero autem saepe laudantium inventore quo? Tempora quis ad mollitia quibusdam velit."



mongoose.connect("mongodb+srv://tigxel:test123@cluster0.4g607.mongodb.net/blogDB");

const postSchema = {
  title: String, 
  content: String 
 };

 const Post = mongoose.model("Post", postSchema);



app.get("/", (req, res) => {
  Post.find({}, (err, foundList) => {
    if(!err) {
      res.render("home", {
        homeContent: homeContent,
        showPosts: foundList,
      });
    }
  });  
});

app.get("/about", (req, res) => {
  res.render("about", {});
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {   
      title: post.title,   
      post: post.content   
    });   
  });
});

app.get("/bp-admin", (req, res) => {
  res.render("bp-admin", {});
});


app.post("/bp-admin", (req, res) => {
  const post = new Post ({
    title: req.body.txtTitle, 
    content: req.body.txtPost 
  });

  post.save(function(err){
    if (!err){ 
      res.redirect("/"); 
    } 
  }); 
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started success.");
});