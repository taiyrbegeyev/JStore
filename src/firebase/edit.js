import { db } from 'firebase.js'

/**
 * edit a post, only owner can do it
 * @param {*} data 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
export const updatePost = (data, errHandler, completionHandler) => {
  const postId = data.postId
  delete data.postId
  console.log(data)
  db.collection('posts').doc(postId).update({
    title: data.title,
    category: data.category,
    condition: data.condition,
    description: data.description,
    price: parseFloat(data.price).toFixed(2),
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
