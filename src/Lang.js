import React, { Component } from 'react';

class LangSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      langList: [
        {
          name: 'ภาษาไทย',
          lang: 'th-TH'
        },
        {
          name: 'English',
          lang: 'en-US'
        },
        {
          name: '普通话 (中国大陆)',
          lang: 'cmn-Hans-CN'
        },
        {
          name: '日本語',
          lang: 'ja-JP'
        }
      ]
    }
  }

  closed = () => {
    document.getElementById('SeLang').style.display = 'none'
  }

  selected = (lang) => {
    this.props.selected(lang)
  }

  render() {
    return (
    <div className='Lang-component' id='SeLang'>
    <div className='Lang-close' onClick={()=>this.closed()}>ปิด</div>
    {
      this.state.langList.map((x,i) => (
        <div 
        className='Lang-each-div'
        key={i}
        onClick={()=> this.selected(x.lang)}>{x.name}</div>
      ))
    }
    </div>
    );
  }
}


export default LangSelector