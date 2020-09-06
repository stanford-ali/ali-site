import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../../../GlobalUI/Button/Button";
import { Form } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import "./ProjectFocus.scss";
import { applyProject } from "../../../../store/auth/auth.actions";
import axios from "axios";

class ProjectFocus extends Component<any, any> {
  state = {
    application: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // User is established - see if they have applied to the project
    if (this.props.user !== prevProps.user) {
      axios
        .get(
          `http://localhost:5000/applications/user/${this.props.user.uid}/project/${this.props._id}`
        )
        .then((res) => this.setState({ application: res.data }))
        .catch((error) => console.log(error));
    }
  }

  render() {
    const questions =
      this.props.questions &&
      this.props.questions.map((elem, id) => {
        return (
          <Form.Group key={id}>
            <Form.Label>
              <p>{elem}</p>
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Answer"
            />
          </Form.Group>
        );
      });

    const handleSubmit = async (event) => {
      event.preventDefault();
      // If there is no user, alert them that they need to login
      if (!this.props.user) {
        alert("Please login to apply to projects!");
        return;
      }

      let inputs = event.target.elements;
      let questions = this.props.questions;
      let answers = {};
      for (let i = 0; i < inputs.length - 1; i++) {
        answers[questions[i]] = inputs[i].value;
      }

      let application = {
        id: this.props.id,
        title: this.props.title,
        department: this.props.department,
        desc: this.props.desc,
        category: [this.props.category],
        answers: { ...answers, ...this.props.user.qna },
      };

      await this.props.onApplyProject(application, this.props.user);
    };

    const questionsForm = (
      <Form onSubmit={handleSubmit}>
        {questions}
        {this.props.loading ? (
          <Button>
            <ClipLoader color={"white"} />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={this.state.application ? true : false} // if there is an application found, applied
          >
            Apply
          </Button>
        )}
      </Form>
    );

    return (
      <Card className="FocusProjectRight">
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.departments}</Card.Text>
          <Card.Text>{this.props.description}</Card.Text>
          <p className="QuestionsHeader">
            <span style={{ color: "#ff7070" }}>*</span>Questions:
          </p>
          {questionsForm}
          <p style={{ fontSize: 12 }}>
            <span style={{ color: "#ff7070" }}>*</span>The rest of your
            application is from your profile answers
          </p>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onApplyProject: (user_id, project_id, answers) =>
      dispatch(applyProject(user_id, project_id, answers)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFocus);
