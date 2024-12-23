"use client";
import React from 'react'
import Form from './components/Form'
import '../../styles/globals.css'
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className="head_text text-center">
        discover and share!
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Mr.Summerizer</span>
        <p className="desc text-center">Mr.Summerizer is an  AI powered tool for modern world to summerize information </p>
      </h1>
      <Form />
    </section>
    
  )
}

export default Home
