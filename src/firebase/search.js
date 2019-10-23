import { db } from 'firebase.js'
import { compare_creationDate } from 'helpers.js'

export const getSizeOfSearchCollection = (searchValue, completionHandler) => {
  let size
  db.collection('posts')
    .where('title', '>=', searchValue)
    .where('title', '<=', searchValue+ '\uf8ff')
    .where('sold', '==', false)
    .orderBy('title', 'asc')
    .orderBy('creationDate', 'desc')
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

export const searchByTitle = (searchValue, errHandler, completionhandler) => {
  let query
  // if (isForward) {
    query = db.collection('posts')
      .where('title', '>=', searchValue)
      .where('title', '<=', searchValue+ '\uf8ff')
      .where('sold', '==', false)
      .orderBy('title', 'asc')
      .orderBy('creationDate', 'desc')
      // .startAfter(posts_At)
      // .limit(posts_limit)
  // }
  // else {
  //   query = db.collection('posts')
  //     .where('title', '>=', searchValue)
  //     .where('title', '<=', searchValue+ '\uf8ff')
  //     .where('sold', '==', false)
  //     .orderBy('title', 'asc')
  //     .orderBy('creationDate', 'asc')
  //     // .startAfter(posts_At)
  //     // .limit(posts_limit)
  // }

  query.get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        let doc_full = Object.assign({}, doc.data())
        return doc_full
      })
    
      // sort posts
      posts.sort(compare_creationDate)
      console.log(posts)
      if (posts.length > 0) {
        // let timeStampOfFirstPostLocal = posts[0].creationDate
        // let timeStampOfLastPostLocal
        // if (posts.length === 0) {
        //   timeStampOfLastPostLocal = posts[0].creationDate
        // }
        // else {
        //   timeStampOfLastPostLocal = posts[posts.length - 1].creationDate
        // }
        const res = {
          posts,
          // timeStampOfFirstPostLocal,
          // timeStampOfLastPostLocal
        }
        console.log(res)
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

