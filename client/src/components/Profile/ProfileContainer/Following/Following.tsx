import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
// import AppliedProject from "./AppliedProject/AppliedProject";
import { connect } from "react-redux";
import "./Following.scss";
import axios from "axios";

class Following extends Component<any, any> {
  state = {
    rightDisplay: "following",
    followingProjects: [],
  };

  async componentDidMount() {
    for (let project of this.props.user.following) {
      await axios.get(`http://localhost:5000/projects/${project}`).then((res) =>
        this.setState({
          followingProjects: [...this.state.followingProjects, res.data[0]],
        })
      );
    }
  }

  onRightDisplayChange(title) {
    console.log(title);
  }

  render() {
    // Update to adhere to new applications backend
    // const applied = this.props.user?.applications.map((elem, id) => {
    //   return (
    //     <AppliedProject
    //       key={id}
    //       title={elem.title}
    //       department={elem.department}
    //       desc={elem.desc}
    //       projectid={elem.id}
    //       answers={elem.answers}
    //     />
    //   );
    // });

    // All the projects a user is following
    const following = this.state.followingProjects.map((elem, id) => {
      return (
        <FollowProject
          key={id}
          title={elem.title}
          department={elem.departments}
          category={elem.categories}
          projectid={elem._id}
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
        {/* {applied} */}
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
