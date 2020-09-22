import React, { Component } from "react";
import "./SelfProjectFocus.scss";
import EditableText from "../../QandA/EditableText/EditableText";
import ArrayFocusElem from "./ArrayFocusElem/ArrayFocusElem";
import axios from "axios";
import { connect } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  loadingStart,
  loadingEnd,
} from "../../../../../store/base/base.actions";

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
      { value: "description", display: "Descriptions", textarea: true },
      { value: "timeframe", display: "Timeframe", textarea: false },
      { value: "website", display: "Website", textarea: true },
    ],
    project: this.props,
  };

  // Add/Delete departments
  addDepartments() {
    const departmentInput = document.getElementById(
      "DepartmentInput"
    ) as HTMLInputElement;
    const newDepartments = [
      ...this.state.project.departments,
      departmentInput.value,
    ];
    axios
      .patch(`/projects/${this.props._id}`, {
        departments: newDepartments,
      })
      .then((res) => this.setState({ project: res.data }));

    // Clear input field
    departmentInput.value = "";
  }

  deleteDepartment(id) {
    const newDepartment = this.state.project.departments.filter((elem, nid) => {
      return nid !== id;
    });
    axios
      .patch(`/projects/${this.props._id}`, {
        departments: newDepartment,
      })
      .then((res) => this.setState({ project: res.data }));
  }

  // Add/Delete skills
  addSkills() {
    const skillsInput = document.getElementById(
      "SkillsInput"
    ) as HTMLInputElement;
    const newSkills = [...this.state.project.skills, skillsInput.value];
    axios
      .patch(`/projects/${this.props._id}`, {
        skills: newSkills,
      })
      .then((res) => this.setState({ project: res.data }));

    // Clear input field
    skillsInput.value = "";
  }

  deleteSkills(id) {
    const newSkills = this.state.project.skills.filter((elem, nid) => {
      return nid !== id;
    });
    axios
      .patch(`/projects/${this.props._id}`, {
        skills: newSkills,
      })
      .then((res) => this.setState({ project: res.data }));
  }

  // Add/Delete courses
  addCourses() {
    const coursesInput = document.getElementById(
      "CoursesInput"
    ) as HTMLInputElement;
    const newCourses = [...this.state.project.courses, coursesInput.value];
    axios
      .patch(`/projects/${this.props._id}`, {
        courses: newCourses,
      })
      .then((res) => this.setState({ project: res.data }));

    // Clear input field
    coursesInput.value = "";
  }

  deleteCourses(id) {
    const newCourses = this.state.project.skills.filter((elem, nid) => {
      return nid !== id;
    });
    axios
      .patch(`/projects/${this.props._id}`, {
        courses: newCourses,
      })
      .then((res) => this.setState({ project: res.data }));
  }

  // Add/Delete categories
  addCategories() {
    const categoriesInput = document.getElementById(
      "CategoriesInput"
    ) as HTMLInputElement;
    const newCategories = [
      ...this.state.project.categories,
      categoriesInput.value,
    ];
    axios
      .patch(`/projects/${this.props._id}`, {
        categories: newCategories,
      })
      .then((res) => this.setState({ project: res.data }));

    // Clear input field
    categoriesInput.value = "";
  }
  deleteCategories(id) {
    const newCategories = this.state.project.skills.filter((elem, nid) => {
      return nid !== id;
    });
    axios
      .patch(`/projects/${this.props._id}`, {
        categories: newCategories,
      })
      .then((res) => this.setState({ project: res.data }));
  }

  // Add/Delete tags
  addTags() {
    const tagsInput = document.getElementById("TagsInput") as HTMLInputElement;
    const newTags = [...this.state.project.tags, tagsInput.value];
    axios
      .patch(`/projects/${this.props._id}`, {
        tags: newTags,
      })
      .then((res) => this.setState({ project: res.data }));

    // Clear input field
    tagsInput.value = "";
  }
  deleteTags(id) {
    const newTags = this.state.project.skills.filter((elem, nid) => {
      return nid !== id;
    });
    axios
      .patch(`/projects/${this.props._id}`, {
        tags: newTags,
      })
      .then((res) => this.setState({ project: res.data }));
  }

  render() {
    const editDepartments = this.state.project.departments.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem
            value={elem}
            minus={() => this.deleteDepartment(id)}
          />
        </div>
      );
    });

    const editSkills = this.state.project.skills.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteSkills(id)} />
        </div>
      );
    });

    const editCourses = this.state.project.courses.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteCourses(id)} />
        </div>
      );
    });

    const editCategories = this.state.project.categories.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem
            value={elem}
            minus={() => this.deleteCategories(id)}
          />
        </div>
      );
    });

    const editTags = this.state.project.tags.map((elem, id) => {
      return (
        <div key={id} style={{ display: "inline-block" }}>
          <ArrayFocusElem value={elem} minus={() => this.deleteTags(id)} />
        </div>
      );
    });

    const editablePortions = this.state.editableQuestions.map((elem, id) => {
      return (
        <div key={id}>
          <EditableText
            question={elem.display}
            value={this.props[elem.value]}
            textarea={elem.textarea}
          />
          <hr />
        </div>
      );
    });

    return (
      <div className="SelfProjectFocus">
        <h3>{this.props.title}</h3>
        <hr />
        {editablePortions}
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Departments</h3>
          {/* TODO: Change to a form so circle button is mapped to enter */}
          <div style={{ display: "flex", alignItems: "center" }}>
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
    loading: state.base.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingStart: () => loadingStart(),
    onLoadingEnd: () => loadingEnd(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfProjectFocus);
