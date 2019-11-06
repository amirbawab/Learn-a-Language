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

function newWordHandler(word: string) {
  let word_data = new LLWordData(word);
  server.set_word(word_data, () => {
    renderSearchPanel();
  });
}

function wordSelectHandler(word: string) {
  renderWordPanel(word);
}

function renderWordPanel(word: string) {
  server.get_word(word, (word: LLWordData) => {
    ReactDOM.render(<LLWord word={word} onSave={saveHandler}/>, document.getElementById('page-content'));
  });
}

function renderSearchPanel() {
  // Load words
  server.get_words((words: string[]) => {
    // Render search
    ReactDOM.render(<LLSearch 
                        words={words} 
                        onWordSelect={wordSelectHandler} 
                        onNewWord={newWordHandler}/>, 
                    document.getElementById('search-panel'));
  });
}

// Render search panel by default
renderSearchPanel();




serviceWorker.unregister();
