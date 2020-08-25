import React, { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Accordion } from "react-bootstrap";
import Answer from "../Answer/Answer";
import "./AppliedProject.scss";
import { connect } from "react-redux";
import { fetchQuestions } from "../../../../../store/actions/questions.actions";

class AppliedProject extends Component<any, any> {
  constructor(props) {
    super(props);
    this.props.onFetchQuestions();
  }

  render() {
    const answers = Object.keys(this.props.answers).map((elem, id) => {
      return <Answer question={elem} answer={this.props.answers[elem]} />;
    });
    return (
      <Accordion>
        <div className="AppliedProjects">
          <div>
            <li className="Title">
              <div>{this.props.title}</div>
            </li>
            <ul className="ProjectCaption">
              <li className="Department">
                <p>{this.props.department}</p>
              </li>
            </ul>
          </div>

          <div>
            <Accordion.Toggle className="ExpandApplication" eventKey="0">
              <AiOutlinePlus
                color="#3246bb"
                size={25}
                style={{ pointerEvents: "none" }}
              />
            </Accordion.Toggle>
          </div>
        </div>
        <Accordion.Collapse eventKey="0">
          <div>{answers}</div>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchQuestions: () => dispatch(fetchQuestions()),
  };
};

export default connect(null, mapDispatchToProps)(AppliedProject);
