const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
// import the router module that we create in the blogRoutes.js file
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const port =3001
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
app.use(express.urlencoded({extended: true}))// this middlware is used to read the body of the request
app.use(bodyParser.json())



  // normal routes
app.get("/", (req, res) => {
  res.redirect('/blogs')
});
app.get("/about", (req, res) => {
  //res.send('<h1>Hello World! about page</h1>');
  res.render('about', {title: 'About'});
});

// blog routes  this gonna take all the routes that we created in the blogRoutes.js file and use it here
app.use('blogs', blogRoutes);


//404 page
app.use("*", (req, res) =>{
  res.status(404).render('404' ,{title: '404'})
})
