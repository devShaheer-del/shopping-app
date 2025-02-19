import React from 'react'
import Hero from '../components/Hero'
import Cards from '../components/Cards'

function Home() {
  return (
    <>

    <div className="container">
        <Hero/>
        <div className="cards-container">
        <Cards/>
        </div>
    </div>
    
    </>
  )
}

export default Home
