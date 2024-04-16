const express = require("express");
// express app
const app = express();
// register view engine
app.set("view engine", "ejs");





// listens for request
app.listen(3000);
app.get("/", (req, res) => {
  //res.send('<h1>Hello World!</h1>');
  res.render('index');
});
app.get("/about", (req, res) => {
  //res.send('<h1>Hello World! about page</h1>');
  res.render('about');
});
//redirect
app.get("/blogs/create", (req, res) => {
  res.render("create");
})
//404 page
app.use("*", (req, res) =>{
  res.status(404).render('404')
})
