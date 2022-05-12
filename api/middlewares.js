const { postSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Post = require('./models/Post')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    console.log('URLL', req.originalUrl)
    res.status(401).send('YOU MUST BE SIGNED IN FIRST')
  } else {
    next()
  }
}

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params
  const post = await Post.findById(id)
  if (!post.author.equals(req.user._id)) {
    res.status(401).json("YOU DON'T HAVE PERMISSION")
  } else {
    next()
  }
}

module.exports.validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((el) => el.message).join(',')
    console.log(msg)
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}
