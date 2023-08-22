import { Schema, model } from 'mongoose';

import { createTypedToken } from '@/core/helpers';

export type NewsroomToken = `nsrm_${string}`;

export interface Newsroom {
  token: NewsroomToken;
  name: string;
  description: string | null;
  founders: string[];
}

const NewsroomSchema = new Schema({
  token: {
    type: String,
    unique: true,
    default: (): NewsroomToken => createTypedToken('nsrm') as NewsroomToken,
  },
  name: {
    type: String,
    required: true,
  },
  // A description that accounts will see when they apply to join
  description: {
    type: String,
    default: null,
  },
  // Will default to the account that created the newsroom
  founders: {
    type: [String],
    default: [],
  },
});

export const NewsroomModel = model<Newsroom>('Newsroom', NewsroomSchema);

export default NewsroomModel;
export { NewsroomSchema };
