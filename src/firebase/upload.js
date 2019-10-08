import { storage, db } from '../firebase'
// create a storage reference
const producstRef = storage.ref().child('products/')

export const uploadImage = (file, id, errHandler, completionHandler) => {
  const uploadTask = producstRef.child(id).put(file)
  uploadTask.on('state_changed', () => {}, errHandler, () => {
    // finished uploading, return downloadURL
    completionHandler()
  })
}

export const createPost = (postId, post, errHandler, completionHandler) => {
  post.creationDate = new Date()
  
  db.collection('postsActive').doc(postId).set(post)
    .then(() => {
      // update user, add additonal info which is post_id
      const postsActive = {}
      postsActive[postId] = true
      db.collection('users').doc(post.ownerId).set({
        postsActive
      }, { merge: true })
      .then(() => {
        completionHandler()
      })
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
