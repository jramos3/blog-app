const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//--------------------------------
//-----------MIDDLEWARE-----------
//--------------------------------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------
//--------DATABASE SETUP----------
//--------------------------------
mongoose
  .connect("mongodb://localhost:27017/blog_app", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to database!");
  })
  .catch(err => {
    console.log("Error connecting to database!", err);
  });

//--------------------------------
//------SCHEMA & MODEL SETUP------
//--------------------------------
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now()
  }
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image:
//     "https://images.unsplash.com/photo-1550173086-7f3cbe0acb47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   body:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos natus praesentium velit vitae nulla enim nesciunt quo, ab modi, hic, exercitationem voluptate sequi. Iste porro fugiat non placeat quaerat."
// });

//--------------------------------
//---------RESTFUL ROUTES---------
//--------------------------------

//ROOT Route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//INDEX Route
app.get("/blogs", (req, res) => {
  Blog.find()
    .then(blogs => {
      res.render("index", { blogs });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log("BlogApp started at port 3000..."));
