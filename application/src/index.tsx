import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLInfo from './pages/Info';
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
      renderInfoPanel();
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

function renderInfoPanel() {
  ReactDOM.render(<LLInfo/> ,document.getElementById('page-content'));
}

function renderWordPanel(word: string) {
  server.get_word(word, (word_data: LLWordData) => {
    ReactDOM.render(<LLWord 
                        key={word_data.get_word()}
                        word={word_data} 
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
                        on_word_select={wordSelectHandler} 
                        on_new_word={newWordHandler}/>, 
                    document.getElementById('search-panel'));
  });
}

// Render default panels
renderSearchPanel();
renderInfoPanel();

serviceWorker.unregister();
