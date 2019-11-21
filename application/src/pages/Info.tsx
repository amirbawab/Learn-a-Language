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
              <b>How to use this app?</b>
              <p>Start by cloning and installing dependencies:</p>
              <code><pre>{`
git clone https://github.com/amirbawab/learn-a-language
cd learn-a-language/
npm install
npm run application
`}
              </pre></code>
              <hr/>
              <b>How to add a new Word?</b>
              <p>Create a new JSON file and place it inside the <code>data/</code> directory located at the root of this project. 
                 <u>The page should automatically update.</u></p>
              <code><pre>
              {`
{
  "word":"Tea",
  "alias":"tea",
  "native_form":["茶"],
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
  ],
  "pronunciation":[
    {
      "language":"English",
      "sound":"Chai"
    }
  ]
}
                `}
              </pre></code>

              <hr/>
              <b>How to reference another word?</b>
              <p>
                In the <code>native_form</code> JSON property, use <code>#</code> followed by the alias of
                the word you would like to reference. (e.g. <code>#tea</code>)
              </p>
            </LLBasicCard>
          </div>
        </div>
      </div>
    );
  }
}

export default LLInfo;
