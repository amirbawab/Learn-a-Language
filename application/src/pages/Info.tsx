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
                    <li>[Optional] <a href="#publish">Publish to Github pages</a></li>
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
              <hr/>
              <section id="publish">
                <h4>Publish to Github pages</h4>
                <div>
                  <ul>
                    <li>Go to Account Settings > Developer Settings > Personal access token</li>
                    <li>Generate a new token with access scope: <code>repo</code> and <code>workflow</code></li>
                    <li>Copy the generated token</li>
                    <li>Go to Repository Settings > Secrets</li>
                    <li>Add a new secret named <code>ACCESS_TOKEN</code> and paste the token as its value</li>
                    <li>Create github worflows directory: <code>mkdir -p .github/workflows/</code></li>
                    <li>In the created directory, add a new worflow <code>ghpages.yml</code><br/>
                      <code style={{display: "block", whiteSpace: "pre-wrap"}}>
 {`
name: gh-pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v2
      env:
        ACCESS_TOKEN: $\{{ secrets.ACCESS_TOKEN }}
        BASE_BRANCH: master
        BRANCH: gh-pages
        FOLDER: 'build'
        BUILD_SCRIPT: git submodule update --init --recursive && npm install --prefix Learn-a-Language/application && LL_DATA_DIR="$PWD/data" npm run build --prefix Learn-a-Language/application && mv Learn-a-Language/application/build ./build
`}
                      </code>
                    </li>
                    <li>Make sure that your word JSON files are located inside the <code>data </code> 
                        directory. If you decided to name it something else make sure to update the
                        <code> BUILD_SCRIPT</code> attribute in the above code</li>
                    <li>Now every <code>git push</code> will rebuild the website with your new words</li>
                    <li>Visit <code>USERNAME.github.io/my-language</code> to view the website</li>
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
