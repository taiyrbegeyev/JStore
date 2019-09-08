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
    path: '/signup',
    exact: true,
    component: SignUp
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: Home
  }
]
