// QandA is the left container of the Profile page

import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question/Question";
import axios from "axios";
import "./QandA.scss";

class QandA extends Component<any, any> {
  constructor(props) {
    super(props);

    this.loadQuestionsAndUser = this.loadQuestionsAndUser.bind(this);
  }
  state = {
    questions: [],
    qna: {},
    user: {},
  };

  /**
   * Make user and questions request to backend and populate state
   */
  loadQuestionsAndUser() {
    let questionsRequest = axios.get(`http://localhost:5000/questions`);
    let userRequest = axios.get(
      `http://localhost:5000/students/auth/${this.props.userid}`
    );

    axios
      .all([questionsRequest, userRequest])
      .then(
        axios.spread((...responses) => {
          const questionsResponse = responses[0];
          const userResponse = responses[1];
          this.setState({
            ...this.state,
            questions: questionsResponse.data,
            qna: userResponse.data[0].qna,
            user: userResponse.data[0],
          });
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }

  componentDidMount() {
    this.loadQuestionsAndUser();
  }

  render() {
    const questions = this.state.questions.map((elem, id) => {
      return (
        <Question
          key={id}
          questionid={elem.id}
          question={elem.question}
          value={this.state.qna[elem.id]}
          textarea={elem.textarea}
          user={this.state.user}
          onEdit={this.loadQuestionsAndUser}
        />
      );
    });
    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          <img
            src={this.props.auth.image}
            style={{ borderRadius: "50%", margin: "10px 0" }}
            alt="profile"
          />
          <h3
            style={{ color: "white" }}
          >{`${this.props.auth.firstname} ${this.props.auth.lastname}`}</h3>
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
    userid: state.auth.userId,
  };
};

export default connect(mapStateToProps)(QandA);
