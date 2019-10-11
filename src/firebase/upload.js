import firebase, { storage, db } from 'firebase.js'
// create a storage reference
const postsRef = storage.ref().child('posts/')

export const uploadImage = (file, id, errHandler, completionHandler) => {
  const uploadTask = postsRef.child(id).put(file)
  uploadTask.on('state_changed', () => {}, errHandler, () => {
    completionHandler()
    // finished uploading, return downloadURL
    return uploadTask.snapshot.ref.getDownloadURL()
  })
}

export const createPost = (postId, post, errHandler, completionHandler) => {
  post.creationDate = firebase.firestore.FieldValue.serverTimestamp()
  
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
