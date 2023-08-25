import { Schema, model } from 'mongoose';

import { createPrefixedId } from '@/core/helpers';

export interface Newsroom {
  name: string;
  description: string | null;
  founders: string[];
}

const NewsroomSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    default: () => createPrefixedId('nsrm'),
  },
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
  founders: {
    type: [String],
    default: [],
  },
});

export const NewsroomModel = model<Newsroom>('Newsroom', NewsroomSchema);

export default NewsroomModel;
export { NewsroomSchema };
