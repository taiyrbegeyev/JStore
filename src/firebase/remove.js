import firebase, { db } from 'firebase.js'

export const markAsSold = (postId, errHandler, completionHandler) => {
  db.collection('posts').doc(postId).update({
    sold: true,
    soldDate: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

export const removePost = (postId, errHandler, completionHandler) => {
  db.collection('posts').doc(postId).delete()
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
