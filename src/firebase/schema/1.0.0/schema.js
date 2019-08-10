const user = {
  email: '',
  name: {
    full_name: '',
    nickname: ''
  },
  user_created: 0,
  devices: {
    device_id: {
      device_token: ''
    }
  },
  chats: {},
  posts: {}
}

const post = {
  owner_id: '',
  buyer_id: '?',
  title: '',
  description: '',
  location: '',
  price: 0.0,
  image_url: '',
  post_created: 0,
  post_removed: 0
}

const chat = {
  user_1_id: '',
  user_2_id: '',
  post_id: '',
  lastMessage: {
    message
  }
}

const message = {
  receiver_id: '',
  sender_id: '',
  timestamp: '',
  text: '',
  type: ''
}

const schema = {
  users: {
    user_id: {
      user
    }
  },
  posts: {
    active: {
      post_id: {
        post
      }
    },
    sold: {
      post_id: {
        post
      }
    }
  },
  chats: {
    chat_id: {
      chat
    }
  },
  messages: {
    chat_id: {
      message_id: {
        message
      }
    }
  }
}