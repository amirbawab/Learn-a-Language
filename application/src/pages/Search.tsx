import * as React from 'react';

export interface LLSearchProps {
  onWordSelect: (word: string) => void;
  words: string[];
}
 
export interface LLSearchState {}
 
class LLSearch extends React.Component<LLSearchProps, LLSearchState> {
  state = {}

  wordSelect(e: any, word: string) {
    e.preventDefault();
    this.props.onWordSelect(word);
  }

  render() { 
    return (
      <div>
        <form className="d-none d-sm-inline-block form-inline mr-md-3 ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input  type="text" className="form-control bg-light border-0 small" placeholder="Search for a word"/>
            <div className="input-group-append">
              <button className="btn btn-warning" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <i className="fas fa-plus-square"></i> New Word
          </a>
        </li>

        <hr className="sidebar-divider my-0" />
        {this.props.words.map((word, id) => {
          return (
            <li key={id} className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => {this.wordSelect(e, word)}}>{word}</a>
            </li>
          );
        })}
      </div>
    );
  }
}
 
export default LLSearch;
