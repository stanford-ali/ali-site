import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    project_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }]
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model('Category', categorySchema);