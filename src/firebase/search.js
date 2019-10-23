import { db } from 'firebase.js'
import { compare_creationDate } from 'helpers.js'

export const searchByTitle = (isForward, searchValue, errHandler, completionhandler) => {
  let query
  if (isForward) {
    query = db.collection('posts')
      .where('title', '>=', searchValue)
      .where('title', '<=', searchValue+ '\uf8ff')
      .orderBy('title', 'asc')
      .where('sold', '==', false)
      .orderBy('creationDate', 'desc')
  }
  else {
    query = db.collection('posts')
      .where('title', '>=', searchValue)
      .where('title', '<=', searchValue+ '\uf8ff')
      .orderBy('title', 'asc')
      .where('sold', '==', false)
      .orderBy('creationDate', 'asc')
  }

  query.get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        let doc_full = Object.assign({}, doc.data())
        return doc_full
      })
    
      // sort posts
      posts.sort(compare_creationDate)
      
      if (posts.length > 0) {
        const res = {
          posts
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

