import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'
import Login from 'pages/Login/LoginPage'

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
  }
]
