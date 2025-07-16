import React from 'react'
import Hero from './Hero'
import FeaturedSection from './FeaturedSection'
import AboutSection from './AboutSection'
import FeaturedClasses from './FeaturedClasses'
import Testimonials from './Testimonials'
import TeamSection from './TeamSection'
import NewsletterSection from './NewsletterSection'

const RootLayout = () => {
  return (
    <div>
      <Hero/>
      <FeaturedSection/>
      <AboutSection/>
      <FeaturedClasses/>
      <Testimonials/>
      <TeamSection/>
      <NewsletterSection/>
    </div>
  )
}

export default RootLayout