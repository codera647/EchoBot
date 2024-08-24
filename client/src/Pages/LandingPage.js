import React from 'react';
import './LandingPage.css';
import { Link } from "react-router-dom";
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import logo from './logo6.png';

const LandingPage = () => {

  const [text] = useTypewriter({
    words: ['RAG', 'LLM', 'LangChain'],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 50,
    delaySpeed: 1500, 
  });

  return (
    <div className="landing-page">
      <div className="content">

        <h1 style={{margin:'0px'}}>
          EchoBot
          <span style={{fontWeight: 'bold',color:'#FFC0CB',marginLeft: '10px',fontSize:'2rem'}}>
            {text}
          </span>
          <span style={{color: '#7209b7'}}>
            <Cursor />
          </span>
        </h1>


         <p className='text'>Echo Bot is an advanced chatbot designed to help you find answers to your questions effortlessly. Whether you're looking for information from specific documents like PDFs, text, images, or code files, or need to perform web searches during your queries, Echo Bot has you covered. It's your go-to solution for quick, reliable answers from a variety of sources.
        </p>
        <Link to="/bot"><button className="cta-button">Get Started</button></Link>
        <button className="login-button">Log In</button>
      </div>

      <div className="half-circle-background">
          <img src={logo} alt="Animated Robot" className="robot-animation" />
      </div>

    </div>
  );
}

export default LandingPage;
