import React, { Component } from 'react'
import { auth } from 'firebase.js'
import { fetchPost } from 'firebase/display.js'
import { displayDate, cutFullName, generateWhatsAppLink, generateeMail } from 'helpers.js'
import { Redirect } from 'react-router-dom'
import { Footer, HomePageHeader } from 'components/export'
import {
  MainContainer, ProductDetails,
  ImageContainer, Image, TitleContainer, OwnerInfoContainer,
  OwnerInfo, ProductSpecificationsContainer,
  PreferredPaymentOptions, ProductInfo1, ProductInfo2,
  BuyProduct
} from './styles'
import { Avatar, Typography, Link, Chip, Fab } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { Email, WhatsApp, Edit } from '@material-ui/icons'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  },
  palette: {
    primary: {
      main: '#004180',
    },
    secondary: {
      main: '#25D366',
      contrastText: '#fff',
    }
  },
})

const useStyles = theme => ({
  avatar: {
    width: '5rem',
    height: '5rem'
  },
  price: {
    color: '#004180',
    fontWeight: '700'
  },
  product_details: {
    color: '#404142'
  },
  chip: {
    margin: 2
  },
  names: {
    fontWeight: 550
  },
  margin: {
    margin: theme.spacing(1),
    textTransform: 'none',
    '&:hover': {
      color: '#fff',
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
})

class ProductInfo extends Component {
  state = {
    data: null,
    error: null,
    isOwner: null,
    loading: false,
  }
  
  componentWillMount() {
    this.setState({
      loading: true
    })
    // extract id of post from url
    const postId = window.location.pathname.split('/')[2]
    fetchPost(postId, () => {
      this.setState({
        error: true,
        loading: false
      })
    }, (data) => {
      this.setState({
        data,
        isOwner: auth.currentUser.email === data.ownerId,
        loading: false
      })
    })
  }

  handleButtons = (isOwner) => {
    const { classes } = this.props
    const { data } = this.state
    if (isOwner) {
      return (
        <Fab
          variant="extended"
          size="medium"
          color="default"
          aria-label="add"
          className={classes.margin}
          href={generateeMail(data.ownerId, auth.currentUser.displayName, data.title, window.location.href, data.imageUrl)}
        >
          <Edit className={classes.extendedIcon} />
          Edit
        </Fab>
      )
    }
    else {
      if (data.whatsApp && data.phoneNumber) {
        return (
          <React.Fragment>
            <Fab
              variant="extended"
              size="medium"
              color="default"
              aria-label="add"
              className={classes.margin}
              href={generateeMail(data.ownerId, auth.currentUser.displayName, data.title, window.location.href, data.imageUrl)}
              target="_blank"
            >
              <Email className={classes.extendedIcon} />
              Write me an email
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              className={classes.margin}
              href={generateWhatsAppLink(data.phoneNumber, auth.currentUser.displayName, data.title, window.location.href, data.imageUrl)}
              target="_blank"
            >
              <WhatsApp className={classes.extendedIcon} />
              Drop me a message
            </Fab>
          </React.Fragment>
        )
      }
      else {
        return (
          <Fab
            variant="extended"
            size="medium"
            color="default"
            aria-label="add"
            className={classes.margin}
            href={generateeMail(data.ownerId, auth.currentUser.displayName, data.title, window.location.href, data.imageUrl)}
          >
            <Email className={classes.extendedIcon} />
            Write me an email
          </Fab>
        )
      }
    }
  }
  
  render() {
    const { classes } = this.props
    const { data, isOwner, error, loading } = this.state

    if (error) {
      return <Redirect to='/home' />
    }

    if (loading) {
      return null
    }

    return (
      <MuiThemeProvider theme={theme}>
        <HomePageHeader />
        <MainContainer>
          <ImageContainer>
            <Image src={data.imageUrl} />
          </ImageContainer>
          <ProductDetails>
            <ProductInfo1>
              <TitleContainer>
                <Typography gutterBottom variant="h5" component="h2" className={classes.names}>
                  {data.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h4" className={classes.price}>
                  €{data.price}
                </Typography>
                <OwnerInfoContainer>
                  <Avatar className={classes.avatar}>{data.ownerName ? cutFullName(data.ownerName) : 'N.A'}</Avatar>
                  <OwnerInfo>
                    <Typography variant="h7" component="h4">
                      {data.ownerName || 'N.A'}
                    </Typography>
                    <Typography variant="h7" component="h4">
                      <Link href={`mailto:${data.ownerId}`}>
                        {data.ownerId}
                      </Link>
                    </Typography>
                  </OwnerInfo>
                </OwnerInfoContainer>
                <BuyProduct>
                  {
                    this.handleButtons(isOwner)
                  }
                </BuyProduct>
              </TitleContainer>
              <ProductSpecificationsContainer className={classes.product_details}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.names}>
                  Product Details
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Category: {data.category}
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Condition: {data.condition}
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Product Uploaded: {displayDate(data.creationDate.toDate().toString())}
                </Typography>
                <PreferredPaymentOptions>
                  {
                    data.paymentOptions.map((paymentOption, index) => {
                      let label
                      switch(paymentOption) {
                        case 'cash':
                          label = "Cash"
                          break
                        case 'bank_transfer':
                          label = "Paypal"
                          break
                        case 'paypal':
                          label = "Bank Transfer"
                          break
                        case 'meal_plan':
                          label = "Meal Plan"
                          break
                        default:
                          label = 'Unknown'
                          break
                      }
                      return (
                        <Chip label={label} key={index} color="primary" className={classes.chip} />
                      )
                    })
                  }
                </PreferredPaymentOptions>
              </ProductSpecificationsContainer>
            </ProductInfo1>
            <ProductInfo2>
              <Typography gutterBottom variant="h6" component="h3">
                {data.description}
              </Typography>
            </ProductInfo2>
          </ProductDetails>
        </MainContainer>
        <Footer />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(useStyles)(ProductInfo)
