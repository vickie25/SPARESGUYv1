import React from 'react'
import Banner from './Banner'
import BrandLogos from './Brandlogos'
import FeaturedProducts from './FeaturedProducts'
import Header from './Header'
// import Testimonials from './Testimonials'
// import Statistics from './Statistics'
import ProductListing from './Productlisting'
import Footer from './Footer'
import StatisticsBar from './StatisticsBar'

 

const Homepage = () => {
  return (
    <>
      <Header/>
      <Banner/>
      <BrandLogos/>
      <FeaturedProducts/>
      <ProductListing/>
      <StatisticsBar/>
      <Footer/>
    </>
  )
}

export default Homepage