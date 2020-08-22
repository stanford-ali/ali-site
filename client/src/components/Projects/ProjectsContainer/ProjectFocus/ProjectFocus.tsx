import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../../../GlobalUI/Button/Button";
import { Form } from "react-bootstrap";
import { applyProject } from "../../../../store/actions/auth.actions";
import ClipLoader from "react-spinners/ClipLoader";
import "./ProjectFocus.scss";

class ProjectFocus extends Component<any, any> {
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
      let inputs = event.target.elements;
      let questions = this.props.questions;
      let projectid = this.props.id;
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
          <Button type="submit">Apply</Button>
        )}
      </Form>
    );

    return (
      <Card className="FocusProjectRight">
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.department}</Card.Text>
          <Card.Text>{this.props.desc}</Card.Text>
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
    onApplyProject: (application, user) =>
      dispatch(applyProject(application, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFocus);
