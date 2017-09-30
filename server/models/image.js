const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  url: {
    type: String,
    required: true
  },
  likes:[String]
});


module.exports = mongoose.model('Image', ImageSchema);
