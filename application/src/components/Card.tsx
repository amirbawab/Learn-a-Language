import * as React from 'react';

export interface LLProps {
  title?: string;
  icon?: string;
  color?: string;
}
 
export interface LLState {}
 
class LLCard extends React.Component<LLProps, LLState> {}

class LLBorderCard extends LLCard {
  
  render() {
    // Update background icon
    let iconClassName = "fa-2x text-gray-300 ";
    let iconTag = undefined;
    if(this.props.icon) {
      iconClassName += this.props.icon;
      iconTag = <li className={iconClassName}></li>
    }

    // Color classes
    let borderColor = "primary";
    if(this.props.color) {
      borderColor = this.props.color;
    }

    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className={"card border-left-" + borderColor + " shadow h-100 py-2"}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className={"text-xs font-weight-bold text-" + borderColor + " text-uppercase mb-1"}>{this.props.title}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.children}</div>
              </div>
              <div className="col-auto">
                {iconTag}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LLBorderCard;
