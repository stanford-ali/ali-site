import React, { Component } from "react";
import { BsPencil } from "react-icons/bs";
import { connect } from "react-redux";
import "./EditableText.scss";

interface EditableTextProps {
  value: string;
  size?: string;
  textarea?: boolean;
  questionid?: string;
  question?: string;
  onEdit: Function;
}

interface EditableTextState {
  editable: boolean;
  value: string;
}

class EditableText extends Component<EditableTextProps, EditableTextState> {
  state: EditableTextState = {
    value: this.props.value,
    editable: false,
  };

  clickEditHandler = () => {
    this.setState({ editable: true });
  };

  blurEditHandler = (event) => {
    event.preventDefault();
    this.setState({ editable: false });
    // Save Answer Change
    this.props.onEdit(event.target);
  };

  inputEditHandler = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const editableInput = this.props.textarea ? (
      <textarea
        className="editableTextarea"
        onBlur={this.blurEditHandler}
        onChange={this.inputEditHandler}
        value={this.state.value}
        id={this.props.questionid}
        autoFocus
      ></textarea>
    ) : (
      <input
        className="editableInput"
        onBlur={this.blurEditHandler}
        onChange={this.inputEditHandler}
        value={this.state.value}
        id={this.props.questionid}
        type="text"
        autoFocus
      />
    );

    return (
      <div>
        <div
          id={this.props.questionid}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{ fontSize: "20px", color: "#5F574F", fontWeight: "bold" }}
          >
            {this.props.question}
          </h3>
          <BsPencil
            onClick={this.clickEditHandler}
            style={{ cursor: "pointer", marginLeft: "5px", width: "5%" }}
            size={20}
          />
        </div>

        <div className="editableText">
          {this.state.editable ? (
            editableInput
          ) : (
            <span style={{ fontSize: this.props.size }}>
              {this.state.value}
            </span>
          )}
        </div>
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

export default connect(mapStateToProps, null)(EditableText);
