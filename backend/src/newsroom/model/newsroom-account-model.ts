import { model, Schema } from 'mongoose';
import { NewsroomRole } from '../constants';

interface NewsroomAccount {
  userId: string;
  newsroomId: string;
  role: keyof typeof NewsroomRole;
  createdAt: Date;
  updatedAt: Date;
}

const NewsroomAccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    newsroomId: {
      type: Schema.Types.ObjectId,
      ref: 'Newsroom',
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(NewsroomRole),
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      queryUserNewsroomAccounts(userId: string) {
        return this.find({ userId });
      },
      queryNewsroomAccounts(newsroomId: string) {
        return this.find({ newsroomId });
      },
      queryNewsroomAccountsByRole(newsroomId: string, role: string) {
        return this.find({ newsroomId, role });
      },
    },
  },
);

NewsroomAccountSchema.index({ newsroomId: 1, userId: 1 }, { unique: true });
NewsroomAccountSchema.index({ newsroomId: 1, role: 1 }, { unique: true });

const NewsroomAccountModel = model('NewsroomAccount', NewsroomAccountSchema);

export default NewsroomAccountModel;
export { NewsroomAccount, NewsroomAccountSchema };
