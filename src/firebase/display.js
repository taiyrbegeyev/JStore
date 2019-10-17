import { storage, db } from 'firebase.js'
import { compare } from 'helpers.js'

/**
 * Fetch one single post
 * @param {*} postId 
 */

export const fetchPost = (postId, errHandler, completionHandler) => {
  if (!postId) {
    console.log('Post does not exist')
    errHandler()
    return
  }
  
  db.collection('posts').doc(postId).get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!')
        errHandler()
      }
      else if (doc.data().sold === true) {
        alert('Error: product has already been sold')
        errHandler()
      }
      else {
        console.log(doc.data())
        completionHandler(doc.data())
      }
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

/**
 * Fetches data from posts
 * @param {*} posts_limit 
 * @param {*} posts_startAt
 * @param {*} isForward
 */

export const fetchPosts = (posts_limit, posts_At, isForward, errHandler, completionhandler) => {
  let query
  if (isForward) {
    query = db.collection('posts')
      .where('sold', '==', false)
      .orderBy('creationDate', 'desc')
      .startAfter(posts_At)
      .limit(posts_limit)
  }
  else {
    query = db.collection('posts')
      .where('sold', '==', false)
      .orderBy('creationDate', 'asc')
      .startAfter(posts_At)
      .limit(posts_limit)
  }

  query.get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        let doc_full = Object.assign({}, doc.data())
        return doc_full
      })
    
      // sort posts
      posts.sort(compare)
      
      let timeStampOfFirstPostLocal = posts[0].creationDate
      let timeStampOfLastPostLocal
      if (posts.length <= 0) {
        timeStampOfLastPostLocal = posts[0].creationDate
      }
      else {
        timeStampOfLastPostLocal = posts[posts.length - 1].creationDate
      }
      const res = {
        posts,
        timeStampOfFirstPostLocal,
        timeStampOfLastPostLocal
      }
      completionhandler(res)
    })
    .catch((err) => {
      console.error(err)
      errHandler(err)
    })
}

/**
 * Get size of the passed collection
 * @param {*} collection_name 
 * @param {*} completionHandler 
 */

export const getSizeOfCollection = (collection_name, completionHandler) => {
  let size
  db.collection(collection_name)
    .where('sold', '==', false)
    .get()
    .then((snapshot) => {
      size = snapshot.docs.length
      console.log(size)
      completionHandler(size)
    })
    .catch((err) => {
      console.log(err)
    })
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
        default:
          break
      }
    })
}

/**
 * Get all active posts of a certain user
 * @param {*} user 
 * @param {*} completionHandler 
 */

export const activePosts = (user, errHandler, completionHandler) => {
  db.collection(user)
    .where('ownerId', '==', user)
    .where('sold', '==', false)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.')
        return
      }

      // create an array of objects
      const posts = snapshot.docs.map((doc) => {
        let doc_full = Object.assign({}, doc.data())
        return doc_full
      })
      
      completionHandler(posts)
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

/**
 * Get all sold posts of a certain user
 * @param {*} user 
 * @param {*} completionHandler 
 */

export const soldPosts = (user, errHandler, completionHandler) => {
  db.collection(user)
    .where('ownerId', '==', user)
    .where('sold', '==', true)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.')
        return
      }

      // create an array of objects
      const posts = snapshot.docs.map((doc) => {
        let doc_full = Object.assign({}, doc.data())
        return doc_full
      })
      
      completionHandler(posts)
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
