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

export interface RegisterCredentialsMethodBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  piaa: { pooo: { pisspoo?: number }[] };
  summer: {
    soccer?: string;
    pomona: string | null;
    random: { test: number };
  }[];
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
