import React, { Component } from "react";
import { BsUpload } from "react-icons/bs";
// import axios from "axios";
import { connect } from "react-redux";
import "./ResumeInput.scss";

class ResumeInput extends Component<any, any> {
  onUploadHandler(event) {
    // Change the file button to show the user's uploaded file
    const file = document.getElementById("choose-file");
    file.innerHTML = event.target.files[0].name;
    const actualFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        console.log(reader.result);
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
