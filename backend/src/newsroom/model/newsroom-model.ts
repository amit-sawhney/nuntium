import { Schema, model, Document } from 'mongoose';

export interface Newsroom extends Document {
  name: string;
  description: string | null;
  founderIds: string[];
  teamConfiguration: string;
}

const NewsroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // A description that users will see when they apply to join
  description: {
    type: String,
    default: null,
  },
  // Will default to the user that created the newsroom
  founderIds: {
    type: [String],
    default: [],
  },
  teamConfiguration: {
    type: Schema.Types.ObjectId,
    ref: 'NewsroomTeamConfiguration',
    required: true,
  },
});

export const NewsroomModel = model('Newsroom', NewsroomSchema);

export default NewsroomModel;
export { NewsroomSchema };
