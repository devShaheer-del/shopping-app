import React from 'react'
import Hero from '../components/Hero'
import Cards from '../components/Cards'
import { useAuth } from '../../context/auth'
function Home() {

  const {auth , setauth} = useAuth();

  return (
    <>

    <div className="container">
        <Hero/>
        <div className="cards-container">
        {/* <Cards/> */}
        
        </div>
    </div>
    
    </>
  )
}

export default Home
