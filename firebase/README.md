### Database

##### 1. User table

- get name (userId)
- create user (email, name)
- get user (userId)
- modify user (userId, newUserObject)

##### 2. Post table

- get all posts
  - by category
  - by other filter
  - by sold → **how to handle sold items?**
  - by user → **DONE**
  - by type (rent/sell)
- get single post (postId)
- push post (post)
- delete post (postId)
- modify post (postId, newPostObject)
- mark as sold/unsold (postId)

##### 3. Chat table

- create chat (message)
- get chat (chatId)
- update chat (message, senderId, receiverId)
- delete chat (chatId) **ONLY ONE-SIDED!**
- send buy message (item, senderId, senderName, receiverName)

##### 4. Message table

- get all messages (userId, senderId)
- get all messages (userId)
- send message (message, senderId, receiverId)

##### 5. Feedback table

- send feedback (feedback, userId)

### Authentication

- get current user id
- get current user email
- get current user displayName
- is authenticated
- sign in (email, password)
- on auth changed (lambda)
- create account (email, password)
- sign out
