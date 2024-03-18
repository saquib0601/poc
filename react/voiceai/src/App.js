import React, { useState, useEffect } from 'react';
import speechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import AI from './assets/AI.jpg'
// import video from './assets/video.mp4'
import video from './assets/videoo.mov'
import './App.css'

function App() {
  // const [response, setResponse] = useState("");

  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const utteranceRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [caption, setCaption] = useState("");

  async function processSpeech(transcript) {
    setThinking(true);
    const responses = {
      "hello": "listening, transcript, resetTranscript listening, transcript, resetTranscript listening, transcript, resetTranscript listening, transcript, resetTranscript",
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
        utteranceRef.current = utterance; // Store the utterance reference

        utterance.onstart = () => {
          setCaption("Speaking...");
        };
        utterance.onend = () => {
          videoRef.current.pause();
          setCaption("");
          setAiText("");
        };
        
        speechSynthesis.speak(utterance);
        setAiText(response);
        resetTranscript();
        // setTimeout(() => {
        //   setAiText("");
        // }, 2000);
      });
    }
  }, [transcript, listening]);


  useEffect(() => {
    if (aiText) {
      // Start playing the video
      videoRef.current.play();

      // Stop the video after 5 seconds
      // const timeout = setTimeout(() => {
      //   videoRef.current.pause();
      // }, 5000);
      // console.log(aiText, "line 64")
      // return () => clearTimeout(timeout);
    }
  }, [aiText]);


  return (
    <div className="container">
      <h1 className="title">{listening ? "Go ahead, I'm listening" : "Click the button and ask anything"}</h1>
      <button className="button" onClick={() => speechRecognition.startListening()}>
        Ask me anything
      </button>
      {transcript && <div className="transcript">{transcript}</div>}
      {thinking && <div className="thinking">...Thinking</div>}
      <div className="animated-picture-container">
        {/* <img src={AI} alt="Animated" className={aiText ? 'animated-picture' : 'aiTextPicture'} /> */}
        {/* <video style={{height: 'auto', width: '250px'}} loop ref={videoRef} src={video} /> */}
        <video loop ref={videoRef} src={video} />
        {caption && <div className="caption">{caption}</div>}
      </div>
      {/* {aiText && <div className="aiText">{aiText}</div>} */}
    </div>
  );
}

export default App;

