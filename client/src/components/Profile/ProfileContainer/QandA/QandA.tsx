// QandA is the left container of the Profile page

import React, { Component } from "react";
import { connect } from "react-redux";
import EditableText from "./EditableText/EditableText";
import Question from "./Question/Question";
import "./QandA.scss";

class QandA extends Component<any, any> {
  render() {
    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          <img
            src={this.props.auth.image}
            style={{ borderRadius: "50%", margin: "10px 0" }}
            alt="profile"
          />
          <EditableText size="20px" value={this.props.auth.firstname} />
          <EditableText size="20px" value={this.props.auth.email} />
        </div>
        <div className="ProfileLeftContent">
          <Question />
        </div>
      </div>
    );
  }
}

// Get state from store
const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
  };
};

export default connect(mapStateToProps)(QandA);
