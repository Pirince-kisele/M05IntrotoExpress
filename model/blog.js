const mongoose = require('mongoose');
//schema create the struture of the data in the database
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });
// export the schema || the Blog inside the model is the naem of the collection in the database
const Blog = mongoose.model('Blog', blogSchema);
// here we export the model in order to use it in the other files sever.js file
module.exports = Blog;