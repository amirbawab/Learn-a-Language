import * as React from 'react';
import {LLOkCancelForm} from '../components/Form';
import {LLLabelInput} from '../components/Input';

export interface LLSearchProps {
  read_only: boolean;
  default_url: string;
  default_port: string;
  on_word_select: (word: string) => void;
  on_new_word: (word: string) => void;
  on_flashcard: () => void;
  on_demo: () => void;
  on_server_update: (url: string, port: string) => void;
  words: string[];
}
 
export interface LLSearchState {}
 
class LLSearch extends React.Component<LLSearchProps, LLSearchState> {
  state = {
    new_word_form_hidden: true,
    server_form_hidden: true,
    search_text: "",
    server_url_text: this.props.default_url,
    server_port_text: this.props.default_port
  }

  set_new_word_form_hidden(e: any, is_hidden : boolean) {
    if(e !== null) {
      e.preventDefault();
    }
    this.setState({'new_word_form_hidden': is_hidden});
  }

  set_server_form_hidden(e: any, is_hidden : boolean) {
    if(e !== null) {
      e.preventDefault();
    }
    this.setState({'server_form_hidden': is_hidden});
  }
  
  flashcard_mode(e: any) {
    e.preventDefault();
    this.props.on_flashcard();
  }

  demo_mode(e: any) {
    e.preventDefault();
    this.props.on_demo();
  }

  word_select(e: any, word: string) {
    e.preventDefault();
    this.props.on_word_select(word);
  }

  on_new_word() {
    let input = this.refs.new_word as LLLabelInput;
    this.props.on_new_word(input.value());
    this.set_new_word_form_hidden(null, true);
  }

  on_search_change() {
    let input = this.refs.search as HTMLInputElement;
    this.setState({search_text: input.value});
  }

  on_server_update() {
    let url_input = this.refs.url as LLLabelInput;
    let port_input = this.refs.port as LLLabelInput;
    this.setState({
      server_url_text: url_input.value(),
      server_port_text: port_input.value()
    });
    this.props.on_server_update(url_input.value(), port_input.value());
  }

  search_includes(word: string) {
    let search_text = this.state.search_text;
    if(search_text.length > word.length) {
      return false;
    }

    // Ignore case sensitivity
    search_text = search_text.toLowerCase();
    word = word.toLowerCase();

    // Letters in the search field must exist
    // in the target 'word' and in the same order
    let s_iter = 0;
    let w_iter = 0;
    while(s_iter < search_text.length && w_iter < word.length) {
      if(search_text[s_iter] === word[w_iter]) {
        s_iter++;
      }
      w_iter++;
    }
    return s_iter === search_text.length;
  }

  render() { 
    let new_word_form = undefined;
    if(!this.state.new_word_form_hidden) {
      new_word_form = (
        <div className="small col-md-12 text-white">
          <LLOkCancelForm 
              ok_name="Add" 
              cancel_name="Close" 
              on_ok={() => this.on_new_word()} 
              on_cancel={() => this.set_new_word_form_hidden(null, true)}>
            <LLLabelInput ref="new_word" label="Word"/>
          </LLOkCancelForm>
        </div>
      );
    }

    let server_form = undefined;
    if(!this.state.server_form_hidden) {
      server_form = (
        <div className="small col-md-12 text-white">
          <LLOkCancelForm 
              ok_name="Update" 
              cancel_name="Close" 
              on_ok={() => this.on_server_update()} 
              on_cancel={() => this.set_server_form_hidden(null, true)}>
            <LLLabelInput ref="url" label="URL" text={this.state.server_url_text}/>
            <LLLabelInput ref="port" label="Port" text={this.state.server_port_text}/>
          </LLOkCancelForm>
        </div>
      );
    }

    return (
      <div>
        <form 
            className="d-none d-sm-inline-block form-inline mr-md-3 ml-md-3 my-2 my-md-0 mw-100 navbar-search"
            onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input  
                type="text" 
                ref="search" 
                value={this.state.search_text}
                className="form-control bg-light border-0 small" 
                onChange={() => this.on_search_change()} 
                placeholder="Search for a word"/>
            <div className="input-group-append">
              <button className="btn btn-warning">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={(e) => {this.demo_mode(e)}}>
            <i className="fas fa-database"></i> Demo mode
          </a>
        </li>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={(e) => {this.set_server_form_hidden(e, false)}}>
            <i className="fas fa-server"></i> Server
          </a>
        </li>
        {server_form}

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={(e) => {this.flashcard_mode(e)}}>
            <i className="fas fa-comment-alt"></i> Flashcard <small><em>({this.props.words.length})</em></small>
          </a>
        </li>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={(e) => {this.set_new_word_form_hidden(e, false)}}>
            <i className="fas fa-plus-square"></i> New Word
          </a>
        </li>
        {new_word_form}

        <hr className="sidebar-divider my-0" />
        <div style={{height: "350px"}}>
          <div className="overflow-auto h-100 d-inline-block">
            {this.props.words.map((word, id) => {
              return (
                <React.Fragment key={id}>
                  {this.search_includes(word) ? (
                    <li className="nav-item">
                      <a className="nav-link" href="#/" onClick={(e) => {this.word_select(e, word)}}>{word}</a>
                    </li>
                  ) : undefined}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
 
export default LLSearch;
