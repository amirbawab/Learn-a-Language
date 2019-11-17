import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import LLInfo from './pages/Info';
import LLWord from './pages/Word';
import LLSearch from './pages/Search';
import LLFlashcard from './pages/Flashcard';
import LLNotification from './pages/Notification';
import {LLServer} from './server/Server';
import LLLocalServer from './server/LocalServer';
import LLRemoteServer from './server/RemoteServer';
import LLWordData from './models/WordData';
import LLUtils from './Utils';

var server_url = "http://localhost";
var server_port = "3001";
var server: LLServer;

/**
 * Notification functions
 */

function hide_notification() {
  render_notification({hidden: true});
}

function save_notification(word: LLWordData, text: string) {
  render_notification({
    theme: "warning", 
    hidden: false, 
    text: text, 
    button: "Save", 
    on_button_click: () => {
      save_handler(word)
    }
  });
}

function error_notification(text: string) {
  render_notification({theme: "danger", hidden: false, text: text});
}

function success_notification(text: string) {
  render_notification({theme: "success", hidden: false, text: text});
}

function warning_notification(text: string) {
  render_notification({theme: "warning", hidden: false, text: text});
}

/**
 * Event handlers
 */

function notification_close_handler() {
  hide_notification();
}

function save_handler(word: LLWordData) {
  server.set_word(word, (success: boolean) => {
    if(success) {
      render_search_panel();
      render_word_panel(word.get_word());
      success_notification("Word '" + word.get_word() + "' was saved successfully");
    } else {
      error_notification("Failed to save '" + word.get_word()+"'");
    }
  });
}

function delete_handler(word: LLWordData) {
  server.remove_word(word.get_word(), (success: boolean) => {
    if(success) {
      render_search_panel();
      render_info_panel();
      success_notification("Word '" + word.get_word() + "' was deleted successfully");
    } else {
      error_notification("Failed to delete '" + word.get_word()+"'");
    }
  });
}

function new_word_handler(word: string) {
  save_handler(new LLWordData(word));
}

function word_select_handler(word: string) {
  render_word_panel(word);
}

function word_updated_handler(word: LLWordData) {
  save_notification(word, "Click 'Save' after done editing, or Refresh to abort the changes");
}

function flashcard_handler() {
  render_flashcard_panel();
}

function demo_handler() {
  demo_mode("Activated Demo mode. All data will be erased upon refreshing the page.");
}

function demo_mode(msg: string) {
  server = new LLLocalServer();
  warning_notification(msg);
  render_search_panel();
  render_info_panel();
}

function server_mode(s: LLRemoteServer) {
  server = s;
  success_notification("Successfully connected to " + server.to_string());
  render_search_panel();
  render_info_panel();
}

function server_update_handler(url: string, port: string) {
  connect_to_server(new LLRemoteServer(url, port))
}

function flashcard_show_word_handler(word: string, callback: (word: LLWordData) => void) {
  server.get_word(word, (word_data: LLWordData | null) => {
    if(word_data !== null) {
      callback(word_data);
    } else {
      error_notification("Failed to load flashcard word '" + word + "'");
    }
  });
}

function copy_word_handler(word: LLWordData) {
  save_handler(word);
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

function render_flashcard_panel() {
  server.get_words((words: string[] | null) => {
    if(words !== null) {
      LLUtils.shuffle(words);
      ReactDOM.render(<LLFlashcard 
        words={words} 
        on_word_select={flashcard_word_select_handler}
        on_resolve_keys={resolve_keys_handler}
        on_show_word={flashcard_show_word_handler}/> ,document.getElementById('page-content'));
    } else {
      error_notification("Failed to load list of words from server");
    }
  });
}

function render_word_panel(word: string) {
  server.get_word(word, (word_data: LLWordData | null) => {
    if(word_data !== null) {
      ReactDOM.render(<LLWord 
                          key={word_data.get_word()}
                          word={word_data} 
                          read_only={server.is_read_only()}
                          on_resolve_keys={resolve_keys_handler}
                          on_copy_word={copy_word_handler}
                          on_word_select={word_select_handler}
                          on_edit={word_updated_handler}
                          on_delete={delete_handler}/>, 
                      document.getElementById('page-content'));
    } else {
      error_notification("Failed to load word '" + word + "'");
    }
  });
}

function render_search_panel() {
  server.get_words((words: string[] | null) => {
    if(words === null) {
      error_notification("Failed to load list of words from server");
    }
    ReactDOM.render(<LLSearch 
                        read_only={server.is_read_only()}
                        default_url={server_url}
                        default_port={server_port}
                        words={words === null ? [] : words} 
                        on_word_select={word_select_handler} 
                        on_flashcard={flashcard_handler} 
                        on_demo={demo_handler}
                        on_server_update={server_update_handler}
                        on_new_word={new_word_handler}/>, 
                    document.getElementById('search-panel'));
  });
}

function render_logo() {
  ReactDOM.render((
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#/" onClick={() => render_info_panel()}>
        <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-language"></i></div>
        <div className="sidebar-brand-text mx-3">Learn A Language</div>
      </a>
  ), document.getElementById('logo'));
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

function connect_to_server(s: LLRemoteServer) {
  s.is_ok((success: boolean) => {
    if(success) {
      server_mode(s);
    } else {
      demo_mode("Failed to connect to the server at " + s.to_string() + 
        ". Switching to Demo mode. All data will be erased upon refreshing the page.");
    }
  });
}

render_logo();
connect_to_server(new LLRemoteServer(server_url, server_port));

serviceWorker.unregister();
