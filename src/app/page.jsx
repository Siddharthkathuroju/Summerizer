"use client";
import React, { useState } from 'react';
import Form from './components/Form';
import Feed from './components/Feed';
import '../../styles/globals.css';

const Home = () => {
  const [showFeed, setShowFeed] = useState(false);

  const handleUploadClick = () => {
    setShowFeed(true);
  };

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className="head_text text-center">
        discover and share!
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Mr.Summerizer</span>
        <p className="desc text-center">Mr.Summerizer is an AI-powered tool for the modern world to summarize information</p>
      </h1>
      <button onClick={handleUploadClick} className="upload-btn">
        Upload PDF
      </button>
      {showFeed ? <Feed /> : <Form />}
    </section>
  );
}

export default Home;
