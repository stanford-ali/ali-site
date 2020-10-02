import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "../../../GlobalUI/Button/Button";
import { Form } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import ProjectSkill from "./ProjectSkill/ProjectSkill";
import "./ProjectFocus.scss";
import { applyProject } from "../../../../store/auth/auth.actions";

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

    const departments = this.props.departments?.join(" | ");

    const skills = this.props.skills?.map((elem, id) => {
      return <ProjectSkill key={id} skill={elem} />;
    });

    // // Move this to parent
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   // If there is no user, alert them that they need to login
    //   if (!this.props.user) {
    //     alert("Please login to apply to projects!");
    //     return;
    //   }

    //   let inputs = event.target.elements;
    //   let answers = [];
    //   for (let i = 0; i < inputs.length - 1; i++) {
    //     answers.push(inputs[i].value);
    //   }

    //   let res = await this.props.onApplyProject(
    //     this.props.user.uid,
    //     this.props._id,
    //     this.props.owner,
    //     answers
    //   );
    // };

    const questionsForm = (
      <Form onSubmit={this.props.onSubmit}>
        {questions}
        {this.props.loading ? (
          <Button>
            <ClipLoader color={"white"} />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={this.props.applied ? true : false} // if there is an application found, applied
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
          <Card.Text style={{ fontSize: "18px" }} className="mb-2">
            {departments}
          </Card.Text>
          <hr />
          <Card.Text>
            <span style={{ fontSize: "17px" }}>Project Description:</span>
            <br />
            {this.props.description}
          </Card.Text>
          <p style={{ fontSize: "17px" }}>Skills:</p>
          <div className="SkillsContainer">{skills}</div>
          <p style={{ fontSize: "17px" }}>Timeframe:</p>
          <div className="TimeframeContainer">
            <ProjectSkill skill={this.props.timeframe} />
          </div>
          <hr />
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
    loading: state.base.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onApplyProject: (user_id, project_id, owner_id, answers) =>
      dispatch(applyProject(user_id, project_id, owner_id, answers)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFocus);
