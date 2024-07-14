import { Document, model, Schema } from 'mongoose';

interface NewsroomInterest extends Document {
  name: string;
  description?: string;
  color: string;
  newsroomId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsroomInterestSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
    color: {
      type: Schema.Types.String,
      required: true,
    },
    newsroomId: {
      type: Schema.Types.ObjectId,
      ref: 'Newsroom',
      required: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

NewsroomInterestSchema.index({ newsroomId: 1, name: 1 }, { unique: true });

const NewsroomInterestModel = model('NewsroomInterest', NewsroomInterestSchema);

export default NewsroomInterestModel;
export { NewsroomInterest, NewsroomInterestSchema };
