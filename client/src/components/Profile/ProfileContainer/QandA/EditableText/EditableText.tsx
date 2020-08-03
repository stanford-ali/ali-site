import React, { Component } from "react";
import { BsPencil } from "react-icons/bs";
import "./EditableText.scss";

interface EditableTextProps {
  value: string;
  size?: string;
  textarea?: boolean;
  question?: string;
  header?: boolean;
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
    const editableInput = this.props.textarea ? (
      <textarea
        className="editableTextarea"
        onBlur={this.blurEditHandler}
        onChange={this.inputEditHandler}
        value={this.state.value}
        autoFocus
      ></textarea>
    ) : (
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
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ fontSize: "20px", color: "#5F574F" }}>
            {this.props.question}
          </h3>
          {!this.props.header && (
            <BsPencil
              onClick={this.clickEditHandler}
              style={{ cursor: "pointer", marginLeft: "5px" }}
              size={20}
            />
          )}
        </div>

        <div className="editableText">
          {this.state.editable ? (
            editableInput
          ) : (
            <span style={{ fontSize: this.props.size }}>
              {this.state.value}
            </span>
          )}
          {this.props.header && (
            <BsPencil
              onClick={this.clickEditHandler}
              style={{ cursor: "pointer", display: "inline-block" }}
              size={20}
            />
          )}
        </div>
      </div>
    );
  }
}
