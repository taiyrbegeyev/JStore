import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'

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
  }
]
