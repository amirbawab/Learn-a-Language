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
                    <li>Create a new repository: <code>my-language</code></li>
                    <li>Clone your repository: <code>git clone https://github.com/USERNAME/my-language.git</code></li>
                    <li>Open a new terminal and type: <br/> <code>cd my-language/ && git submodule add https://github.com/amirbawab/Learn-a-Language.git</code></li>
                    <li>Create a diretory to store your words JSON files: <code>mkdir data</code></li>
                    <li>Install packages: <code>npm install --prefix ./Learn-a-Language/application/</code></li>
                    <li>Start application: <code>LL_DATA_DIR="$PWD/data/" npm run application --prefix ./Learn-a-Language/application/</code></li>
                    <li>Open your browser at <a href="http://localhost:3000/">http://localhost:3000/</a></li>
                    <li><a href="#add-word">Add new words</a> into the <code>data</code> directory</li>
                    <li>Upon create or save, the application should automatically refresh</li>
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
                <div>
                  In the <code>native_form</code> JSON property, use <code>#</code> followed by the alias of
                  the word you would like to reference. (e.g. <code>#tea</code>)
                </div>
              </section>
              <section>
                <h4>Publish to Github pages</h4>
                <div>
                  <ul>
                    <li>Create github worflows directory: <code>mkdir -p .github/workflows/</code></li>
                  </ul>
                </div>
              </section>
            </LLBasicCard>
          </div>
        </div>
      </div>
    );
  }
}

export default LLInfo;
