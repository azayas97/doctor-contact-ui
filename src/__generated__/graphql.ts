export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateDoctorMutationRequest = {
  clinic: Scalars['String']['input'];
  department: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type DcsButton = {
  __typename?: 'DCSButton';
  disabled: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  type: DcsButtonType;
};

export enum DcsButtonType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

export type DcsCard = {
  __typename?: 'DCSCard';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneNumberLabel: Scalars['String']['output'];
  workplace: Scalars['String']['output'];
};

export type DcsField = {
  __typename?: 'DCSField';
  disabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  placeholder?: Maybe<Scalars['String']['output']>;
  type: DcsFieldType;
  value?: Maybe<Scalars['String']['output']>;
};

export enum DcsFieldType {
  Password = 'PASSWORD',
  Text = 'TEXT'
}

export type DcsLink = {
  __typename?: 'DCSLink';
  text: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DcsPopup = {
  __typename?: 'DCSPopup';
  body: Scalars['String']['output'];
  header: Scalars['String']['output'];
  primary: DcsButton;
  secondary: DcsButton;
};

export type DcsResultCard = {
  __typename?: 'DCSResultCard';
  text: Scalars['String']['output'];
  type: DcsResultCardType;
};

export enum DcsResultCardType {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type Dashboard = {
  __typename?: 'Dashboard';
  actionButton: DcsButton;
  doctors: Array<DcsCard>;
  header: Scalars['String']['output'];
  removePopup: DcsPopup;
};

export type DeleteModal = {
  __typename?: 'DeleteModal';
  closeButton: Scalars['Boolean']['output'];
  header: Scalars['String']['output'];
  primaryButton?: Maybe<DcsButton>;
  secondaryButton?: Maybe<DcsButton>;
  subHeader?: Maybe<Scalars['String']['output']>;
};

export type DoctorSideSheet = {
  __typename?: 'DoctorSideSheet';
  fields: DoctorSideSheetFields;
  header: Scalars['String']['output'];
  subHeader?: Maybe<Scalars['String']['output']>;
  submit: DcsButton;
};

export type DoctorSideSheetFields = {
  __typename?: 'DoctorSideSheetFields';
  clinic: DcsField;
  department: DcsField;
  doctorName: DcsField;
  phone: DcsField;
};

export type LoginForm = {
  __typename?: 'LoginForm';
  fields: LoginFormFields;
  header: Scalars['String']['output'];
  subHeader: Scalars['String']['output'];
};

export type LoginFormFields = {
  __typename?: 'LoginFormFields';
  button: DcsButton;
  email: DcsField;
  password: DcsField;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDoctorMutation?: Maybe<MutationResponse>;
  removeDoctorMutation?: Maybe<MutationResponse>;
  updateDoctorMutation?: Maybe<MutationResponse>;
};


export type MutationCreateDoctorMutationArgs = {
  request: CreateDoctorMutationRequest;
  userId: Scalars['String']['input'];
};


export type MutationRemoveDoctorMutationArgs = {
  request: RemoveDoctorMutationRequest;
  userId: Scalars['String']['input'];
};


export type MutationUpdateDoctorMutationArgs = {
  request: UpdateDoctorMutationRequest;
  userId: Scalars['String']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  resultCard: DcsResultCard;
};

export type NavigationBar = {
  __typename?: 'NavigationBar';
  logout: DcsLink;
  mainLink: DcsLink;
};

export type Query = {
  __typename?: 'Query';
  dashboardQuery?: Maybe<Dashboard>;
  deleteDoctorModalQuery?: Maybe<DeleteModal>;
  doctorSideSheetQuery?: Maybe<DoctorSideSheet>;
  loginFormQuery?: Maybe<LoginForm>;
  navigationQuery?: Maybe<NavigationBar>;
};


export type QueryDashboardQueryArgs = {
  userId: Scalars['String']['input'];
};


export type QueryDoctorSideSheetQueryArgs = {
  doctorId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryNavigationQueryArgs = {
  userId: Scalars['String']['input'];
};

export type RemoveDoctorMutationRequest = {
  doctorId: Scalars['String']['input'];
};

export type UpdateDoctorMutationRequest = {
  clinic?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};
