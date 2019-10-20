import { db } from 'firebase.js'

export const updatePost = (data, errHandler, completionHandler) => {
  const postId = data.postId
  delete data.postId
  console.log(data)
  db.collection('posts').doc(postId).update({
    title: data.title,
    category: data.category,
    condition: data.condition,
    description: data.description,
    price: data.price,
    paymentOptions: data.paymentOptions
  })
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
