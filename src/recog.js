import React, { Component } from 'react';
import './App.css';


class Speech extends Component {
  constructor() {
    super()
    this.state = {
      listening: false,
      interim: `เริ่มแปลงเสียงพูดได้ด้วยกดปุ่ม 'ฟังเลย' ตรงบนขวา`,
      text: ''
    }
    this.recognition = ''
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.continous = true
      this.recognition.interimResults = true
      this.recognition.lang = 'th-TH'
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen = () => {
    let { recognition } = this
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      console.log('listening?', this.state.listening)
      if (this.state.listening) {
        recognition.start()
        recognition.onend = () => {
          console.log("...continue listening...")
          recognition.start()
        }
      } else {
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening per click")
        }
      }

      recognition.onstart = () => {
        console.log("Listening!")
      }

      let finalTranscript = ''
      recognition.onresult = event => {
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + ' ';
          else interimTranscript += transcript;
        }
        this.setState({ interim: interimTranscript })
        this.setState({ text: finalTranscript })

      //-------------------------COMMANDS------------------------------------

        const transcriptArr = finalTranscript.split(' ')
        const stopCmd = transcriptArr.slice(-3, -1)
        console.log('stopCmd', stopCmd)

        if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
          recognition.stop()
          recognition.onend = () => {
            console.log('Stopped listening per command')
            const finalText = transcriptArr.slice(0, -3).join(' ')
            document.getElementById('final').innerHTML = finalText
          }
        }
      }
      
    //-----------------------------------------------------------------------
      
      recognition.onerror = event => {
        console.log("Error occurred in recognition: " + event.error)
      }
    }
  }

  render() {
    console.log(window.webkitSpeechRecognition)
    return (
      <div className='Recog'>
        <button 
        id='microphone-btn'
        className='Recog-btn'
        onClick={this.toggleListen} 
        style={{ backgroundColor: this.state.listening ? 'red' : 'green'}}
        >{this.state.listening ? 'หยุดฟัง' : 'ฟังเลย'}</button>
        <div className='Recog-text-div '>
          <div className='Recog-text'>
          <p className='Recog-complete-text'>{this.state.text}</p>
          <p className='Recog-interim-text'>{this.state.interim}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Speech