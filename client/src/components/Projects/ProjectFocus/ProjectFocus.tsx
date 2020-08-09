import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import Button from "../../GlobalUI/Button/Button";
import { Form } from "react-bootstrap";
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

    const handleSubmit = (event) => {
      event.preventDefault();
      let inputs = event.target.elements;
      let questions = this.props.questions;
      let answers = {};
      for (let i = 0; i < inputs.length - 1; i++) {
        answers[questions[i]] = inputs[i].value;
      }
      // Submit the application and add the application to the user's application {}
      console.log(answers);
    };

    const questionsForm = (
      <Form onSubmit={handleSubmit}>
        {questions}
        <Button type="submit" />
      </Form>
    );

    return this.props.loading ? (
      <div className="FocusFiller">
        <RingLoader color="#3246bb" />
      </div>
    ) : (
      <Card>
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
    loading: state.project.loading,
  };
};

export default connect(mapStateToProps, null)(ProjectFocus);
