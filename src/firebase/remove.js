import firebase, { storage, db } from 'firebase.js'
// create a storage reference
const postsRef = storage.ref().child('posts/')

/**
 * Mark a certain post as sold
 * @param {*} postId 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
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

/**
 * remove the image of a certain post from storage
 * @param {*} postId 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
export const removeImage = (postId, errHandler, completionHandler) => {
  const deleteTask = postsRef.child(postId)
  deleteTask.delete()
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

/**
 * remove permanently post from db and then remove its image from storage 
 * @param {*} postId 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
export const removePost = (postId, errHandler, completionHandler) => {
  db.collection('posts').doc(postId).delete()
    .then(() => {
      removeImage(postId, errHandler, completionHandler)
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
