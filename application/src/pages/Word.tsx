import * as React from 'react';
import LLPage from './Page';

class LLWord extends LLPage {
    state = {
      word: "Tea",
      pronunciation: [
        {language: "English", sound: "Chai"},
        {language: "Arabic", sound: "تشاي"},
      ],
      sentences: [
        "I want to drink tea",
        "Do you want to drink tea?",
        "I want tea and fried rice"
      ]
    }
    render() {
        return (
          <div>
            <h1><i className="far fa-file-word"></i> <b>{this.state.word}</b></h1>
            <div className="card">
              <h2><i className="fas fa-microphone-alt"></i> Pronunciation:</h2>
              <ul>
                {
                  this.state.pronunciation.map((val,id) => {
                    return <li key={id}>{val.language}: {val.sound}</li>;
                  })
                }
              </ul>
            </div>
            <div className="card">
              <h2><i className="fas fa-search"></i> Related Sentences:</h2>
              <ul>
                {
                  this.state.sentences.map((val, id) => {
                    return <li key={id}>{val}</li>;
                  })
                }
              </ul>
            </div>
          </div>
        );
    }
}

export default LLWord;
