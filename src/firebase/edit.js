import { db } from 'firebase.js'

export const updatePost = (data, errHandler, completionHandler) => {
  const postId = data.postId
  delete data.postId
  console.log(data)
  db.collection('posts').doc(postId).update({
    data
  })
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
