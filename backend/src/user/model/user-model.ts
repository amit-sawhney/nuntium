import { Schema, model, Document, SchemaTypes } from 'mongoose';

import { UserApplicationState, UserOnboardingState, UserRole } from '../constants';

export interface User extends Document {
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
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  portfolio: string | null;
  // TODO: Make this more versatile
  neighborhood: string | null;
  // TODO: Migrate these to a newsroom account model
  teams: string[];
  onboardingState: UserOnboardingState;
  applicationState: UserApplicationState;
  approvedAt: Date | null;
}

const UserSchema = new Schema(
  {
    email: {
      type: SchemaTypes.String,
      required: true,
      // Unique index
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
      // Don't return password in queries
      select: false,
    },
    newsroom: {
      type: [SchemaTypes.String],
      required: true,
    },
    role: {
      type: SchemaTypes.String,
      enum: Object.values(UserRole),
      default: UserRole.PENDING,
    },
    firstName: { type: SchemaTypes.String, required: true },
    lastName: { type: SchemaTypes.String, required: true },
    // Replaces first name if provided
    preferredName: { type: SchemaTypes.String, default: null },
    // Unformatted phone number
    phone: { type: SchemaTypes.String, default: null },
    genders: { type: [SchemaTypes.String], default: [] },
    pronouns: { type: [SchemaTypes.String], default: [] },
    races: { type: [SchemaTypes.String], default: [] },
    // Dynmaic list of interests
    interests: { type: [SchemaTypes.String], default: [] },
    // The teams the user is allowed to access
    teams: { type: [SchemaTypes.String], default: [] },
    // User state metadata
    onboardingState: {
      type: SchemaTypes.String,
      enum: Object.values(UserOnboardingState),
      default: UserOnboardingState.UNSCHEDULED,
    },
    // User application state
    applicationState: {
      type: SchemaTypes.String,
      enum: Object.values(UserApplicationState),
      default: UserApplicationState.IN_REVIEW,
    },
    // Socials
    twitter: { type: SchemaTypes.String, default: null },
    instagram: { type: SchemaTypes.String, default: null },
    facebook: { type: SchemaTypes.String, default: null },
    portfolio: { type: SchemaTypes.String, default: null },
    // Location
    neighborhood: { type: SchemaTypes.String, default: null },
    // Date for when the user was approved
    approvedAt: { type: SchemaTypes.Date, default: null },
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
      queryByEmail(email: string) {
        return this.find({ email });
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
