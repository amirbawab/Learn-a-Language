import * as React from 'react';
import LLTitle from '../components/Title';
import {LLBasicCard} from '../components/Card';

export interface LLInfoProps {}
export interface LLInfoState {}
 
class LLInfo extends React.Component<LLInfoProps, LLInfoState> {
  state = {}

  render() {
    return (
      <div className="m-2">
        <LLTitle>Welcome</LLTitle>
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <section>
                <h4>How to use this application</h4>
                <div>
                  <ul>
                    <li>Fork the <a href="https://github.com/amirbawab/Learn-a-Language">repository</a></li>
                    <li>Clone your forked version: <code>git clone https://github.com/YOUR_USERNAME/Learn-a-Language</code></li>
                    <li>In a new terminal type: <code>cd Learn-a-Language/application/ && npm install && npm run application</code></li>
                    <li>Open browser at <code>http://localhost:3000/</code> (or select the corresponding port if 3000 was occupied)</li>
                    <li><a href="#add-word">Add a new word</a> by creating a JSON file inside <code>Learn-a-Language/application/data/</code> directory</li>
                    <li>Upon creating or saving a JSON file, the application should automatically refresh</li>
                    <li>Add, commit and push your JSON files to your Github repository</li>
                  </ul>
                </div>
              </section>
              <hr/>
              <section id="add-word">
                <h4>Word JSON file</h4>
                <p>Example of a word JSON file</p>
                <code style={{display: "block", whiteSpace: "pre-wrap"}}>
              {`{
  "word":"Tea",
  "alias":"tea",
  "native_form":["茶"],
  "pronunciation":[
    {
      "language":"English",
      "sound":"Chai"
    }
  ],
  "example":[
    {
      "sentence":"I want tea",
      "pronunciation":[
        {
          "language":"English",
          "sound":"wo yao chai"
        }
      ]
    }
  ]
}`}
                </code>
              </section>
              <hr/>
              <section>
                <h4>How to reference another word?</h4>
                <p>
                  In the <code>native_form</code> JSON property, use <code>#</code> followed by the alias of
                  the word you would like to reference. (e.g. <code>#tea</code>)
                </p>
              </section>
            </LLBasicCard>
          </div>
        </div>
      </div>
    );
  }
}

export default LLInfo;
