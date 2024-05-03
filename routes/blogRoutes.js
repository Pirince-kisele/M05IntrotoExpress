const express = require('express')
const router = express.Router();
// inport the model for blog
const Blog = require('../model/blog');
// express app

//Blogs Routes

// this is the route to get all the blogs
router.get("/", (req, res) =>{
  Blog.find().sort({createdAt: -1})
  .then((result) => res.render('index', {blogs: result, title: 'All Blogs'}))
  .catch((err) => console.log(err));
})
//this is the form to create a new blog
router.get("/create", (req, res) => {
  res.render("create", {title: 'Create a blog'});
})


// create new blog in the database and save it in the database
router.post( "/",(req, res) =>{
const blog = new Blog(req.body);// this is the object that we are going to save in the database
  blog.save()
  .then((result) => {
    res.redirect('/blogs')
  })
  .catch((err) => {console.log(err)});

})
// show indivisual blog detailes by fining the id of the blog
router.get("/:id", (req, res) =>{
const id = req.params.id;
  Blog.findById(id)
  .then((result) => {
    res.render('details', {blog: result, title: 'Blog Details'})})
  .catch((err) => {console.log(err)});
})

// delet blog by id
router.delete('/:id', (req, res) =>{
const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result) => {
    res.json({redirect:'/blogs'})
  })
     .catch((err) => {console.log(err)});
})



module.exports = router;