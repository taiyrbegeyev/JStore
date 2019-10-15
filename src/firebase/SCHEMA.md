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
    ownerId: '', // email
    ownerName: '',
    whatsApp: bool,
    phoneNumber: '', // empty if whatsApp is false
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