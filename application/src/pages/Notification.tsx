import * as React from 'react';

export interface LLNotificationProps {
  theme: string;
  text: string;
  hidden: boolean;
  button: string;
  on_button_click: () => void;
  on_close: () => void;
}
export interface LLNotificationState {}
 
class LLNotification extends React.Component<LLNotificationProps, LLNotificationState> {
  state = {}

  render() {
    if(this.props.hidden) {
      return <React.Fragment/>
    }
    let button = <React.Fragment/>;
    if(this.props.button.length > 0) {
      button = (
        <button className="btn btn-primary btn-sm float-right ml-2" onClick={this.props.on_button_click}>Save</button>
      );
    }
    return (
      <div className="m-2">
        <div className={"alert alert-"+this.props.theme+" alert-dismissible fade show"} role="alert">
          {this.props.text}
          {button}
          <button type="button" className="close" aria-label="Close" onClick={this.props.on_close}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export default LLNotification;
