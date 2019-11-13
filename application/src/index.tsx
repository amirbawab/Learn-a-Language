import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLInfo from './pages/Info';
import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLFlashcard from './pages/Flashcard';
import LLNotification from './pages/Notification';
import LLServer from './Server';
import LLWordData from './models/WordData';
import LLUtils from './Utils';

var server_url = "http://localhost";
var server_port = "3001";
var server = new LLServer(server_url, server_port);

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

function flashcard_handler() {
  render_flashcard_panel();
}

function server_update_handler(url: string, port: string) {
  server.set_url(url, port);
  renderSearchPanel();
  renderInfoPanel();
}

function flashcard_show_word_handler(word: string, callback: (word: LLWordData) => void) {
  server.get_word(word, (word_data: LLWordData) => {
    if(word_data !== null) {
      callback(word_data);
    } else {
      errorNotification("Failed to load flashcard word '" + word + "'");
    }
  });
}

function copy_word_handler(word: LLWordData) {
  saveHandler(word);
}

function resolve_keys_handler(keys: string[]) {
  let result: Map<string, string> = new Map();
  keys.forEach((key: string) => {
    let word = server.get_word_string_from_key(key);
    if(word !== null) {
      result.set(key, String(word));
    }
  });
  return result;
}

function flashcard_word_select_handler(word: string) {
  renderNotification({
    theme: "warning", 
    hidden: false, 
    text: "Click on 'Visit Word' to exist flashcard exercise and show word '" + word + "' in regular mode", 
    button: "Visit Word", 
    on_button_click: () => {
      renderWordPanel(word);
    }
  });
}

/**
 * Render functions
 */

function renderInfoPanel() {
  ReactDOM.render(<LLInfo/> ,document.getElementById('page-content'));
}

function render_flashcard_panel() {
  server.get_words((words: string[]) => {
    if(words !== null) {
      LLUtils.shuffle(words);
      ReactDOM.render(<LLFlashcard 
        words={words} 
        on_word_select={flashcard_word_select_handler}
        on_resolve_keys={resolve_keys_handler}
        on_show_word={flashcard_show_word_handler}/> ,document.getElementById('page-content'));
    } else {
      errorNotification("Failed to load list of words from server");
    }
  });
}

function renderWordPanel(word: string) {
  server.get_word(word, (word_data: LLWordData) => {
    if(word_data !== null) {
      ReactDOM.render(<LLWord 
                          key={word_data.get_word()}
                          word={word_data} 
                          on_resolve_keys={resolve_keys_handler}
                          on_copy_word={copy_word_handler}
                          on_word_select={wordSelectHandler}
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
      words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      ReactDOM.render(<LLSearch 
                          default_url={server_url}
                          default_port={server_port}
                          words={words} 
                          on_word_select={wordSelectHandler} 
                          on_flashcard={flashcard_handler} 
                          on_server_update={server_update_handler}
                          on_new_word={newWordHandler}/>, 
                      document.getElementById('search-panel'));
    } else {
      errorNotification("Failed to load list of words from server");
    }
  });
}

function renderLogo() {
  ReactDOM.render((
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#/" onClick={() => renderInfoPanel()}>
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
