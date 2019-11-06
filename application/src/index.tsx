import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLServer from './Server';
import LLWordData from './models/WordData';

var server = new LLServer("http://localhost", 3001);

function saveHandler(word: LLWordData) {
  console.log(word.to_json());
}

function wordSelectHandler(word: string) {
  server.get_word(word, (word: LLWordData) => {
    ReactDOM.render(<LLWord word={word} onSave={saveHandler}/>, document.getElementById('page-content'));
  });
}

// Load words
server.get_words((words: string[]) => {
  ReactDOM.render(<LLSearch words={words} onWordSelect={wordSelectHandler}/>, document.getElementById('search-panel'));
});



serviceWorker.unregister();
