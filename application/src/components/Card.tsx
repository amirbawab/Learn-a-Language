import * as React from 'react';

/**
 * Border Card
 */
export interface LLBorderCardProps {
  title: string;
  icon: string;
  color?: string;
}
export interface LLBorderCardState {}
class LLBorderCard extends React.Component<LLBorderCardProps, LLBorderCardState> {
  public static defaultProps = {
    color: "primary"
  };
  render() {
    // Update background icon
    let iconClassName = "fa-2x text-gray-300 ";
    let iconTag = undefined;
    if(this.props.icon) {
      iconClassName += this.props.icon;
      iconTag = <li className={iconClassName}></li>
    }

    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className={"card border-left-" + this.props.color + " shadow h-100 py-2"}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className={"text-xs font-weight-bold text-" + this.props.color + " text-uppercase mb-1"}>{this.props.title}</div>
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

/**
 * Basic Card
 */
export interface LLBasicCardProps {
  title: string;
  color?: string;
}
export interface LLBasicCardState {}
class LLBasicCard extends React.Component<LLBasicCardProps, LLBasicCardState> {
  public static defaultProps = {
    color: "primary"
  };

  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className={"m-0 font-weight-bold text-" + this.props.color}>{this.props.title}</h6>
        </div>
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}

export {
  LLBorderCard,
  LLBasicCard
};
