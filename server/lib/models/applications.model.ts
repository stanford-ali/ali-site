import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    last_updated: Date,
    submitted: {
      type: Boolean,
      required: true
    }
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model('Application', applicationSchema);