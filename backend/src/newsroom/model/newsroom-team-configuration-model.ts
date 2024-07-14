import { model, Schema } from 'mongoose';

interface NewsroomTeamConfiguration {
  newsroomId: string;
  name: string;
  description?: string;
  color: string;
  isActive: boolean;
  isRequired: boolean;
  requiredMemberCount: number;
  subteamOf?: string;
  requiredRole?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsroomTeamConfigurationSchema = new Schema(
  {
    newsroomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: false,
      default: null,
    },
    color: {
      type: Schema.Types.String,
      required: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
    },
    isRequired: {
      type: Schema.Types.Boolean,
      default: false,
    },
    requiredMemberCount: {
      type: Schema.Types.Number,
      default: 0,
    },
    subteamOf: {
      type: Schema.Types.ObjectId,
      ref: 'NewsroomTeamConfiguration',
      default: null,
    },
    requiredRole: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const NewsroomTeamConfigurationModel = model(
  'NewsroomTeamConfiguration',
  NewsroomTeamConfigurationSchema,
);

export default NewsroomTeamConfigurationModel;
export { NewsroomTeamConfiguration, NewsroomTeamConfigurationSchema };
