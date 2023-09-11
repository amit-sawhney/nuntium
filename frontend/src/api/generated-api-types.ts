export interface FindAllUsersMethodParams {
  email: string;
}

export interface FindAllUsersMethodQuery {
  email: string;
}

export interface FindAllUsersMethodBody {
  email: string;
}

export interface FindAllUsersMethodResponse {
  message: string;
  user: {
    email: string;
    newsroom: string[];
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    phone: string;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string;
    instagram: string;
    facebook: string;
    portfolio: string;
    neighborhood: string;
    approvedAt: Date;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface LoginWithCredentialsMethodBody {
  email: string;
  password: string;
}

export interface LoginWithCredentialsMethodResponse {
  message: string;
  user: {
    email: string;
    newsroom: string[];
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    phone: string;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string;
    instagram: string;
    facebook: string;
    portfolio: string;
    neighborhood: string;
    approvedAt: Date;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface LogoutUserMethodResponse {
  message: string;
  status: number;
}

export interface RegisterCredentialsMethodBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterCredentialsMethodResponse {
  message: string;
  user: {
    email: string;
    newsroom: string[];
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    phone: string;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string;
    instagram: string;
    facebook: string;
    portfolio: string;
    neighborhood: string;
    approvedAt: Date;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}
