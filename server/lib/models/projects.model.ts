import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    timeframe: String,
    questions: [{
      type: String
    }],
    faculty_id: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty'
    },
    departments: [{
      type: String,
      required: true
    }],
    website: String,
    category: [{
      type: Schema.Types.ObjectId,
      rel: 'Category'
    }],
    tag_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    application_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Application'
    }],
    self_designed: Boolean 
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model('Project', projectSchema);