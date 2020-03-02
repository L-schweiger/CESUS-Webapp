/**
 * @fileoverview gRPC-Web generated client stub for API
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  AuthRequest,
  BoolMessage,
  CheckersMessage,
  Course,
  CourseEdit,
  CourseEditMessage,
  CoursesExMessage,
  CoursesMessage,
  DatabaseConnectionSettings,
  Empty,
  GeneralSettingsMessage,
  Group,
  GroupEdit,
  GroupEditMessage,
  GroupsMessage,
  Int64Message,
  LdapSettings,
  PasswordChange,
  Rating,
  RatingEdit,
  RatingEditMessage,
  SessionToken,
  SetupStateMessage,
  SetupSummary,
  SslCredentialsInfo,
  SslCredentialsMessage,
  StringMessage,
  Submission,
  SubmissionEdit,
  SubmissionEditMessage,
  Task,
  TaskEdit,
  TaskEditMessage,
  TasksMessage,
  User,
  UserEdit,
  UserEditMessage,
  UsersMessage} from './Communication_pb';

export class UserServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    UsersMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    UsersMessage.deserializeBinary
  );

  getUsers(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UsersMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/GetUsers',
      request,
      metadata || {},
      this.methodInfoGetUsers,
      callback);
  }

  methodInfoGetUser = new grpcWeb.AbstractClientBase.MethodInfo(
    User,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    User.deserializeBinary
  );

  getUser(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: User) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/GetUser',
      request,
      metadata || {},
      this.methodInfoGetUser,
      callback);
  }

  methodInfoCreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    User,
    (request: UserEdit) => {
      return request.serializeBinary();
    },
    User.deserializeBinary
  );

  createUser(
    request: UserEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: User) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/CreateUser',
      request,
      metadata || {},
      this.methodInfoCreateUser,
      callback);
  }

  methodInfoEditUser = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: UserEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editUser(
    request: UserEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/EditUser',
      request,
      metadata || {},
      this.methodInfoEditUser,
      callback);
  }

  methodInfoDeleteUser = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteUser(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/DeleteUser',
      request,
      metadata || {},
      this.methodInfoDeleteUser,
      callback);
  }

  methodInfoChangePassword = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: PasswordChange) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  changePassword(
    request: PasswordChange,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/ChangePassword',
      request,
      metadata || {},
      this.methodInfoChangePassword,
      callback);
  }

  methodInfoGetUsernameExists = new grpcWeb.AbstractClientBase.MethodInfo(
    BoolMessage,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    BoolMessage.deserializeBinary
  );

  getUsernameExists(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BoolMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.UserService/GetUsernameExists',
      request,
      metadata || {},
      this.methodInfoGetUsernameExists,
      callback);
  }

}

export class GroupServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetGroups = new grpcWeb.AbstractClientBase.MethodInfo(
    GroupsMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    GroupsMessage.deserializeBinary
  );

  getGroups(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GroupsMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.GroupService/GetGroups',
      request,
      metadata || {},
      this.methodInfoGetGroups,
      callback);
  }

  methodInfoGetGroup = new grpcWeb.AbstractClientBase.MethodInfo(
    Group,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Group.deserializeBinary
  );

  getGroup(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Group) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.GroupService/GetGroup',
      request,
      metadata || {},
      this.methodInfoGetGroup,
      callback);
  }

  methodInfoCreateGroup = new grpcWeb.AbstractClientBase.MethodInfo(
    Group,
    (request: GroupEdit) => {
      return request.serializeBinary();
    },
    Group.deserializeBinary
  );

  createGroup(
    request: GroupEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Group) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.GroupService/CreateGroup',
      request,
      metadata || {},
      this.methodInfoCreateGroup,
      callback);
  }

  methodInfoEditGroup = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: GroupEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editGroup(
    request: GroupEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.GroupService/EditGroup',
      request,
      metadata || {},
      this.methodInfoEditGroup,
      callback);
  }

  methodInfoDeleteGroup = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteGroup(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.GroupService/DeleteGroup',
      request,
      metadata || {},
      this.methodInfoDeleteGroup,
      callback);
  }

}

export class CourseServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetCourses = new grpcWeb.AbstractClientBase.MethodInfo(
    CoursesMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    CoursesMessage.deserializeBinary
  );

  getCourses(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CoursesMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/GetCourses',
      request,
      metadata || {},
      this.methodInfoGetCourses,
      callback);
  }

  methodInfoGetCourse = new grpcWeb.AbstractClientBase.MethodInfo(
    Course,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Course.deserializeBinary
  );

  getCourse(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Course) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/GetCourse',
      request,
      metadata || {},
      this.methodInfoGetCourse,
      callback);
  }

  methodInfoCreateCourse = new grpcWeb.AbstractClientBase.MethodInfo(
    Course,
    (request: CourseEdit) => {
      return request.serializeBinary();
    },
    Course.deserializeBinary
  );

  createCourse(
    request: CourseEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Course) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/CreateCourse',
      request,
      metadata || {},
      this.methodInfoCreateCourse,
      callback);
  }

  methodInfoEditCourse = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: CourseEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editCourse(
    request: CourseEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/EditCourse',
      request,
      metadata || {},
      this.methodInfoEditCourse,
      callback);
  }

  methodInfoDeleteCourse = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteCourse(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/DeleteCourse',
      request,
      metadata || {},
      this.methodInfoDeleteCourse,
      callback);
  }

  methodInfoGetCoursesForDashboard = new grpcWeb.AbstractClientBase.MethodInfo(
    CoursesExMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    CoursesExMessage.deserializeBinary
  );

  getCoursesForDashboard(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CoursesExMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.CourseService/GetCoursesForDashboard',
      request,
      metadata || {},
      this.methodInfoGetCoursesForDashboard,
      callback);
  }

}

export class TaskServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetTask = new grpcWeb.AbstractClientBase.MethodInfo(
    Task,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Task.deserializeBinary
  );

  getTask(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Task) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/GetTask',
      request,
      metadata || {},
      this.methodInfoGetTask,
      callback);
  }

  methodInfoCreateTask = new grpcWeb.AbstractClientBase.MethodInfo(
    Task,
    (request: TaskEdit) => {
      return request.serializeBinary();
    },
    Task.deserializeBinary
  );

  createTask(
    request: TaskEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Task) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/CreateTask',
      request,
      metadata || {},
      this.methodInfoCreateTask,
      callback);
  }

  methodInfoEditTask = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: TaskEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editTask(
    request: TaskEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/EditTask',
      request,
      metadata || {},
      this.methodInfoEditTask,
      callback);
  }

  methodInfoDeleteTask = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteTask(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/DeleteTask',
      request,
      metadata || {},
      this.methodInfoDeleteTask,
      callback);
  }

  methodInfoGetOpenTasksSorted = new grpcWeb.AbstractClientBase.MethodInfo(
    TasksMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    TasksMessage.deserializeBinary
  );

  getOpenTasksSorted(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: TasksMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/GetOpenTasksSorted',
      request,
      metadata || {},
      this.methodInfoGetOpenTasksSorted,
      callback);
  }

  methodInfoCreateSolutionFile = new grpcWeb.AbstractClientBase.MethodInfo(
    StringMessage,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    StringMessage.deserializeBinary
  );

  createSolutionFile(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: StringMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.TaskService/CreateSolutionFile',
      request,
      metadata || {},
      this.methodInfoCreateSolutionFile,
      callback);
  }

}

export class SubmissionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetSubmission = new grpcWeb.AbstractClientBase.MethodInfo(
    Submission,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Submission.deserializeBinary
  );

  getSubmission(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Submission) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SubmissionService/GetSubmission',
      request,
      metadata || {},
      this.methodInfoGetSubmission,
      callback);
  }

  methodInfoCreateSubmission = new grpcWeb.AbstractClientBase.MethodInfo(
    Submission,
    (request: SubmissionEdit) => {
      return request.serializeBinary();
    },
    Submission.deserializeBinary
  );

  createSubmission(
    request: SubmissionEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Submission) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SubmissionService/CreateSubmission',
      request,
      metadata || {},
      this.methodInfoCreateSubmission,
      callback);
  }

  methodInfoEditSubmission = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: SubmissionEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editSubmission(
    request: SubmissionEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SubmissionService/EditSubmission',
      request,
      metadata || {},
      this.methodInfoEditSubmission,
      callback);
  }

  methodInfoDeleteSubmission = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteSubmission(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SubmissionService/DeleteSubmission',
      request,
      metadata || {},
      this.methodInfoDeleteSubmission,
      callback);
  }

}

export class RatingServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateRating = new grpcWeb.AbstractClientBase.MethodInfo(
    Rating,
    (request: RatingEdit) => {
      return request.serializeBinary();
    },
    Rating.deserializeBinary
  );

  createRating(
    request: RatingEdit,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Rating) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.RatingService/CreateRating',
      request,
      metadata || {},
      this.methodInfoCreateRating,
      callback);
  }

  methodInfoEditRating = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: RatingEditMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  editRating(
    request: RatingEditMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.RatingService/EditRating',
      request,
      metadata || {},
      this.methodInfoEditRating,
      callback);
  }

  methodInfoDeleteRating = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  deleteRating(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.RatingService/DeleteRating',
      request,
      metadata || {},
      this.methodInfoDeleteRating,
      callback);
  }

}

export class AuthServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoAuth = new grpcWeb.AbstractClientBase.MethodInfo(
    SessionToken,
    (request: AuthRequest) => {
      return request.serializeBinary();
    },
    SessionToken.deserializeBinary
  );

  auth(
    request: AuthRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SessionToken) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.AuthService/Auth',
      request,
      metadata || {},
      this.methodInfoAuth,
      callback);
  }

  methodInfoCheckTokenValid = new grpcWeb.AbstractClientBase.MethodInfo(
    BoolMessage,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    BoolMessage.deserializeBinary
  );

  checkTokenValid(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BoolMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.AuthService/CheckTokenValid',
      request,
      metadata || {},
      this.methodInfoCheckTokenValid,
      callback);
  }

}

export class SettingsServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetDatabaseConnectionSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    DatabaseConnectionSettings,
    (request: Empty) => {
      return request.serializeBinary();
    },
    DatabaseConnectionSettings.deserializeBinary
  );

  getDatabaseConnectionSettings(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: DatabaseConnectionSettings) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/GetDatabaseConnectionSettings',
      request,
      metadata || {},
      this.methodInfoGetDatabaseConnectionSettings,
      callback);
  }

  methodInfoSyncADNow = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: Empty) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  syncADNow(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/SyncADNow',
      request,
      metadata || {},
      this.methodInfoSyncADNow,
      callback);
  }

  methodInfoGetSslInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    SslCredentialsInfo,
    (request: Empty) => {
      return request.serializeBinary();
    },
    SslCredentialsInfo.deserializeBinary
  );

  getSslInfo(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SslCredentialsInfo) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/GetSslInfo',
      request,
      metadata || {},
      this.methodInfoGetSslInfo,
      callback);
  }

  methodInfoSetSslCredentials = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: SslCredentialsMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setSslCredentials(
    request: SslCredentialsMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/SetSslCredentials',
      request,
      metadata || {},
      this.methodInfoSetSslCredentials,
      callback);
  }

  methodInfoSetLdapSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: LdapSettings) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setLdapSettings(
    request: LdapSettings,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/SetLdapSettings',
      request,
      metadata || {},
      this.methodInfoSetLdapSettings,
      callback);
  }

  methodInfoGetLdapSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    LdapSettings,
    (request: Empty) => {
      return request.serializeBinary();
    },
    LdapSettings.deserializeBinary
  );

  getLdapSettings(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: LdapSettings) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/GetLdapSettings',
      request,
      metadata || {},
      this.methodInfoGetLdapSettings,
      callback);
  }

  methodInfoSetGeneralSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: GeneralSettingsMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setGeneralSettings(
    request: GeneralSettingsMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/SetGeneralSettings',
      request,
      metadata || {},
      this.methodInfoSetGeneralSettings,
      callback);
  }

  methodInfoGetGeneralSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    GeneralSettingsMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    GeneralSettingsMessage.deserializeBinary
  );

  getGeneralSettings(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GeneralSettingsMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/GetGeneralSettings',
      request,
      metadata || {},
      this.methodInfoGetGeneralSettings,
      callback);
  }

  methodInfoUnsetLdapSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: Empty) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  unsetLdapSettings(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SettingsService/UnsetLdapSettings',
      request,
      metadata || {},
      this.methodInfoUnsetLdapSettings,
      callback);
  }

}

export class SetupServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetState = new grpcWeb.AbstractClientBase.MethodInfo(
    SetupStateMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    SetupStateMessage.deserializeBinary
  );

  getState(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SetupStateMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/GetState',
      request,
      metadata || {},
      this.methodInfoGetState,
      callback);
  }

  methodInfoConfigureDatabase = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: DatabaseConnectionSettings) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  configureDatabase(
    request: DatabaseConnectionSettings,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/ConfigureDatabase',
      request,
      metadata || {},
      this.methodInfoConfigureDatabase,
      callback);
  }

  methodInfoConfigureAdminAccount = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  configureAdminAccount(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/ConfigureAdminAccount',
      request,
      metadata || {},
      this.methodInfoConfigureAdminAccount,
      callback);
  }

  methodInfoSetSslCredentials = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: SslCredentialsMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setSslCredentials(
    request: SslCredentialsMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/SetSslCredentials',
      request,
      metadata || {},
      this.methodInfoSetSslCredentials,
      callback);
  }

  methodInfoSetLdapSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: LdapSettings) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setLdapSettings(
    request: LdapSettings,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/SetLdapSettings',
      request,
      metadata || {},
      this.methodInfoSetLdapSettings,
      callback);
  }

  methodInfoSetGeneralSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: GeneralSettingsMessage) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  setGeneralSettings(
    request: GeneralSettingsMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/SetGeneralSettings',
      request,
      metadata || {},
      this.methodInfoSetGeneralSettings,
      callback);
  }

  methodInfoCompleteSetup = new grpcWeb.AbstractClientBase.MethodInfo(
    Empty,
    (request: Empty) => {
      return request.serializeBinary();
    },
    Empty.deserializeBinary
  );

  completeSetup(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Empty) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/CompleteSetup',
      request,
      metadata || {},
      this.methodInfoCompleteSetup,
      callback);
  }

  methodInfoGetSetupSummary = new grpcWeb.AbstractClientBase.MethodInfo(
    SetupSummary,
    (request: Empty) => {
      return request.serializeBinary();
    },
    SetupSummary.deserializeBinary
  );

  getSetupSummary(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SetupSummary) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/GetSetupSummary',
      request,
      metadata || {},
      this.methodInfoGetSetupSummary,
      callback);
  }

  methodInfoCheckSetupPW = new grpcWeb.AbstractClientBase.MethodInfo(
    BoolMessage,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    BoolMessage.deserializeBinary
  );

  checkSetupPW(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BoolMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.SetupService/CheckSetupPW',
      request,
      metadata || {},
      this.methodInfoCheckSetupPW,
      callback);
  }

}

export class MiscServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetServerTime = new grpcWeb.AbstractClientBase.MethodInfo(
    Int64Message,
    (request: Empty) => {
      return request.serializeBinary();
    },
    Int64Message.deserializeBinary
  );

  getServerTime(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Int64Message) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.MiscService/GetServerTime',
      request,
      metadata || {},
      this.methodInfoGetServerTime,
      callback);
  }

  methodInfoGetAvailableCheckers = new grpcWeb.AbstractClientBase.MethodInfo(
    CheckersMessage,
    (request: Empty) => {
      return request.serializeBinary();
    },
    CheckersMessage.deserializeBinary
  );

  getAvailableCheckers(
    request: Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CheckersMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.MiscService/GetAvailableCheckers',
      request,
      metadata || {},
      this.methodInfoGetAvailableCheckers,
      callback);
  }

  methodInfoGetFilename = new grpcWeb.AbstractClientBase.MethodInfo(
    StringMessage,
    (request: StringMessage) => {
      return request.serializeBinary();
    },
    StringMessage.deserializeBinary
  );

  getFilename(
    request: StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: StringMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/API.MiscService/GetFilename',
      request,
      metadata || {},
      this.methodInfoGetFilename,
      callback);
  }

}

