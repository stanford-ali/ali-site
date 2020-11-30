// QandA is the left container of the Profile page
import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question/Question";
import ResumeInput from "./ResumeInput/ResumeInput";
import axios from "axios";
import "./QandA.scss";
import { AiOutlineUser } from "react-icons/ai";

class QandA extends Component<any, any> {
  constructor(props) {
    super(props);
    this.setQna = this.setQna.bind(this);
  }

  state = {
    // QnA state value holds the questions and the answers
    qna: {},
  };

  componentWillMount() {
    this.setQna(this.props.questions);
  }

  setQna(questions) {
    let copyQuestions = { ...questions };
    let newQuestions: any = {};
    for (let elem of Object.keys(copyQuestions)) {
      let answer = this.props.user[elem];

      let value = { ...copyQuestions[elem], answer };
      newQuestions[elem] = value;
    }

    this.setState({ qna: newQuestions });
  }

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
        .patch(`/users/${userid}`, body)
        .catch((error) => console.log(error));
    };

    const onChangeAnswer = (input) => {
      let copyQna = { ...this.state.qna };
      copyQna[input.id].answer = input.value;
      this.setState({ qna: copyQna });
    };

    const questions = Object.keys(this.props.questions).map((elem, id) => {
      return (
        <Question
          key={id}
          question={this.props.questions[elem].question}
          questionid={elem}
          value={this.state.qna[elem].answer}
          textarea={this.props.questions[elem].textarea}
          onEdit={updateUser}
          onChange={onChangeAnswer}
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
