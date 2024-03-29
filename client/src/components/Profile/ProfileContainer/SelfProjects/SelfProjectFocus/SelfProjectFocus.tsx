import React, { Component } from "react";
import "./SelfProjectFocus.scss";
import EditableText from "../../QandA/EditableText/EditableText";
import ArrayFocusElem from "./ArrayFocusElem/ArrayFocusElem";
import { connect } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  updateDepartment,
  updateSkills,
  updateCourses,
  updateCategories,
  updateTags,
  updateProject,
} from "../../../../../store/profile/profile.actions";

class SelfProjectFocus extends Component<any, any> {
  constructor(props) {
    super(props);
    this.addDepartments = this.addDepartments.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
    this.addSkills = this.addSkills.bind(this);
    this.deleteSkills = this.deleteSkills.bind(this);
    this.addCourses = this.addCourses.bind(this);
    this.deleteCourses = this.deleteCourses.bind(this);
    this.addCategories = this.addCategories.bind(this);
    this.deleteCategories = this.deleteCategories.bind(this);
    this.addTags = this.addTags.bind(this);
    this.deleteTags = this.deleteTags.bind(this);
  }

  state = {
    editableQuestions: [
      {
        questionid: "description",
        question: "Descriptions",
        textarea: true,
        value: "",
      },
      {
        questionid: "timeframe",
        question: "Timeframe",
        textarea: false,
        value: "",
      },
      {
        questionid: "website",
        question: "Website",
        textarea: true,
        value: "",
      },
    ],
  };

  componentDidMount() {
    this.updateEditableQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedProject !== prevProps.selectedProject) {
      this.updateEditableQuestions();
    }
  }

  // Updates Editable Questions' values with this.props.selectedProject
  updateEditableQuestions() {
    let editableQuestionsCopy = [...this.state.editableQuestions];
    for (let question of editableQuestionsCopy) {
      let id = question.questionid;
      let value = this.props.selectedProject[id];
      question.value = value;
    }
    this.setState({ editableQuestions: editableQuestionsCopy });
  }

  // Add/Delete departments
  addDepartments() {
    const project_id = this.props.selectedProject._id;
    const departmentInput = document.getElementById(
      "DepartmentInput"
    ) as HTMLInputElement;
    const newDepartments = [
      ...this.props.selectedProject.departments,
      departmentInput.value,
    ];
    this.props.onUpdateDepartment(project_id, newDepartments);

    // Clear input field
    departmentInput.value = "";
  }

  deleteDepartment(id) {
    const project_id = this.props.selectedProject._id;
    const newDepartments = this.props.selectedProject.departments.filter(
      (elem, nid) => {
        return nid !== id;
      }
    );
    this.props.onUpdateDepartment(project_id, newDepartments);
  }

  // Add/Delete skills
  addSkills() {
    const project_id = this.props.selectedProject._id;

    const skillsInput = document.getElementById(
      "SkillsInput"
    ) as HTMLInputElement;
    const newSkills = [...this.props.selectedProject.skills, skillsInput.value];
    this.props.onUpdateSkills(project_id, newSkills);

    // Clear input field
    skillsInput.value = "";
  }

  deleteSkills(id) {
    const project_id = this.props.selectedProject._id;
    const newSkills = this.props.selectedProject.skills.filter((elem, nid) => {
      return nid !== id;
    });
    this.props.onUpdateSkills(project_id, newSkills);
  }

  // Add/Delete courses
  addCourses() {
    const project_id = this.props.selectedProject._id;
    const coursesInput = document.getElementById(
      "CoursesInput"
    ) as HTMLInputElement;
    const newCourses = [
      ...this.props.selectedProject.courses,
      coursesInput.value,
    ];
    this.props.onUpdateCourses(project_id, newCourses);

    // Clear input field
    coursesInput.value = "";
  }

  deleteCourses(id) {
    const project_id = this.props.selectedProject._id;
    const newCourses = this.props.selectedProject.courses.filter(
      (elem, nid) => {
        return nid !== id;
      }
    );
    this.props.onUpdateCourses(project_id, newCourses);
  }

  // Add/Delete categories
  addCategories() {
    const project_id = this.props.selectedProject._id;
    const categoriesInput = document.getElementById(
      "CategoriesInput"
    ) as HTMLInputElement;
    const newCategories = [
      ...this.props.selectedProject.categories,
      categoriesInput.value,
    ];
    this.props.onUpdateCategories(project_id, newCategories);

    // Clear input field
    categoriesInput.value = "";
  }
  deleteCategories(id) {
    const project_id = this.props.selectedProject._id;
    const newCategories = this.props.selectedProject.categories.filter(
      (elem, nid) => {
        return nid !== id;
      }
    );
    this.props.onUpdateCategories(project_id, newCategories);
  }

  // Add/Delete tags
  addTags() {
    const project_id = this.props.selectedProject._id;
    const tagsInput = document.getElementById("TagsInput") as HTMLInputElement;
    const newTags = [...this.props.selectedProject.tags, tagsInput.value];
    this.props.onUpdateTags(project_id, newTags);

    // Clear input field
    tagsInput.value = "";
  }
  deleteTags(id) {
    const project_id = this.props.selectedProject._id;
    const newTags = this.props.selectedProject.tags.filter((elem, nid) => {
      return nid !== id;
    });
    this.props.onUpdateTags(project_id, newTags);
  }

  render() {
    // Department bubbles with minus (subtract sign)
    const editDepartments = this.props.selectedProject.departments.map(
      (elem, id) => {
        return (
          <div key={id} style={{ display: "inline-block" }}>
            <ArrayFocusElem
              value={elem}
              minus={() => this.deleteDepartment(id)}
            />
          </div>
        );
      }
    );

    const editSkills = this.props.selectedProject.skills.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteSkills(id)} />
        </div>
      );
    });

    const editCourses = this.props.selectedProject.courses.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteCourses(id)} />
        </div>
      );
    });

    const editCategories = this.props.selectedProject.categories.map(
      (elem, id) => {
        return (
          <div key={id} style={{ display: "inline-block" }}>
            <ArrayFocusElem
              value={elem}
              minus={() => this.deleteCategories(id)}
            />
          </div>
        );
      }
    );

    const editTags = this.props.selectedProject.tags.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteTags(id)} />
        </div>
      );
    });

    const onChangeAnswer = (input) => {
      let editableQuestionsCopy = [...this.state.editableQuestions];
      for (let question of editableQuestionsCopy) {
        if (question.questionid === input.id) {
          question.value = input.value;
        }
      }
      this.setState({ editableQuestions: editableQuestionsCopy });
    };

    const onEditAnswer = (input) => {
      let questionid = input.id;
      let answer = input.value;
      this.props.selectedProject[questionid] = answer;

      let body = {};
      body[questionid] = answer;
      this.props.onUpdateProject(this.props.selectedProject._id, body);
    };

    // EditableText portions
    const editablePortions = this.state.editableQuestions.map((elem, id) => {
      return (
        <div key={id}>
          <EditableText
            question={elem.question}
            value={elem.value}
            textarea={elem.textarea}
            onChange={onChangeAnswer}
            onEdit={onEditAnswer}
            questionid={elem.questionid}
          />
          <hr />
        </div>
      );
    });

    return (
      <div className="SelfProjectFocus">
        <h3>{this.props.selectedProject.title}</h3>
        <hr />
        {editablePortions}
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Departments</h3>
          {/* TODO: Change to a form so circle button is mapped to enter */}
          <div>
            <input
              type="text"
              id="DepartmentInput"
              className="FocusInput"
              style={{ fontFamily: "Lato" }}
            />
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              onClick={this.addDepartments}
              color={"#3246bb"}
            />
          </div>
          {editDepartments}
          <hr />
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Skills</h3>
          <div>
            <input
              type="text"
              id="SkillsInput"
              className="FocusInput"
              style={{ fontFamily: "Lato" }}
            ></input>
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              onClick={this.addSkills}
              color={"#3246bb"}
            />
          </div>
          {editSkills}
          <hr />
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Courses</h3>
          <div>
            <input
              type="text"
              id="CoursesInput"
              className="FocusInput"
              style={{ fontFamily: "Lato" }}
            ></input>
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              onClick={this.addCourses}
              color={"#3246bb"}
            />
          </div>
          {editCourses}
          <hr />
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Categories</h3>{" "}
          <div>
            <input
              type="text"
              id="CategoriesInput"
              className="FocusInput"
              style={{ fontFamily: "Lato" }}
            ></input>
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              onClick={this.addCategories}
              color={"#3246bb"}
            />
          </div>
          {editCategories}
          <hr />
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Tags</h3>
          <div>
            <input
              type="text"
              id="TagsInput"
              className="FocusInput"
              style={{ fontFamily: "Lato" }}
            ></input>
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              onClick={this.addTags}
              color={"#3246bb"}
            />
          </div>
          {editTags}
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProject: state.profile.selectedProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDepartment: (project_id, newDepartments) =>
      dispatch(updateDepartment(project_id, newDepartments)),
    onUpdateSkills: (project_id, newSkills) =>
      dispatch(updateSkills(project_id, newSkills)),
    onUpdateCourses: (project_id, newCourses) =>
      dispatch(updateCourses(project_id, newCourses)),
    onUpdateCategories: (project_id, newCategories) =>
      dispatch(updateCategories(project_id, newCategories)),
    onUpdateTags: (project_id, newTags) =>
      dispatch(updateTags(project_id, newTags)),
    onUpdateProject: (project_id, body) =>
      dispatch(updateProject(project_id, body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfProjectFocus);
