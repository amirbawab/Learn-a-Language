import * as React from 'react';
import {LLBasicCard} from '../../components/Card';
import LLWordData from '../../models/WordData';

export interface LLReferenceProps {
  word: LLWordData;
  on_word_select: (word: string) => void;
}
export interface LLReferenceState {}
class LLReference extends React.Component<LLReferenceProps, LLReferenceState> {
  word_select(e: any, word: LLWordData) {
    e.preventDefault();
    this.props.on_word_select(word.get_word());
  }
  render() {
    let referenced_by = undefined;
    if(this.props.word.get_referenced_by().length !== 0) {
      referenced_by = (
        <div>
          <div className="row">
            <div className="col-lg-12">
              <LLBasicCard title="Reference By">
                {this.props.word.get_referenced_by().map((val, id) => {
                  return <li key={id}><a href="#/" onClick={(e) => this.word_select(e, val)}>{val.get_word()}</a></li>;
                })}
              </LLBasicCard>
            </div>
          </div>
        </div>
      
      );
    }
    return (
      <React.Fragment>
        {referenced_by}
      </React.Fragment>
    );
  }
}

export default LLReference;
