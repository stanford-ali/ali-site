import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeframe: String,
    questions: [String],
    owner: String, // owner of the project, uid
    university: String,
    departments: [String],
    website: String,
    skills: [String],
    courses: [String],
    categories: [String],
    tags: [String],
    faculty_designed: {
      type: Boolean,
      default: false,
    },
    self_designed: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
