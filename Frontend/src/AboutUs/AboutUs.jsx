
import React from 'react'

import Banner from './Banner'
import Statistics from './Statistics'
import Team from './Team'
import WhyUs from './WhyUs'



const AboutUs = () => {
  return (
    <>

      <Banner />
      <Statistics />
      <Team />
      <WhyUs />



    </>
  )
}

export default AboutUs

import React from 'react'
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';
import Banner from './Banner'
import Statistics from './Statistics'
import Team from './Team'
import WhyUs from './WhyUs'



const AboutUs = () => {
  return (
    <>
      <Header />
      <Banner />
      <Statistics />
      <Team />
      <WhyUs />

      <Footer />

    </>
  )
}

export default AboutUs

