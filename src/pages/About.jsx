import React from 'react'
import AboutUsComp from '../components/AboutUsComp';
import { useAuth } from '../../context/auth';
function About() {

  const { auth } = useAuth();

  return (
    <>

      <AboutUsComp />
      <pre>
        {
          JSON.stringify(auth, null, 4)
        }
      </pre>
    </>
  )
}

export default About
