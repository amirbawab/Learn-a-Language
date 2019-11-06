import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLServer from './Server';
import LLWordData from './models/WordData';

var server = new LLServer("http://localhost", 3001);

function saveHandler(word: LLWordData) {
  server.set_word(word, (success: boolean) => {
    if(success) {
      renderSearchPanel();
      renderWordPanel(word.get_word());
    } else {
      console.error("Failed: Will not set word");
    }
  });
}

function deleteHandler(word: LLWordData) {
  server.remove_word(word.get_word(), (success: boolean) => {
    if(success) {
      renderSearchPanel();
      ReactDOM.render(<div></div>, document.getElementById('page-content'));
    } else {
      console.error("Failed: Will not remove word");
    }
  });
}

function newWordHandler(word: string) {
  saveHandler(new LLWordData(word));
}

function wordSelectHandler(word: string) {
  renderWordPanel(word);
}

function renderWordPanel(word: string) {
  server.get_word(word, (word: LLWordData) => {
    ReactDOM.render(<LLWord 
                        word={word} 
                        onSave={saveHandler} 
                        onDelete={deleteHandler}/>, 
                    document.getElementById('page-content'));
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
