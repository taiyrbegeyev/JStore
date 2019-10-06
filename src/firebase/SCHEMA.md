```
users: {
  userId: {
    fullName: '',
    email: '',
    joinDate: '',
    postsActive: {},
    postsSold: {},
    postsBought: {},
    chats: {}
  }
},
posts: {
  active: {
    postId: {
      ownerId: '',
      title: '',
      category: '',
      condition: '',
      description: '',
      imageUrl: '',
      price: 0.0,
      paymentOptions: []
      creationDate: 0,
    }
  },
  sold: {
    postId: {
      ownerId: '',
      buyerId: '',
      title: '',
      category: '',
      condition: '',
      description: '',
      imageUrl: '',
      price: 0.0,
      paymentOptions: []
      creationDate: 0,
      soldDate: 0
    }
  }
},
chats: {
  chatId: {
    aliceId: '',
    bobId: '',
    postId: '',
    lastMessageId: '',
    seen : false
  }
},
messages: {
  chatId: {
    messageId: {
      receiverId: '',
      senderId: '',
      timestamp: '',
      text: '',
      type: '',
      seen: true
    }
  }
}
```