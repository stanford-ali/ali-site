import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  textarea: { type: Boolean },
  list: { type: Boolean },
});

export default mongoose.model("Questions", questionsSchema);
