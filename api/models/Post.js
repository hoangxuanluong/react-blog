const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    desc: String,
    photo: {
      url: String,
      filename: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categories: Array,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
