const express = require("express")
// import the controller for blog`
const blogController = require("../controllers/blogController");
const router = express.Router();

// All Blogs Routes

// this is the route to get all the blogs
router.get("/", blogController.blog_index);
//this is the form to create a new blog
router.post("/", blogController.blog_create_post);

// create new blog in the database and save it in the database
router.get("/create", blogController.blog_create_get);
// show indivisual blog detailes by fining the id of the blog
router.get("/:id", blogController.blog_details);

// delet blog by id
router.delete("/:id", blogController.blog_delete);

module.exports = router;
