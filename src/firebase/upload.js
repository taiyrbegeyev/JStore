import firebase, { storage, db } from 'firebase.js'
// create a storage reference
const postsRef = storage.ref().child('posts/')

export const uploadImage = (file, id, errHandler, completionHandler, returnImageUrl) => {
  const uploadTask = postsRef.child(id).put(file)
  uploadTask.on('state_changed', () => {}, errHandler, () => {
    // finished uploading, return downloadURL
    uploadTask.snapshot.ref.getDownloadURL()
      .then((url) => {
        returnImageUrl(url)
      })
      .catch((err) => {
        console.log(err)
      })
    completionHandler()
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
