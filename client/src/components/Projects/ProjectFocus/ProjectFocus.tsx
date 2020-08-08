import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./ProjectFocus.scss";
export default class ProjectFocus extends Component<any, any> {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.desc}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
