import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'
import Home from 'pages/Home/HomePage'
import UploadProduct from 'pages/UploadProduct/UploadProductPage'
import ProductInfo from 'pages/ProductInfo/ProductInfo'

export const routes = [
  {
    path: '/',
    exact: true,
    isPrivate: false,
    component: Landing
  },
  {
    path: '/get-started',
    isPrivate: false,
    component: SignUp
  },
  {
    path: '/home',
    exact: true,
    isPrivate: true,
    component: Home
  },
  {
    path: '/upload',
    exact: true,
    isPrivate: true,
    component: UploadProduct
  },
  {
    path: '/posts',
    isPrivate: true,
    component: ProductInfo
  }
]
