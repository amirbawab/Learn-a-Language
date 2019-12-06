import * as React from 'react';
import LLWordData from '../models/WordData';

export interface LLSearchProps {
  on_word_select: (key: string) => void;
  on_flashcard: () => void;
  words: LLWordData[];
}
 
export interface LLSearchState {}
 
class LLSearch extends React.Component<LLSearchProps, LLSearchState> {
  state = {
    search_text: "",
  }

  flashcard_mode(e: any) {
    e.preventDefault();
    this.props.on_flashcard();
  }

  word_select(e: any, word: LLWordData) {
    e.preventDefault();
    this.props.on_word_select(word.get_key());
  }

  on_search_change() {
    let input = this.refs.search as HTMLInputElement;
    this.setState({search_text: input.value});
  }

  search_includes(word_data: LLWordData) {
    let word = word_data.get_word().toLowerCase();
    let search_text = this.state.search_text.toLowerCase();
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
          <a className="nav-link" href="#/" onClick={(e) => {this.flashcard_mode(e)}}>
            <i className="fas fa-comment-alt"></i> Flashcard <small><em>({this.props.words.length})</em></small>
          </a>
        </li>

        <hr className="sidebar-divider my-0" />
        <div style={{height: "350px"}}>
          <div className="overflow-auto h-100 d-inline-block">
            {this.props.words.map((word: LLWordData, id: number) => {
              return (
                <React.Fragment key={id}>
                  {this.search_includes(word) ? (
                    <li className="nav-item">
                      <a className="nav-link" href="#/" onClick={(e) => {this.word_select(e, word)}}>{word.get_word()}</a>
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
