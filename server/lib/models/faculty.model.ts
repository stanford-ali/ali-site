import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const facultySchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,
    department: String,
    project_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }]
  }, 
  {
    timestamps: true
  }
);

// handle automatic lowercase plural
export default mongoose.model('Faculty', facultySchema, 'faculty');