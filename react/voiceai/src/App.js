import React, { useState, useEffect } from 'react';
import speechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import AI from './assets/AI.jpg'
import './App.css'

function App() {
  // const [response, setResponse] = useState("");

  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const { listening, transcript, resetTranscript } = useSpeechRecognition();

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
        resetTranscript();
        setTimeout(() => {
          setAiText("");
        }, 2000);
      });
    }
  }, [transcript, listening]);
  

  return (
    <div className="container">
      <h1 className="title">{listening ? "Go ahead, I'm listening" : "Click the button and ask anything"}</h1>
      <button className="button" onClick={() => speechRecognition.startListening()}>
        Ask me anything
      </button>
      {transcript && <div className="transcript">{transcript}</div>}
      {thinking && <div className="thinking">...Thinking</div>}
      <div className="animated-picture-container">
        <img src={AI} alt="Animated" className={aiText ? 'animated-picture' : 'aiTextPicture'} />
      </div>
      {aiText && <div className="aiText">{aiText}</div>}
    </div>
  );
}

export default App;

