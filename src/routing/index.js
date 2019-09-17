import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'
import Login from 'pages/Login/LoginPage'
import Home from 'pages/Home/HomePage'

export const routes = [
  {
    path: '/',
    exact: true,
    isPrivate: false,
    component: Landing
  },
  {
    path: '/get-started',
    exact: true,
    isPrivate: false,
    component: SignUp
  },
  {
    path: '/register',
    exact: true,
    isPrivate: false,
    component: Login
  },
  // {
  //   path: '/demo',
  //   exact: true,
  //   component: Login
  // },
  {
    path: '/home',
    exact: true,
    isPrivate: true,
    component: Home
  }
]
