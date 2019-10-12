import React, { Component } from 'react'
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
  render() {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <HomePageHeader />
        <MainContainer>
          <ImageContainer>
            <Image src="https://source.unsplash.com/random" />
          </ImageContainer>
          <ProductDetails>
            <ProductInfo1>
              <TitleContainer>
                <Typography gutterBottom variant="h5" component="h2">
                  Macbook Pro 15 2019
                </Typography>
                <Typography gutterBottom variant="h6" component="h4" className={classes.price}>
                  €1000
                </Typography>
                <OwnerInfoContainer>
                  <Avatar className={classes.avatar}>TB</Avatar>
                  <OwnerInfo>
                    <Typography variant="h7" component="h4">
                      Taiyr Begeyev
                    </Typography>
                    <Typography variant="h7" component="h4">
                      <Link href="mailto:t.begeyev@jacobs-university.de">
                        t.begeyev@jacobs-university.de
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
                  Category: Electrnics and smth
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Condition: New
                </Typography>
                <Typography gutterBottom variant="h7" component="h4">
                  Product Uploaded: 12.10.2019
                </Typography>
                <PreferredPaymentOptions>
                  <Chip label="Cash" color="primary" className={classes.chip} />
                  <Chip label="Paypal" color="primary" className={classes.chip} />
                  <Chip label="Bank Transfer" color="primary" className={classes.chip} />
                  <Chip label="Meal Plan" color="primary" className={classes.chip} />
                </PreferredPaymentOptions>
              </ProductSpecificationsContainer>
            </ProductInfo1>
            <ProductInfo2>
              <DescriptionContainer>
              </DescriptionContainer>
            </ProductInfo2>
          </ProductDetails>
        </MainContainer>
        <Footer isAuth={this.props.isAuth} />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(useStyles)(ProductInfo)
