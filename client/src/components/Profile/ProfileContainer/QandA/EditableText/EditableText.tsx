import React, { Component } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./EditableText.scss";

interface EditableTextProps {
  value: string;
  size?: string;
}

interface EditableTextState {
  editable: boolean;
  value: string;
}

export default class EditableText extends Component<
  EditableTextProps,
  EditableTextState
> {
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
  };

  inputEditHandler = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const editableInput = (
      <input
        className="editableInput"
        onBlur={this.blurEditHandler}
        onChange={this.inputEditHandler}
        value={this.state.value}
        type="text"
        autoFocus
      />
    );

    return (
      <div className="editableText">
        {this.state.editable ? (
          editableInput
        ) : (
          <span style={{ fontSize: this.props.size }}>{this.state.value}</span>
        )}
        <FaPencilAlt
          onClick={this.clickEditHandler}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  }
}
