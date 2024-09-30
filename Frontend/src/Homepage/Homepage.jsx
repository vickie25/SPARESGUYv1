import React from 'react'
import Banner from './Banner'
import BrandLogos from './Brandlogos'
import FeaturedProducts from './Featuredproducts'
import Header from './Header'
import Testimonials from './Testimonials'
import Statistics from './Statistics'
import ProductListing from './Productlisting'
import Footer from './Footer'

 

const Homepage = () => {
  return (
    <>
      <Header />
      <Banner />
      <BrandLogos />
      <FeaturedProducts />
      <ProductListing />
      <Testimonials />
      <Statistics />
      <Footer />
    </>
  )
}

export default Homepage