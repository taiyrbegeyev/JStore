// const { blogService } = require('../services')
// const { createBlogpost } = blogService

const signup = async (req, res, next) => {
  // const { user, content } = req.body
  try {
    // await createBlogpost(user, content)
    res.send('Success!')
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  signup
}
