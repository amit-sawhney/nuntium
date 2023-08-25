import { Schema, model, Document, SchemaTypes } from 'mongoose';

import { createPrefixedId } from '@/core/helpers';

export interface User extends Document<string> {
  email: string;
  newsroom: string[];
  role: UserRole;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  phone: string | null;
  genders: string[];
  pronouns: string[];
  races: string[];
  interests: string[];
  teams: string[];
  onboardingState: UserOnboardingState;
  applicationState: UserApplicationState;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  portfolio: string | null;
  neighborhood: string | null;
  approvedAt: Date | null;
}

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      // Unique index
      unique: true,
      default: (): string => createPrefixedId('acct'),
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      // Unique index
      unique: true,
    },
    newsroom: {
      type: [SchemaTypes.String],
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PENDING,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // Replaces first name if provided
    preferredName: { type: String, default: null },
    // Unformatted phone number
    phone: { type: String, default: null },
    genders: { type: [String], default: [] },
    pronouns: { type: [String], default: [] },
    races: { type: [String], default: [] },
    // Dynmaic list of interests
    interests: { type: [String], default: [] },
    // The teams the user is allowed to access
    teams: { type: [String], default: [] },
    // User state metadata
    onboardingState: {
      type: String,
      enum: Object.values(UserOnboardingState),
      default: UserOnboardingState.UNSCHEDULED,
    },
    applicationState: {
      type: String,
      enum: Object.values(UserApplicationState),
      default: UserApplicationState.IN_REVIEW,
    },
    // Socials
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    facebook: { type: String, default: null },
    portfolio: { type: String, default: null },
    // Location
    neighborhood: { type: String, default: null },
    // Date for when the user was approved
    approvedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    statics: {
      queryById(userId: string) {
        return this.find({ _id: userId });
      },
      queryApplicationState(state: UserApplicationState) {
        return this.find({ applicationState: state });
      },
      queryOnboardingState(state: UserOnboardingState) {
        return this.find({ onboardingState: state });
      },
    },
  },
);

// Index Definitions
UserSchema.index({ newsroom: 1, token: 1, applicationState: 1 });
UserSchema.index({ newsroom: 1, token: 1, onboardingState: 1 });

const UserModel = model('User', UserSchema);

export default UserModel;
export { UserSchema };
