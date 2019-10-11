import { storage, db } from 'firebase.js'

/**
 * Fetches data from postsActive
 * @param {*} posts_limit 
 * @param {*} posts_startAt 
 */

export const fetchPosts = (posts_limit, posts_startAt) => {
  const query = db.collection('postsActive')
    .orderBy('creationDate', 'desc')
    .startAt(posts_startAt)
    .limit(posts_limit)
  
  return query
}

/**
 * Based on postId, fetches corresponding image from storage
 * @param postId 
 */

export const fetchPostImage = (postId) => {
  // create a storage reference
  const path = 'posts/' + postId
  const postsRef = storage.ref().child(path)
  console.log(path)
  
  return postsRef.getDownloadURL()
    .catch((err) => {
      switch(err.code) {
        case 'storage/object-not-found':
          console.log('File does not exist')
          break
        case 'storage/unauthorized':
          console.log('User does not have permission to access the object')
          break
        case 'storage/canceled':
          console.log('User canceled the upload')
          break
        case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response')
            break
      }
    })
}
