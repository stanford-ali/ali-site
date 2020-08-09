import React, { Component } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProject } from "../../../../store/actions/project.actions";
import "./ProjectList.scss";
class ProjectList extends Component<any, any> {
  render() {
    const renderTooltip = (props) => {
      const { pid, ...rest } = props;
      return (
        <Tooltip id="button-tooltip" {...rest}>
          Verified
        </Tooltip>
      );
    };

    const followProject = (event) => {
      event.stopPropagation();
      console.log(event);
    };

    const description = `${this.props.desc
      .split(" ")
      .slice(0, 20)
      .join(" ")}. . .`;

    return (
      <Card
        className="ProjectCard"
        onClick={() => this.props.click(this.props.projectid)}
      >
        <Card.Header as="h6">
          {this.props.categ || `Biology | Computer Science`}
        </Card.Header>
        <Card.Body>
          <div className="ProjectListTitle">
            <Card.Title
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {this.props.title}
              <div className="ProjectCardButtons">
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <AiOutlineCheck color={"green"} size={20} />
                </OverlayTrigger>
                <AiOutlinePlus onClick={followProject} />
              </div>
            </Card.Title>
          </div>
          <Card.Text>
            {this.props.department} <br />
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
