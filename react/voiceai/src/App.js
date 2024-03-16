import React, { useState, useEffect } from 'react';
import speechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import giphy from './assets/giphy.gif'
import AI from './assets/AI.jpg'
import './App.css'

function App() {
  // const [response, setResponse] = useState("");

  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const { listening, transcript } = useSpeechRecognition();

  async function processSpeech(transcript) {
    setThinking(true);
    const responses = {
      "hello": "Hi",
      "shakib": "Sadique",
      "bye": "Goodbye",
      "How are you": "I am good",
      "What's your role": "I am Waiter less Ai"
    };
    let response = "";
    for (const keyword in responses) {
      if (transcript.toLowerCase().includes(keyword.toLowerCase())) {
        response = responses[keyword];
        break;
      }
      else {
        response = "I didn't get you"
      }
    }
    // setResponse(response);
    setThinking(false);
    return response;
  }
  

  useEffect(() => {
    if (!listening && transcript) {
      processSpeech(transcript).then(response => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
        setAiText(response);
      });
    }
  }, [transcript, listening]);
  

  return (
    <div>
      <p>{listening ? "Go ahead, I'm listening" : "Click the button and ask anything"}</p>
      <button onClick={() => speechRecognition.startListening()}>
        Ask me anything
      </button>
      {transcript && <div>{transcript}</div>}
      {thinking && <div>...Thinking</div>}
        <div style={{display: 'block', paddingLeft: '600px', paddingTop: '1px'}} className="animated-picture-container">
          <img src={AI} alt="Animated" 
          className={aiText ? 'animated-picture' : 'aiTextPicture'} />
        </div>
      {aiText && <div style={{paddingLeft: '610px'}}>{aiText}</div>}
    </div>
  );
}

export default App;

