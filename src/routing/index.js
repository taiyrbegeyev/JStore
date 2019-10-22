import Landing from 'pages/Landing/LandingPage'
import SignUp from 'pages/SignUp/SignUpPage'
import Home from 'pages/Home/HomePage'
import UploadProduct from 'pages/UploadProduct/UploadProductPage'
import ProductInfo from 'pages/ProductInfo/ProductInfo'
import Profile from 'pages/Profile/Profile'
import TermsAndConditions from 'pages/TermsAndConditions/TermsAndConditions'
import PrivacyPolicy from 'pages/PrivacyPolicy/PrivacyPolicy'
import Impressum from 'pages/Impressum/Impressum'

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
  },
  {
    path: '/profile',
    isPrivate: true,
    component: Profile
  },
  {
    path: '/feedback',
    isPrivate: false,
    component: () => {
      window.location.href = 'https://forms.gle/VcLFuETwcjxTEWR56'; 
      return null;
    }
  },
  {
    path: '/terms_and_conditions',
    isPrivate: false,
    component: TermsAndConditions
  },
  {
    path: '/privacy_policy',
    isPrivate: false,
    component: PrivacyPolicy
  },
  {
    path: '/impressum',
    isPrivate: false,
    component: Impressum
  },
  {
    path: '*',
    exact: true,
    isPrivate: false,
    component: Landing
  }
]
