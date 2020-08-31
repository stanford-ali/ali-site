import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firebaseid: {
      type: String,
      unique: true,
      required: true,
    },
    qna: {
      email: {
        type: String,
        default: "",
      },
      year: {
        type: String,
        default: "",
      },
      experience: {
        type: String,
        default: "",
      },
      ["cs-experience"]: {
        type: String,
        default: "",
      },
      skills: {
        type: String,
        default: "",
      },
      programming: {
        type: String,
        default: "",
      },
      ["research-experience"]: {
        type: String,
        default: "",
      },
    },
    applications: [
      {
        id: {
          type: String,
        },
        title: {
          type: String,
        },
        department: {
          type: String,
        },
        desc: {
          type: String,
        },
        category: [{ type: String }],
        answers: {
          type: Schema.Types.Object,
        },
      },
    ],
    following: [
      {
        type: Schema.Types.Object,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
