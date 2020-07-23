import React, { Component } from "react";
import { connect } from "react-redux";
import EditableText from "./EditableText/EditableText";
import { IUser } from "../../../../store/types/auth.types";
import "./QandA.scss";

class QandA extends Component<any, any> {
  render() {
    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          <img
            src={this.props.auth.image}
            style={{ borderRadius: "50%", margin: "10px 0" }}
            alt="profile-image"
          />
          <EditableText value={this.props.auth.firstname} />
          <EditableText value={this.props.auth.email} />
        </div>
        <div className="ProfileLeftContent"></div>
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
