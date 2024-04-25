const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');  
// inport the model for blog
const Blog = require('./model/blog');
// express app
const app = express();

const port =3000
// register view engine
app.set("view engine", "ejs");


// connect to mongodb
const dbURI = "mongodb+srv://pirinceBlogs:Miradi32Tembo@blogs.x7sgeik.mongodb.net/node-test?retryWrites=true&w=majority&appName=blogs";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(port,()=> {console.log(`server is listening on port ${port}`)}), console.log("connected to mongodb and satrt the server"))
.catch((err) => console.log(err));

// listens for request

//middleware & static files in order to read static file like css images and some javascript
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) // this middlware is used to read the body of the request



  // normal routes
app.get("/", (req, res) => {
  res.redirect('/blogs')
});
app.get("/about", (req, res) => {
  //res.send('<h1>Hello World! about page</h1>');
  res.render('about', {title: 'About'});
});
//this is the form to create a new blog
app.get("/blogs/create", (req, res) => {
  res.render("create", {title: 'Create a blog'});
})


//Blogs Routes

// this is the route to get all the blogs
app.get("/blogs", (req, res) =>{
  Blog.find().sort({createdAt: -1})
  .then((result) => res.render('index', {blogs: result, title: 'All Blogs'}))
  .catch((err) => console.log(err));
})

// create new blog in the database and save it in the database
app.post( "/blogs",(req, res) =>{
const blog = new Blog(req.body);// this is the object that we are going to save in the database
  blog.save()
  .then((result) => {
    res.redirect('/blogs')
  })
  .catch((err) => {console.log(err)});
  
})
// show indivisual blog detailes by fining the id of the blog
app.get("/blogs/:id", (req, res) =>{
const id = req.params.id;
  Blog.findById(id)
  .then((result) => {
    res.render('details', {blog: result, title: 'Blog Details'})})
  .catch((err) => {console.log(err)});
})

// delet blog by id
app.delete("/blogs/:id", (req, res) =>{
const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result) => {
    res.json({redirect: '/blogs'})
  })
     .catch((err) => {console.log(err)});
})


//404 page
app.use("*", (req, res) =>{
  res.status(404).render('404' ,{title: '404'})
})
