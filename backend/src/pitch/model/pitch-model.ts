import { Document, model, Schema } from 'mongoose';

interface Pitch extends Document {
  title: string;
  description: string;
  status: string;
  newsroomId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PitchSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
    newsroomId: {
      type: Schema.Types.ObjectId,
      ref: 'Newsroom',
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deadline: {
      type: Schema.Types.Date,
      required: true,
    },
    wordCount: {
      type: Schema.Types.Number,
      default: null,
    },
    pageCount: {
      type: Schema.Types.Number,
      default: null,
    },
    isInternal: {
      type: Schema.Types.Boolean,
      default: false,
    },
    isConflictOfInterest: {
      type: Schema.Types.Boolean,
      default: false,
    },
    googleDocLink: {
      type: Schema.Types.String,
      default: null,
    },
    factCheckingLink: {
      type: Schema.Types.String,
      default: null,
    },
    visualsLink: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

PitchSchema.index({ newsroomId: 1, userId: 1 }, { unique: true });

const PitchModel = model('Pitch', PitchSchema);

export default PitchModel;
export { Pitch, PitchSchema };
