import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
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
    image_url: String,
    university: String,
    year: String,
    skills: String,
    programming: String,
    resume: Buffer,
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    faculty: Boolean,
    admin: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
