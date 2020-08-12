import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import { connect } from "react-redux";
import "./Following.scss";

class Following extends Component<any, any> {
  state = {
    following: [],
  };

  render() {
    const following = this.state.following.map((elem, id) => {
      return (
        <FollowProject
          key={id}
          title={elem.title}
          department={elem.department}
          category={elem.category}
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
