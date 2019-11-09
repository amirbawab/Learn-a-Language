import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLInfo from './pages/Info';
import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLNotification from './pages/Notification';
import LLServer from './Server';
import LLWordData from './models/WordData';

var server = new LLServer("http://localhost", 3001);

/**
 * Notification functions
 */

function hideNotification() {
  renderNotification({hidden: true});
}

function saveNotification(word: LLWordData, text: string) {
  renderNotification({
    theme: "warning", 
    hidden: false, 
    text: text, 
    button: "Save", 
    on_button_click: () => {
      saveHandler(word)
    }
  });
}

function errorNotification(text: string) {
  renderNotification({theme: "danger", hidden: false, text: text});
}

function successNotification(text: string) {
  renderNotification({theme: "success", hidden: false, text: text});
}

/**
 * Event handlers
 */

function notificationCloseHandler() {
  hideNotification();
}

function saveHandler(word: LLWordData) {
  server.set_word(word, (success: boolean) => {
    if(success) {
      renderSearchPanel();
      renderWordPanel(word.get_word());
      successNotification("Word '" + word.get_word() + "' was saved successfully");
    } else {
      errorNotification("Failed to save '" + word.get_word()+"'");
    }
  });
}

function deleteHandler(word: LLWordData) {
  server.remove_word(word.get_word(), (success: boolean) => {
    if(success) {
      renderSearchPanel();
      renderInfoPanel();
      successNotification("Word '" + word.get_word() + "' was deleted successfully");
    } else {
      errorNotification("Failed to delete '" + word.get_word()+"'");
    }
  });
}

function newWordHandler(word: string) {
  saveHandler(new LLWordData(word));
}

function wordSelectHandler(word: string) {
  renderWordPanel(word);
}

function wordUpdatedHandler(word: LLWordData) {
  saveNotification(word, "Click 'Save' after done editing, or Refresh to abort the changes");
}

/**
 * Render functions
 */

function renderInfoPanel() {
  ReactDOM.render(<LLInfo/> ,document.getElementById('page-content'));
}

function renderWordPanel(word: string) {
  server.get_word(word, (word_data: LLWordData) => {
    if(word_data !== null) {
      ReactDOM.render(<LLWord 
                          key={word_data.get_word()}
                          word={word_data} 
                          onEdit={wordUpdatedHandler}
                          onDelete={deleteHandler}/>, 
                      document.getElementById('page-content'));
    } else {
      errorNotification("Failed to load word '" + word + "'");
    }
  });
}

function renderSearchPanel() {
  server.get_words((words: string[]) => {
    if(words !== null) {
      ReactDOM.render(<LLSearch 
                          words={words} 
                          on_word_select={wordSelectHandler} 
                          on_new_word={newWordHandler}/>, 
                      document.getElementById('search-panel'));
    } else {
      errorNotification("Failed to load list of words from server");
    }
  });
}

function renderLogo() {
  ReactDOM.render((
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#" onClick={() => renderInfoPanel()}>
        <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-language"></i></div>
        <div className="sidebar-brand-text mx-3">Learn A Language</div>
      </a>
  ), document.getElementById('logo'));
}

function renderNotification(config: any) {
  config                  = config                  || {};
  config.theme            = config.theme            || "warning";
  config.text             = config.text             || "";
  config.hidden           = config.hidden           || false;
  config.button           = config.button           || "";
  config.on_button_click  = config.on_button_click  || (() => {});
  ReactDOM.render(<LLNotification 
                        hidden={config.hidden} 
                        theme={config.theme} 
                        text={config.text} 
                        button={config.button}
                        on_button_click={config.on_button_click}
                        on_close={notificationCloseHandler}/>, 
                  document.getElementById('notification'));
}

// Render default panels
renderLogo();
renderSearchPanel();
renderInfoPanel();

serviceWorker.unregister();
