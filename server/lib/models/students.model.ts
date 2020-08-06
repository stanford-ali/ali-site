import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    google_id: {
      type: String,
      unique: true,
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
    application_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
