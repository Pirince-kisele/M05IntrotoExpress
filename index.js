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
const dbURI = "mongodb+srv://pirinceBlogs:Miradi32Tembo@blogs.x7sgeik.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=blogs"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(port,()=> {console.log(`server is listening on port ${port}`)}), console.log("connected to mongodb and satrt the server"))
.catch((err) => console.log(err));

// listens for request

//middleware & static files in order to read static file like css images and some javascript
app.use(morgan('dev'))
app.use(express.static('public'))



  // normal routes
app.get("/", (req, res) => {
  res.redirect('/blogs')
});
app.get("/about", (req, res) => {
  //res.send('<h1>Hello World! about page</h1>');
  res.render('about', {title: 'About'});
});


//Blogs Routes
app.get("/blogs", (req, res) =>{
  Blog.find().sort({createdAt: -1})
  .then((result) => res.render('index', {blogs: result, title: 'All Blogs'}))
  .catch((err) => console.log(err));
})
app.get("/blogs/create", (req, res) => {
  res.render("create", {title: 'Create a blog'});
})
//404 page
app.use("*", (req, res) =>{
  res.status(404).render('404' ,{title: '404'})
})
