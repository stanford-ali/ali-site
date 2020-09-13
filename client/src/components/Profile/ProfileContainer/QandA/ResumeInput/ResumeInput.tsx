import React, { Component } from "react";
import { BsUpload } from "react-icons/bs";
// import axios from "axios";
import { connect } from "react-redux";
import "./ResumeInput.scss";

class ResumeInput extends Component<any, any> {
  constructor(props) {
    super(props);
    this.onUploadHandler = this.onUploadHandler.bind(this);
  }

  state = {
    resumeName: "",
  };

  onUploadHandler(event) {
    // Change the file button to show the user's uploaded file
    const file = document.getElementById("choose-file");
    const resumePreview = document.getElementById("download-resume");
    const resume = event.target.files[0].name;
    const actualFile = event.target.files[0];

    // Unhide the resume download button
    resumePreview.style.display = "block";

    // Change the label's text to the resume name and setState
    file.innerHTML = resume;
    this.setState({ resumeName: resume });
    const reader = new FileReader();

    // Event listener on FileReader
    reader.addEventListener(
      "load",
      function () {
        // convert file to base64 string
        console.log(reader.result);

        resumePreview.setAttribute("href", reader.result.toString());
      },
      false
    );
    if (file) {
      reader.readAsDataURL(actualFile);
    }

    // Send axios request to backend to update
    // const userid = this.props.user.uid;
    // let body = {}
    // axios
    //   .patch(`http://localhost:5000/users/${userid}`, body)
    //   .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="ResumeAnswer">
        <h3>Attach resume</h3>
        <input
          className="Resume"
          type="file"
          name="file"
          id="file"
          onChange={this.onUploadHandler}
        />
        <label className="ResumeLabel" htmlFor="file">
          <BsUpload className="mr-2 mb-1" size={20} />
          <span id="choose-file">Choose a file</span>
        </label>
        <a download={this.state.resumeName} id="download-resume">
          Download Resume
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(ResumeInput);
