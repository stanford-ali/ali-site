// QandA is the left container of the Profile page

import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question/Question";
import axios from "axios";
import "./QandA.scss";

class QandA extends Component<any, any> {
  state = {
    questions: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/questions`)
      .then((res) =>
        this.setState({
          questions: res.data,
        })
      )
      .catch((error) => console.log(error));
  }

  /**
   * Make user and questions request to backend and populate state
   * onEdit function for the EditableText on Profile Page
   */
  render() {
    const updateUser = (input) => {
      let questionid = input.id;
      let answer = input.value;
      let userid = this.props.user.google_id;
      this.props.user.qna[questionid] = answer;
      axios
        .put(`http://localhost:5000/students/auth/${userid}`, this.props.user)
        .catch((error) => console.log(error));
    };

    const questions = this.state.questions.map((elem, id) => {
      return (
        <Question
          key={id}
          questionid={elem.id}
          question={elem.question}
          value={this.props.user.qna[elem.id]}
          textarea={elem.textarea}
          onEdit={updateUser}
        />
      );
    });
    return (
      <div className="QandA">
        <div className="ProfileLeftHead">
          <img
            src={this.props.user.image}
            style={{ borderRadius: "50%", margin: "10px 0" }}
            alt="profile"
          />
          <h3
            style={{ color: "white" }}
          >{`${this.props.user.firstname} ${this.props.user.lastname}`}</h3>
        </div>
        <div className="ProfileLeftContent">{questions}</div>
      </div>
    );
  }
}

// Get state from store
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(QandA);
