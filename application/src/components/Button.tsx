import * as React from 'react';

export interface LLSplitButtonProps {
  icon: string;
  theme: string;
  on_click: () => boolean;
  extra_class?: string;
}
export interface LLSplitButtonState {}

class LLSplitButton extends React.Component<LLSplitButtonProps, LLSplitButtonState> {
  click_button(e: any) {
    if(!this.props.on_click()) {
      e.preventDefault();
    }
  }
  render() {
    let class_val = "btn btn-"+this.props.theme + " btn-icon-split";
    if(this.props.extra_class) {
      class_val += " " + this.props.extra_class;
    }
    return (
      <a href="#/" onClick={(e) => this.click_button(e)} className={class_val}>
        <span className="icon text-white-50">
          <i className={this.props.icon}></i>
        </span>
        <span className="text">
          {this.props.children}
        </span>
      </a>
    );
  }
}

export interface LLBasicButtonProps {
  theme: string;
  on_click: () => void;
  extra_class?: string;
}
export interface LLBasicButtonState {}

class LLBasicButton extends React.Component<LLBasicButtonProps, LLBasicButtonState> {
  render() {
    let class_val = "btn btn-"+this.props.theme;
    if(this.props.extra_class) {
      class_val += " " + this.props.extra_class;
    }
    return (
      <button className={class_val} onClick={this.props.on_click}>
        {this.props.children}
      </button>
    );
  }
}


export {LLSplitButton, LLBasicButton};
