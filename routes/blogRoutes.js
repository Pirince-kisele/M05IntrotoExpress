const express = require("express")
// import the controller for blog`
const blogController = require("../controllers/blogController");
const router = express.Router();

// All Blogs Routes

// this is the route to get all the blogs
router.get("/blogs", blogController.blog_index);
//this is the form to create a new blog
router.get("/create", blogController.blog_create_get);
// create new blog in the database and save it in the database
router.post("/blogs", blogController.blog_create_post);  
// show indivisual blog detailes by fining the id of the blog
router.get('/blogs/:id', blogController.blog_details);

// delet blog by id
router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
