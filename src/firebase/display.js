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
 * Fetch all active posts for the home page
 * @param {*} posts_limit 
 * @param {*} posts_At 
 * @param {*} isForward 
 * @param {*} errHandler 
 * @param {*} completionhandler 
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
      
      if (posts.length > 0) {
        let timeStampOfFirstPostLocal = posts[0].creationDate
        let timeStampOfLastPostLocal
        if (posts.length === 0) {
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
      }
      else {
        errHandler()
      }
    })
    .catch((err) => {
      console.error(err)
      errHandler()
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
 * Get a size of the collection
 * @param {*} user 
 * @param {*} sold 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */

export const getUsersPostsCollectionSize = (user, sold, errHandler, completionHandler) => {
  let size
  db.collection('posts')
    .where('ownerId', '==', user)
    .where('sold', '==', sold)
    .get()
    .then((snapshot) => {
      size = snapshot.docs.length
      console.log(size)
      completionHandler(size)
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

/**
 * Get a certain user's either all sold or active posts
 * @param {*} posts_limit 
 * @param {*} posts_At 
 * @param {*} isForward 
 * @param {*} user 
 * @param {*} sold 
 * @param {*} errHandler 
 * @param {*} completionhandler 
 */

export const fetchUsersPosts = (posts_limit, posts_At, isForward, user, sold, errHandler, completionhandler) => {
  let query
  if (isForward) {
    query = db.collection('posts')
      .where('ownerId', '==', user)
      .where('sold', '==', sold)
      .orderBy('creationDate', 'desc')
      .startAfter(posts_At)
      .limit(posts_limit)
  }
  else {
    query = db.collection('posts')
      .where('ownerId', '==', user)
      .where('sold', '==', sold)
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

      if (posts.length > 0) {
        let timeStampOfFirstPostLocal = posts[0].creationDate
        let timeStampOfLastPostLocal
        if (posts.length === 0) {
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
      }
      else {
        errHandler()
      }
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
