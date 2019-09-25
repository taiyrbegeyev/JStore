import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'
import Login from 'pages/Login/LoginPage'
import Home from 'pages/Home/HomePage'

export const routes = [
  {
    path: '/',
    exact: true,
    component: Landing
  },
  {
    path: '/get-started',
    component: SignUp
  },
  {
    path: '/register',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]
