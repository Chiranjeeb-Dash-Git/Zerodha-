import React from 'react'
import NavBar from './NavBar'
import Hero from './Hero'
import Awards from './Awards'
import Stats from './Stats'
import Education from './Education'
import Pricing from './Pricing'
import Varsity from './Varsity'
import OpenAccount from './OpenAccount'
import Footer from './Footer'

function HomePage() {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="sections-wrapper">
        <Hero />
        <Awards />
        <Stats />
        <Education />
        <Pricing />
        <Varsity />
        <OpenAccount />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage;