import React from 'react'
import Banner from './Banner'
import BrandLogos from './BrandLogos'
import FeaturedProducts from './FeaturedProducts'
import Header from './Header'
// import Testimonials from './Testimonials'
// import Statistics from './Statistics'
import ProductListing from './productListing'
import Footer from '../Homepage/Footer'
import StatisticsBar from './StatisticsBar'



const Homepage = () => {
  return (
    <>
      <Header />
      <Banner />
      <BrandLogos />
      <FeaturedProducts />
      <StatisticsBar />
      <ProductListing />
      <Footer />
      
    </>
  )
}

export default Homepage
