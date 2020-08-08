import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import EditableText from "../../Profile/ProfileContainer/QandA/EditableText/EditableText";
import RingLoader from "react-spinners/RingLoader";
import Button from "../../GlobalUI/Button/Button";
import "./ProjectFocus.scss";
class ProjectFocus extends Component<any, any> {
  render() {
    const questions =
      this.props.questions &&
      this.props.questions.map((elem, id) => {
        return (
          <div>
            <p>{elem}</p>
            <EditableText value="" textarea={true} />
          </div>
        );
      });
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
          <Card.Text>
            <h5>
              <span style={{ color: "#ff7070" }}>*</span>Questions:
            </h5>
            {questions}
          </Card.Text>
          <p style={{ fontSize: 12 }}>
            <span style={{ color: "#ff7070" }}>*</span>The rest of your
            application is from your profile answers
          </p>
          <Button />
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
