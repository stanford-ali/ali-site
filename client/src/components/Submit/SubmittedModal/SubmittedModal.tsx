import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Button from "../../GlobalUI/Button/Button";
import { startNewProject } from "../../../store/submit/submit.actions";

const SubmittedModal = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Project Submitted!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Thank you for submitting a project to Applied Learning Initiative. We
        will notify you once your project has been approved.
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => dispatch(startNewProject())}
          classname="global-ui-button"
          text="Submit Another Project"
        />
        <Link to="/">
          <Button text="Home" />
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmittedModal;
