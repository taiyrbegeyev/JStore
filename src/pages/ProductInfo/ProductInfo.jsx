import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Footer, HomePageHeader } from 'components/export'
import {
  MainContainer, ProductDetails,
  DescriptionContainer, ImageContainer,
  Image, TitleContainer, OwnerInfoContainer,
  OwnerInfo, ProductSpecificationsContainer,
  PreferredPaymentOptions, ProductInfo1, ProductInfo2
} from './styles'
import { Avatar, Typography, Link, Chip } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { fetchPost } from 'firebase/display.js'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  },
  palette: {
    primary: {
      main: '#004180',
    },
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
  }
})

class ProductInfo extends Component {
  state = {
    data: null,
    error: null,
    loading: false
  }
  
  componentWillMount() {
    this.setState({
      loading: true
    })
    // extract id of post from url
    const postId = window.location.pathname.split('/')[2]
    console.log(postId)
    fetchPost(postId, () => {
      this.setState({
        error: true,
        loading: false
      })
    }, (data) => {
      this.setState({
        data,
        loading: false
      })
    })
  }
  
  render() {
    const { classes } = this.props
    const { data, error, loading } = this.state

    if (error) {
      return <Redirect to='/home' />
    }

    if (loading) {
      return null
    }

    console.log(data.imageUrl)
    
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
                <Typography gutterBottom variant="h5" component="h2">
                  {data.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h4" className={classes.price}>
                  €{data.price}
                </Typography>
                <OwnerInfoContainer>
                  <Avatar className={classes.avatar}>TB</Avatar>
                  <OwnerInfo>
                    <Typography variant="h7" component="h4">
                      {data.ownerName}
                    </Typography>
                    <Typography variant="h7" component="h4">
                      <Link href={`mailto:${data.ownerId}`}>
                        {data.ownerId}
                      </Link>
                    </Typography>
                  </OwnerInfo>
                </OwnerInfoContainer>
              </TitleContainer>
              <ProductSpecificationsContainer className={classes.product_details}>
                <Typography gutterBottom variant="h5" component="h2">
                  Product Details
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Category: {data.category}
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Condition: {data.condition}
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Product Uploaded: {data.creationDate.toDate().toString()}
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
