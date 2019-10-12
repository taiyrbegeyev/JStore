```
users: {
  userId: {
    fullName: '',
    email: '',
    whatsApp: bool,
    phoneNumber: '', // empty if whatsApp is false
    creationTime: '',
  }
},
posts: {
  postId: {
    sold: bool,
    ownerId: '',
    buyerId: '', // empty if sold is false
    title: '',
    category: '',
    condition: '',
    description: '',
    imageUrl: '',
    price: 0.0,
    paymentOptions: [],
    creationDate: '',
    soldDate: '', // empty is sold is false
  }
},
```