import React from 'react';
import './App.css';
import './normal.css';
import TypingEffect from './Components/TypingEffect';
import { useState} from 'react';
import {Switch} from "antd";

function App() {
   
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([])


  // Clearing chatlogs
  async function clearChat(){
    await setChatLog([]);
  }
  


  // Handling Submit requests
  async function handleSubmit(e) {
    e.preventDefault();
  
    let ChatLogNew = [...chatLog,{user : "ME" , message : `${input}`}];
    await setInput("");
    await setChatLog(ChatLogNew)

    const messages = input

    const requestData = {
      message : messages,
      files : []
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/get-query" , {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      await setChatLog([...ChatLogNew, {user: "bot", message: data.message}]);
    } catch (error){
      console.log("Error:",error)
    } 
  }
  
  // On Pressing Enter kay from keyboard
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Main Code
  return (
    <div className="background-container">

      {/* Menubar */}
      <div className="menu-bar">
      <ul className="menu-list">

        {/* Echo Bot Logo */}
        <li className='menu-item a'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width={25}
                height={25}
                viewBox="0 0 512 512"
              >
                <path
                  d="M494.176 64.787c15.4 22.42 20.974 52.758 16.123 88.421-4.751 34.914-19.365 74.181-42.346 113.946 52.234 90.354 58.519 172.178 16.073 214.624-18.729 18.729-45.127 27.981-76.537 27.981-39.777 0-87.598-14.839-138.087-44.017-50.489 29.178-98.309 44.017-138.087 44.017-31.411 0-57.796-9.252-76.525-27.981-42.458-42.434-36.186-124.245 16.036-214.611-10.287-17.806-18.904-35.525-25.724-52.858-.262 0-.511.012-.773.012C19.889 214.321 0 194.444 0 169.992c0-18.23 11.073-33.917 26.834-40.713-.037-31.884 9.514-58.282 27.956-76.724C97.224 10.096 179.036 16.368 269.402 68.59c52.92-30.575 104.057-45.912 145.818-43.83 7.619-13.43 22.046-22.52 38.568-22.52 24.44 0 44.329 19.889 44.329 44.329a44.042 44.042 0 0 1-3.941 18.218zm-8.591 85.067c3.591-26.41.611-48.755-8.616-65.514a44.132 44.132 0 0 1-23.181 6.559c-23.455 0-42.695-18.318-44.217-41.386-33.119-.561-73.32 11.272-115.891 34.104 30.4 20.051 59.741 44.142 87.436 71.836 27.695 27.695 51.773 57.035 71.811 87.423 17.582-32.832 28.805-64.679 32.658-93.022zM473.178 46.569c0-10.686-8.704-19.39-19.39-19.39s-19.39 8.704-19.39 19.39 8.704 19.39 19.39 19.39 19.39-8.703 19.39-19.39zm-6.784 417.577c31.884-31.897 26.273-98.421-13.467-172.689-20.038 30.388-44.117 59.729-71.811 87.423-27.695 27.695-57.023 51.773-87.423 71.824 74.268 39.727 140.804 45.339 172.701 13.442zm-27.507-196.98c-20.35-32.745-45.688-64.367-75.403-94.082-29.715-29.702-61.325-55.053-94.082-75.415-32.757 20.363-64.367 45.713-94.082 75.415-29.702 29.715-55.053 61.325-75.415 94.082 20.363 32.757 45.713 64.367 75.415 94.082 29.715 29.702 61.325 55.053 94.082 75.415 32.757-20.363 64.367-45.713 94.082-75.415 29.715-29.715 55.053-61.337 75.403-94.082zM157.688 155.452c27.682-27.695 57.023-51.773 87.423-71.824-74.28-39.727-140.804-45.338-172.689-13.442-13.093 13.105-20.138 32.358-20.637 56.125 20.899 3.554 36.872 21.784 36.872 43.68 0 15.337-7.818 28.867-19.677 36.835 4.738 11.834 10.375 23.891 16.884 36.062 20.051-30.4 44.13-59.741 71.824-87.436zm87.424 295.252c-30.4-20.051-59.729-44.129-87.423-71.824-27.695-27.695-51.773-57.023-71.824-87.423-39.728 74.268-45.339 140.805-13.442 172.689 31.884 31.897 98.408 26.285 172.689-13.442zM63.719 169.992c0-10.686-8.691-19.39-19.39-19.39-10.686 0-19.39 8.704-19.39 19.39 0 10.699 8.704 19.39 19.39 19.39 10.699 0 19.39-8.691 19.39-19.39z"
                  style={{
                    fill: "#1e0478",
                  }}
                />
                <path
                  d="M453.788 27.179c10.686 0 19.39 8.704 19.39 19.39s-8.704 19.39-19.39 19.39-19.39-8.704-19.39-19.39 8.703-19.39 19.39-19.39z"
                  style={{
                    fill: "#9b8ccc",
                  }}
                />
                <path
                  d="M269.402 201.253c36.348 0 65.913 29.565 65.913 65.913 0 36.336-29.565 65.913-65.913 65.913-36.336 0-65.901-29.577-65.901-65.913 0-36.348 29.565-65.913 65.901-65.913zm40.975 65.913c0-22.595-18.38-40.975-40.975-40.975-22.582 0-40.962 18.38-40.962 40.975s18.38 40.975 40.962 40.975c22.595 0 40.975-18.38 40.975-40.975z"
                  style={{
                    fill: "#1e0478",
                  }}
                />
                <path
                  d="M269.402 226.192c22.595 0 40.975 18.38 40.975 40.975s-18.38 40.975-40.975 40.975c-22.582 0-40.962-18.38-40.962-40.975s18.38-40.975 40.962-40.975z"
                  style={{
                    fill: "#94e7ef",
                  }}
                />
                <path
                  d="M44.329 150.602c10.699 0 19.39 8.704 19.39 19.39 0 10.699-8.691 19.39-19.39 19.39-10.686 0-19.39-8.691-19.39-19.39 0-10.686 8.704-19.39 19.39-19.39z"
                  style={{
                    fill: "#9b8ccc",
                  }}
                />
              </svg>
        </li>

        <li className='menu-item b'>EchoBot</li>
      </ul>
    </div>

      {/* Chat Section */}
        <section className="chat-section-container">

          {/* Chat Log */}
          <div className='chat-log-container' >
                  <div className='chat-log'>

                        {/* Message Log */}
                        {chatLog.map((message) => (
                          < ChatMessage message = {message}/>
                        ))}
                      
              
                  </div >
          </div>

          {/* Web Search Button */}
          <Switch className="switch"
          unCheckedChildren = "Web"
          />
          <Switch className="switch-doc"
          unCheckedChildren = "Doc"
          />

          {/* Chat input */}
          <div className='chat-input-holder'>
    
                  {/* <button className='upload-button' onClick={handleDocs}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                      >
                        <path
                          fill="white"
                          fillRule="evenodd"
                          d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                   </button> */}

                   <textarea className='chat-text-area' rows={1}
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyDown}
                   ></textarea>

                   <button className='submit-button' onClick={handleSubmit}>
                            <span class="icon-wrapper" >
                                    <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                            </span>

                   </button>
        
          </div>

        </section>

        {/* SideMenu */}
        <aside className='sideMenu'>

            <div className='side-menu-button' onClick={clearChat}>
              <span>+</span>
              New Chat
            </div>

            <div className='document-btn'> 
                      Documents
            </div>

            <div className='history-btn'> 
                    Chat History
            </div>

        </aside>

    </div>
  );
}

const ChatMessage = ({message}) => {

  const botSvg = ( <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Layer_1"
                width={42}
                height={42}
                viewBox="0 0 500 500"
                
              >
                <style>
                  {
                    ".st0{fill:#62626a}.st1{fill:#fff;stroke:#62626a;stroke-width:9;stroke-miterlimit:10}"
                  }
                </style>
                <title />
                <g id="Layer_2_1_">
                  <g id="Layer_1-2">
                    <path
                      d="M500 262.8c0 91.8-50.4 176.3-131.1 220H131.1C9.7 417.1-35.6 265.4 30.1 144S247.4-22.8 368.9 42.9C449.6 86.5 500 170.9 500 262.8z"
                      className="st0"
                    />
                    <circle cx={250} cy={112.8} r={60} className="st1" />
                    <circle cx={315} cy={187.8} r={15} className="st1" />
                    <circle cx={185} cy={187.8} r={15} className="st1" />
                    <path
                      d="M400 346v136.8H100V346c0-25.1 17.7-46.8 42.4-51.7l20.1-4 33.3-6.7c35.8-7.1 72.6-7.1 108.4 0l36.2 7.2 17.2 3.5c24.7 4.9 42.4 26.5 42.4 51.7z"
                      className="st1"
                    />
                    <path
                      d="M304.2 283.6c-8-1.6-16.1-2.8-24.2-3.7v-37.1h-60v37.1c-8.1.9-16.2 2.1-24.2 3.7l-33.3 6.7c5 25.6 27.5 44 53.6 44H287c25.9 0 48.2-18.1 53.4-43.4l-36.2-7.3z"
                      className="st1"
                    />
                    <path
                      d="M310 142.8v60c0 33.1-26.9 60-60 60s-60-26.9-60-60v-60M180 112.8h140v30H180z"
                      className="st1"
                    />
                    <circle cx={275} cy={177.8} r={5} className="st0" />
                    <circle cx={225} cy={177.8} r={5} className="st0" />
                    <path
                      d="M270 212.8c0 11-9 20-20 20s-20-9-20-20M330 362.8v31.4a48.02 48.02 0 0 1 0 58.6v30M170 362.8v31.4a48.02 48.02 0 0 0 0 58.6v30"
                      className="st1"
                    />
                    <path
                      d="M250 32.8c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10c0-5.6 4.5-10 10-10z"
                      style={{
                        fill: "#ff9e9d",
                      }}
                    />
                  </g>
                </g>
      </svg> );

      const userSvg = (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="Layer_1"
        width={42}
        height={42}
        data-name="Layer 1"
        viewBox="0 0 366.34 366.34"

      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1={108.28}
            x2={268.26}
            y1={122.42}
            y2={122.42}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#16243f" />
            <stop offset={1} stopColor="#6878b1" />
          </linearGradient>
          <linearGradient
            xlinkHref="#linear-gradient"
            id="linear-gradient-2"
            x1={219.28}
            x2={269.19}
            y1={72.92}
            y2={152.46}
          />
          <style>
            {
              ".cls-1{fill:#de8276}.cls-2{fill:#a76962}.cls-6{fill:none;stroke:#00214e;stroke-miterlimit:10}.cls-7{fill:#00214e}"
            }
          </style>
        </defs>
        <title>{"Artboards_Diversity_Avatars_by_Netguru"}</title>
        <path
          d="M296.41 282a184.56 184.56 0 0 1-226.48-1l48.66-22.81a46.83 46.83 0 0 0 6.65-3.82c.64-.44 1.28-.9 1.89-1.38a46.35 46.35 0 0 0 12.78-15.09 44.69 44.69 0 0 0 4.64-14.48 67.91 67.91 0 0 0 .74-9.91c0-5.72-.31-11.44-.37-17.17q-.06-4.76-.1-9.51l2 1 5.2 2.69 2.41.41 27.88 4.74 31.12 5.3.94 32 .31 10.46.15 5.08v.33l12.1 4.92Z"
          className="cls-1"
        />
        <path
          d="M214.63 248.85a16 16 0 0 1-10.07-1.56l-59.67-48.78c-.07-2.26-.13.11-.16-2.15q-.06-4.76-.1-9.51l2 1 5.2 2.69 2.41.41 27.88 4.74 31.12 5.3.94 32 .31 10.46.15 5.08v.33Z"
          className="cls-2"
        />
        <path
          d="M245.43 159.9a35.93 35.93 0 0 1-5.09 4.41c-10.4 7.53-24.28 10-36.14 14.06-5 1.71-59.22 17.12-59.22 20.47 0-.73-5.31-6-12-12.4a79.91 79.91 0 0 1-19.56-85.74c10.91-28.67 45.69-48.43 74.82-53 13.87-2.17 30.33-3.38 43.14 3.27 6.55 3.41 12 8.38 17 13.89q2.34 2.61 4.54 5.33c.63.76 1.25 1.52 1.86 2.29 22.77 28.6 14.7 62.15-9.35 87.42Z"
          style={{
            fill: "url(#linear-gradient)",
          }}
        />
        <path
          d="M245.43 159.9a35.93 35.93 0 0 1-5.09 4.41 22.42 22.42 0 0 1-1.15-2.3c-2.64-6-4-12.51-5-19a275.93 275.93 0 0 1-3.19-28.52c-.91-15.34-7.46-22.95 5.57-34.91a43 43 0 0 1 16.35-9.38c.63.76 1.25 1.52 1.86 2.29 22.77 28.59 14.7 62.14-9.35 87.41Z"
          style={{
            fill: "url(#linear-gradient-2)",
          }}
        />
        <circle
          cx={134.98}
          cy={158.85}
          r={17}
          style={{
            fill: "#e18477",
          }}
        />
        <circle cx={140.38} cy={158.85} r={15.22} className="cls-2" />
        <path
          d="M141.65 142.73c.83 10.86.8 24.12 1.09 28q1.13 14.59 2.24 29.17l66.44 38.81a19.76 19.76 0 0 0 24.68-9.85c9.56-19.58 24.9-50.5 22.88-62-3-17-11-23-11-23l3.33-19.94c3.37-20.27-3.58-39.46-27.26-41.68-5-.46-10.57.49-13.54 4.48-8 10.76-3.39 24-15.4 34-14.58 12.03-47.11 17.28-54.73 7.57 0 0 .7 6.87 1.27 14.44Z"
          className="cls-1"
        />
        <path
          d="M191.51 185.15a29.78 29.78 0 0 0 18.54 9.69M215.13 137.94c-.08.35 13.36 36.13 13.36 36.13l-17.94.87"
          className="cls-6"
        />
        <circle cx={190.67} cy={150.58} r={15.16} className="cls-7" />
        <circle cx={242.03} cy={148.13} r={15.16} className="cls-7" />
        <path
          d="m202.93 151.47 25.53-2.18M172.65 131a80.58 80.58 0 0 1 28.13-.8M231.7 131.13a55 55 0 0 1 17.45-1.21"
          className="cls-6"
        />
        <path
          d="M296.41 282a184.56 184.56 0 0 1-226.48-1l48.66-22.81a46.83 46.83 0 0 0 6.65-3.82c.64-.44 1.28-.9 1.89-1.38a46.35 46.35 0 0 0 12.78-15.09 44.69 44.69 0 0 0 4.64-14.48 28.66 28.66 0 0 0 2.22 1.94 95.14 95.14 0 0 0 19.82 11.26 99 99 0 0 0 10.46 3.69 93.52 93.52 0 0 0 33 3.49c1.54-.12 3.09-.27 4.63-.38l.15 5.08v.33l12.1 4.92ZM186.28 142.24c6.1 0 6.1 9.38 0 9.43H186c-6.11 0-6.11-9.38 0-9.43h.27ZM236.41 140.85c5.66.05 5.66 8.7 0 8.75h-.26c-5.66 0-5.66-8.7 0-8.75h.26Z"
          className="cls-7"
        />
      </svg>
      )

  return (
    <div className={`chat-message ${message.user === "bot" && "EchoBot"}`}>
    <div className='chat-message-center'>
      <div className={`avatar ${message.user === "bot" && "EchoBot"}`}>
      {message.user === "bot" ? botSvg : userSvg}
      </div>
      <div className='message'>
      <TypingEffect
            text={message.message}
      />
      </div>
    </div>
  </div>
  )
}

export default App;
