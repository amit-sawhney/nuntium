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
    preferredName: string | null;
    phone: string | null;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string | null;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    portfolio: string | null;
    neighborhood: string | null;
    approvedAt: Date | null;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface FindUserMethodParams {}

export interface FindUserMethodQuery {}

export interface FindUserMethodBody {}

export interface FindUserMethodResponse {
  message: string;
  user: {
    email: string;
    newsroom: string[];
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string | null;
    phone: string | null;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string | null;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    portfolio: string | null;
    neighborhood: string | null;
    approvedAt: Date | null;
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
    preferredName: string | null;
    phone: string | null;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string | null;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    portfolio: string | null;
    neighborhood: string | null;
    approvedAt: Date | null;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface LogoutUserMethodResponse {
  message: string;
  status?: number;
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
    preferredName: string | null;
    phone: string | null;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string | null;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    portfolio: string | null;
    neighborhood: string | null;
    approvedAt: Date | null;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface RetrieveCurrentUserMethodResponse {
  message: string;
  user: {
    email: string;
    newsroom: string[];
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string | null;
    phone: string | null;
    genders: string[];
    pronouns: string[];
    races: string[];
    linkedin: string | null;
    interests: string[];
    teams: string[];
    onboardingState: string;
    applicationState: string;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    portfolio: string | null;
    neighborhood: string | null;
    approvedAt: Date | null;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  } | null;
}
