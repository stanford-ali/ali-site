import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  owner_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  answers: [String],
});

export default mongoose.model("Application", applicationSchema);
