```
users: {
  userId: {
    fullName: '',
    email: '',
    whatsApp: bool,
    phoneNumber: '', // empty if whatsApp is false
  }
},
postsActive: {
  postId: {
    ownerId: '',
    ownerName: '',
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
postsSold: {
  postId: {
    ownerId: '',
    ownerName: '',
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
},
```