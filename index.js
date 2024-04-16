const express = require("express");
// express app
const app = express();
// register view engine
app.set("view engine", "ejs");





// listens for request
app.listen(3000);
app.get("/", (req, res) => {
  //send the blog to the client;
  const blogs =[
    {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
     {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur"},
   {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur"}
  ]
  res.render('index', {title: 'Home', blogs});
});
app.get("/about", (req, res) => {
  //res.send('<h1>Hello World! about page</h1>');
  res.render('about', {title: 'About'});
});
//redirect
app.get("/blogs/create", (req, res) => {
  res.render("create", {title: 'Create a blog'});
})
//404 page
app.use("*", (req, res) =>{
  res.status(404).render('404' ,{title: '404'})
})
