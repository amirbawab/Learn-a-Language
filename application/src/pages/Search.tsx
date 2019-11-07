import * as React from 'react';

export interface LLSearchProps {
  onWordSelect: (word: string) => void;
  onNewWord: (word: string) => void;
  words: string[];
}
 
export interface LLSearchState {}
 
class LLSearch extends React.Component<LLSearchProps, LLSearchState> {
  state = {
    form_hidden: true,
    search_text: ""
  }

  set_form_hidden(e: any, is_hidden : boolean) {
    e.preventDefault();
    this.setState({'form_hidden': is_hidden});
  }

  wordSelect(e: any, word: string) {
    e.preventDefault();
    this.props.onWordSelect(word);
  }

  onNewWord() {
    let input = this.refs.new_word as HTMLInputElement;
    this.props.onNewWord(input.value);
  }

  on_search_change() {
    let input = this.refs.search as HTMLInputElement;
    this.setState({search_text: input.value});
  }

  search_includes(word: string) {
    let search_text = this.state.search_text;
    if(search_text.length > word.length) {
      return false;
    }

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
    let new_search_form = undefined;
    if(!this.state.form_hidden) {
      new_search_form = (
        <div className="small col-md-12 text-white">
          <div className="form-group">
            <label>Word</label>
            <input type="text" className="form-control form-control-sm" ref="new_word"/>
          </div>
          <button className="btn btn-primary mr-2 btn-sm" onClick={(e) => {this.onNewWord()}}>Add</button>
          <button className="btn btn-secondary btn-sm" onClick={(e) => {this.set_form_hidden(e, true)}}>Close</button>
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
          <a className="nav-link" href="#" onClick={(e) => {this.set_form_hidden(e, false)}}>
            <i className="fas fa-plus-square"></i> New Word
          </a>
        </li>

        {new_search_form}

        <hr className="sidebar-divider my-0" />
        {this.props.words.map((word, id) => {
          return (
            <React.Fragment>
              {this.search_includes(word) ? (
                <li key={id} className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => {this.wordSelect(e, word)}}>{word}</a>
                </li>
              ) : undefined}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
 
export default LLSearch;
