```
users: {
  userId: {
    fullName: '',
    email: '',
    whatsApp: bool,
    phoneNumber: '', // empty if whatsApp is false
    creationDate: '',
  }
},
posts: {
  postId: {
    sold: bool,
    ownerId: '',
    ownerName: '',
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