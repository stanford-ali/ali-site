import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import AppliedProject from "./AppliedProject/AppliedProject";
import { connect } from "react-redux";
import "./Following.scss";

class Following extends Component<any, any> {
  state = {
    rightDisplay: "following",
  };

  onRightDisplayChange(title) {
    console.log(title);
  }

  render() {
    const applied = this.props.user?.applications.map((elem, id) => {
      return (
        <AppliedProject
          key={id}
          title={elem.title}
          department={elem.department}
          desc={elem.desc}
          projectid={elem.id}
          answers={elem.answers}
        />
      );
    });

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
          <button onClick={() => this.onRightDisplayChange("following")}>
            Following
          </button>
          <button onClick={() => this.onRightDisplayChange("applied")}>
            Applied
          </button>
        </div>
        {/* Insert all projects user is following or applied to */}
        {following}
        {applied}
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
