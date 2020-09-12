// QandA is the left container of the Profile page
import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question/Question";
import ResumeInput from "./ResumeInput/ResumeInput";
import axios from "axios";
import "./QandA.scss";
import { AiOutlineUser } from "react-icons/ai";

class QandA extends Component<any, any> {
  /**
   * Make user and questions request to backend and populate state
   * onEdit function for the EditableText on Profile Page
   */
  render() {
    // Update user's answers
    const updateUser = (input) => {
      let questionid = input.id;
      let answer = input.value;
      let userid = this.props.user.uid;
      this.props.user[questionid] = answer;

      let body = {};
      body[questionid] = answer;
      axios
        .patch(`http://localhost:5000/users/${userid}`, body)
        .catch((error) => console.log(error));
    };

    const questions = this.props.questions.map((elem, id) => {
      return (
        <Question
          key={id}
          question={elem.question}
          questionid={elem.questionid}
          value={this.props.user[elem.questionid]}
          textarea={elem.textarea}
          onEdit={updateUser}
        />
      );
    });
    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          {this.props.user.image_url ? (
            <img
              src={this.props.user.image_url}
              style={{ borderRadius: "50%", margin: "10px 0" }}
              alt="profile"
            />
          ) : (
            <AiOutlineUser size={40} />
          )}
          <h3
            style={{ color: "white" }}
          >{`${this.props.user.firstname} ${this.props.user.lastname}`}</h3>
        </div>
        <div className="ProfileLeftContent">
          {questions} <ResumeInput />
        </div>
      </div>
    );
  }
}

// Get state from store
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    questions: state.auth.questions,
  };
};

export default connect(mapStateToProps, null)(QandA);
