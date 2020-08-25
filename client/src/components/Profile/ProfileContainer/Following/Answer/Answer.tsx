import React, { Component } from "react";
import { connect } from "react-redux";
import "./Answer.scss";

class Answer extends Component<any, any> {
  getQuestion(questionid) {
    if (!this.props.questions) {
      return null;
    }
    for (let question of this.props.questions) {
      if (question.id === questionid) {
        return question.question;
      }
    }
    // Else it is a project-specific question, just return that
    return questionid;
  }

  render() {
    console.log(this.props.questions);
    const question = this.getQuestion(this.props.question);
    return (
      <div className="Answers">
        <p>
          {question} {this.props.answer}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
  };
};

export default connect(mapStateToProps)(Answer);
