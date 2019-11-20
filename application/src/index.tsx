import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLInfo from './pages/Info';
import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLFlashcard from './pages/Flashcard';
import LLNotification from './pages/Notification';
import LLWordData from './models/WordData';
import {shuffle} from './Common';
import StaticData from './data/StaticData';

var static_data = new StaticData();
static_data.init_data();

/**
 * Notification functions
 */

function hide_notification() {
  render_notification({hidden: true});
}

function error_notification(text: string) {
  render_notification({theme: "danger", hidden: false, text: text});
}

/**
 * Event handlers
 */

function notification_close_handler() {
  hide_notification();
}

function word_select_handler(word: string) {
  render_word_panel(word);
}

function flashcard_handler() {
  render_flashcard_panel();
}

function flashcard_show_word_handler(key: string, callback: (word: LLWordData) => void) {
  let word_data = static_data.get_word_by_key(key);
  if(word_data !== null) {
    callback(word_data);
  } else {
    error_notification("Failed to load flashcard word");
  }
}

function resolve_keys_handler(keys: string[]) {
  let result: Map<string, string> = new Map();
  keys.forEach((key: string) => {
    let word_data = static_data.get_word_by_key(key);
    if(word_data !== null) {
      result.set(key, word_data.get_word());
    }
  });
  return result;
}

function flashcard_word_select_handler(word: string) {
  render_notification({
    theme: "warning", 
    hidden: false, 
    text: "Click on 'Visit Word' to exist flashcard exercise and show word '" + word + "' in regular mode", 
    button: "Visit Word", 
    on_button_click: () => {
      render_word_panel(word);
    }
  });
}

/**
 * Render functions
 */

function render_info_panel() {
  ReactDOM.render(<LLInfo/> ,document.getElementById('page-content'));
}

function render_homepage() {
  render_logo();
  render_search_panel();
  render_info_panel();
}

function render_flashcard_panel() {
  let words_keys = Array.from(static_data.get_words().keys());
  shuffle(words_keys);
  ReactDOM.render(<LLFlashcard
    words_keys={words_keys}
    on_word_select={flashcard_word_select_handler}
    on_resolve_keys={resolve_keys_handler}
    on_show_word={flashcard_show_word_handler}/> ,document.getElementById('page-content'));
}

function render_word_panel(word: string) {
  let word_data = static_data.get_word(word);
  if(word_data !== null) {
    ReactDOM.render(<LLWord 
                        key={word_data.get_word()}
                        word={word_data} 
                        on_resolve_keys={resolve_keys_handler}
                        on_word_select={word_select_handler}/>,
                    document.getElementById('page-content'));
  } else {
    error_notification("Failed to load word '" + word + "'");
  }
}

function render_search_panel() {
  let words = static_data.get_words();
  ReactDOM.render(<LLSearch 
                      words={Array.from(words.values())} 
                      on_word_select={word_select_handler} 
                      on_flashcard={flashcard_handler}/>,
                  document.getElementById('search-panel'));
}

function render_logo() {
  let make_logo = (version: string) => {
    ReactDOM.render((
        <div className="mb-3">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#/" onClick={() => render_info_panel()}>
            <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-language"></i></div>
            <div className="sidebar-brand-text mx-3">Learn A Language</div>
          </a>
          <div className="text-center"><small className="text-white">{version}</small></div>
        </div>
    ), document.getElementById('logo'));
  };

  fetch('./version.txt', {headers: {'Accept': 'text/plain'}})
  .then((r) => {
    if(!r.ok) {
      throw Error(r.statusText);
    }
    return r.text()
  })
  .then((text) => {
    make_logo(text);
  })
  .catch((error) => {
    make_logo("unknown-version");
  })
}

function render_notification(config: any) {
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
                        on_close={notification_close_handler}/>, 
                  document.getElementById('notification'));
}

// Render default panels

(() => {
  render_homepage();
  serviceWorker.unregister();
})();
