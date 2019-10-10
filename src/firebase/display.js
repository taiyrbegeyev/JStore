import { db } from 'firebase.js'

/**
 * Fetches data from postsActive
 */

export const fetchPosts = (posts_limit, posts_startAt) => {
  const query = db.collection('postsActive')
    .orderBy('creationDate', 'desc')
    .startAt(posts_startAt)
    .limit(posts_limit)
  
  return query
}
