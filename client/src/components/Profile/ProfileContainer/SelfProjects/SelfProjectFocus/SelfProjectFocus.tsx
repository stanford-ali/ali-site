import React, { Component } from "react";
import "./SelfProjectFocus.scss";

export default class SelfProjectFocus extends Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <div className="SelfProjectFocus">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
