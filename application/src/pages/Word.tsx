import * as React from 'react';

// Components
import LLTitle from '../components/Title';
import {LLBasicCard} from '../components/Card';
import {LLSplitButton} from '../components/Button';
import {LLOkCancelForm} from '../components/Form';
import {LLLabelInput} from '../components/Input';

// Sections
import LLPronunciation from './sections/Pronunciation';
import LLExample from './sections/Example';
import LLNative from './sections/Native';

// Models
import LLWordData from '../models/WordData';
import LLExampleData from '../models/ExampleData';

export interface LLWordProps {
  read_only: boolean;
  word: LLWordData;
  on_delete: (word: LLWordData) => void;
  on_edit: (word: LLWordData) => void;
  on_copy_word: (word: LLWordData) => void;
  on_resolve_keys: (keys: string[]) => Map<string, string>;
  on_word_select: (word: string) => void;
}
 
export interface LLWordState {}
 
class LLWord extends React.Component<LLWordProps, LLWordState> {
  state = {
    word: this.props.word,
    copy_form_hidden: true
  }

  set_copy_form_hidden(is_hidden: boolean) {
    this.setState({copy_form_hidden: is_hidden});
    return false;
  }

  update_word() {
    this.setState(this.state);
    this.props.on_edit(this.state.word);
  }

  copy_word() {
    let input = this.refs.copy_word as LLLabelInput;
    let copy = this.state.word.clone();
    copy.set_word(input.value());
    this.props.on_copy_word(copy);
    this.set_copy_form_hidden(true);
  }

  add_native_handler(form: string) {
    this.state.word.add_native(form);
    this.update_word();
  }

  delete_native_handler(id: number) {
    this.state.word.delete_native(id);
    this.update_word();
  }

  add_pronunciation_handler(language: string, sound: string) {
    this.state.word.add_pronunciation(language, sound);
    this.update_word();
  }

  delete_pronunciation_handler(id: number) {
    this.state.word.delete_pronunciation(id);
    this.update_word();
  }

  add_example_handler(sentence: string) {
    let example = new LLExampleData(sentence);
    this.state.word.add_example(example);
    this.update_word();
  }

  delete_example_handler(id: number) {
    this.state.word.delete_example(id);
    this.update_word();
  }

  update_example_handler() {
    this.update_word();
  }

  render() {
    let copy_form = undefined;
    if(!this.state.copy_form_hidden && !this.props.read_only) {
      copy_form = (
        <div className="row">
          <div className="col-lg-12">
            <LLBasicCard>
              <LLOkCancelForm 
                  ok_name="Copy" 
                  cancel_name="Close" 
                  on_ok={() => this.copy_word()} 
                  on_cancel={() => this.set_copy_form_hidden(true)}>
                <LLLabelInput ref="copy_word" label="Copy Word"/>
              </LLOkCancelForm>
            </LLBasicCard>
          </div>
        </div>
      );
    }

    let copy_button = undefined;
    let delete_button = undefined;
    if(!this.props.read_only) {
      copy_button = (
        <LLSplitButton 
            theme="secondary" 
            extra_class="btn-sm float-right"
            icon="far fa-copy" 
            on_click={() => this.set_copy_form_hidden(false)}>
          Copy Word
        </LLSplitButton>
      );

      delete_button = (
        <div className="alert alert-warning" role="alert">
          Click "Delete" to remove the word
          <button className="btn btn-danger btn-sm float-right ml-2" onClick={() => {this.props.on_delete(this.state.word)}}>Delete</button>
        </div>
      );
    }


    return (
      <div className="m-2">
        <LLTitle>
          <div>
            <i className="far fa-file-word"></i> <b>{this.state.word.get_word()}</b>
            {copy_button}
          </div>
          <div>
            <small style={{fontSize:15}}className="text-secondary"><em>key: {this.state.word.get_md5()}</em></small>
          </div>
        </LLTitle>
        {copy_form}
        <LLNative
              read_only={this.props.read_only}
              on_add={(form) => this.add_native_handler(form)} 
              on_delete={(id) => this.delete_native_handler(id)} 
              on_resolve_keys={this.props.on_resolve_keys}
              on_word_select={this.props.on_word_select}
              data={this.state.word.get_natives()}/>
        <LLPronunciation  
              read_only={this.props.read_only}
              on_add={(language, sound) => this.add_pronunciation_handler(language, sound)} 
              on_delete={(id) => this.delete_pronunciation_handler(id)} 
              data={this.state.word.get_pronunciations()}/>
        <LLExample 
              read_only={this.props.read_only}
              on_add={(sentence) => this.add_example_handler(sentence)}
              on_delete={(id) => this.delete_example_handler(id)}
              on_example_update={() => this.update_example_handler()}
              data={this.state.word.get_examples()}/>
        {delete_button}
      </div>
    );
  }
}

export default LLWord;
