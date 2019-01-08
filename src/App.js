import React, { Component } from 'react';
import './App.css';
import Speech from  './recog'

class App extends Component {
  render() {
    
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      return (
        <div className="App">
          <Speech />
        </div>
      );
    } else {
      return (
        <div className="Recog-text-div Recog-text">
          กรุณาใช้ Chrome browser เท่านั้น
        </div>
      );
    }
  }
}

export default App;
