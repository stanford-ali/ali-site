import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import { connect } from "react-redux";
import "./Following.scss";

class Following extends Component<any, any> {
  render() {
    const following =
      this.props.user &&
      this.props.user.following.map((elem, id) => {
        return (
          <FollowProject
            key={id}
            title={elem.title}
            department={elem.department}
            category={elem.category}
            projectid={elem.id}
          />
        );
      });

    return (
      <div className="Following">
        <div className="FollowingHead">
          <h1>Following</h1>
        </div>
        {/* Insert all projects user is following */}
        {following}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Following);
