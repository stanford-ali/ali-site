import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import axios from "axios";
import { connect } from "react-redux";
import "./Following.scss";

class Following extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  state = {
    following: [],
  };

  componentDidMount() {
    const userRequest = axios
      .get(`http://localhost:5000/students/auth/${this.props.userid}`)
      .then((res) => {
        this.setState({
          ...this.state,
          following: res.data[0].following,
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  render() {
    const following = this.state.following.map((elem, id) => {
      return (
        <FollowProject
          key={id}
          title={elem.title}
          department={elem.department}
        />
      );
    });

    return (
      <div className="Following">
        <div className="FollowingHead">
          <h1>Following</h1>
        </div>
        {/* Insert all projects user is following */}
        {}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(Following);
