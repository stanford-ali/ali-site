// QandA is the left container of the Profile page

import React, { Component } from "react";
import { connect } from "react-redux";
import EditableText from "./EditableText/EditableText";
import Question from "./Question/Question";
import axios from "axios";
import "./QandA.scss";

class QandA extends Component<any, any> {
  state = {
    questions: [],
  };

  componentDidMount() {
    const userRequest = axios
      .get(`http://localhost:5000/questions`)
      .then((res) => {
        this.setState({
          ...this.state,
          questions: res.data,
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  render() {
    const questions = this.state.questions.map((elem, id) => {
      return (
        <Question key={id} question={elem.question} textarea={elem.textarea} />
      );
    });
    console.log(this.state.questions);

    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          <img
            src={this.props.auth.image}
            style={{ borderRadius: "50%", margin: "10px 0" }}
            alt="profile"
          />
          <EditableText
            size="20px"
            value={this.props.auth.firstname}
            header={true}
          />
          <EditableText
            size="20px"
            value={this.props.auth.email}
            header={true}
          />
        </div>
        <div className="ProfileLeftContent">{questions}</div>
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
