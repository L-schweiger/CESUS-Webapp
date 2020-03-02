import * as jspb from "google-protobuf"

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  getRole(): Role;
  setRole(value: Role): void;

  getIsad(): boolean;
  setIsad(value: boolean): void;

  getGroupsList(): Array<GroupPreview>;
  setGroupsList(value: Array<GroupPreview>): void;
  clearGroupsList(): void;
  addGroups(value?: GroupPreview, index?: number): GroupPreview;

  getCoursesList(): Array<CoursePreview>;
  setCoursesList(value: Array<CoursePreview>): void;
  clearCoursesList(): void;
  addCourses(value?: CoursePreview, index?: number): CoursePreview;

  getSubmissionsList(): Array<SubmissionPreview>;
  setSubmissionsList(value: Array<SubmissionPreview>): void;
  clearSubmissionsList(): void;
  addSubmissions(value?: SubmissionPreview, index?: number): SubmissionPreview;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    role: Role,
    isad: boolean,
    groupsList: Array<GroupPreview.AsObject>,
    coursesList: Array<CoursePreview.AsObject>,
    submissionsList: Array<SubmissionPreview.AsObject>,
    hash: string,
  }
}

export class UserPreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  getRole(): Role;
  setRole(value: Role): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPreview.AsObject;
  static toObject(includeInstance: boolean, msg: UserPreview): UserPreview.AsObject;
  static serializeBinaryToWriter(message: UserPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPreview;
  static deserializeBinaryFromReader(message: UserPreview, reader: jspb.BinaryReader): UserPreview;
}

export namespace UserPreview {
  export type AsObject = {
    id: string,
    firstname: string,
    lastname: string,
    role: Role,
  }
}

export class UserEdit extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  getPasswordset(): boolean;
  setPasswordset(value: boolean): void;

  getPassword(): string;
  setPassword(value: string): void;

  getRole(): Role;
  setRole(value: Role): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserEdit.AsObject;
  static toObject(includeInstance: boolean, msg: UserEdit): UserEdit.AsObject;
  static serializeBinaryToWriter(message: UserEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserEdit;
  static deserializeBinaryFromReader(message: UserEdit, reader: jspb.BinaryReader): UserEdit;
}

export namespace UserEdit {
  export type AsObject = {
    username: string,
    firstname: string,
    lastname: string,
    passwordset: boolean,
    password: string,
    role: Role,
  }
}

export class PasswordChange extends jspb.Message {
  getPasswordold(): string;
  setPasswordold(value: string): void;

  getPasswordnew(): string;
  setPasswordnew(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordChange.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordChange): PasswordChange.AsObject;
  static serializeBinaryToWriter(message: PasswordChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordChange;
  static deserializeBinaryFromReader(message: PasswordChange, reader: jspb.BinaryReader): PasswordChange;
}

export namespace PasswordChange {
  export type AsObject = {
    passwordold: string,
    passwordnew: string,
  }
}

export class Group extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getIsad(): boolean;
  setIsad(value: boolean): void;

  getUsersList(): Array<UserPreview>;
  setUsersList(value: Array<UserPreview>): void;
  clearUsersList(): void;
  addUsers(value?: UserPreview, index?: number): UserPreview;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Group.AsObject;
  static toObject(includeInstance: boolean, msg: Group): Group.AsObject;
  static serializeBinaryToWriter(message: Group, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Group;
  static deserializeBinaryFromReader(message: Group, reader: jspb.BinaryReader): Group;
}

export namespace Group {
  export type AsObject = {
    id: string,
    name: string,
    isad: boolean,
    usersList: Array<UserPreview.AsObject>,
    hash: string,
  }
}

export class GroupPreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getMembercount(): number;
  setMembercount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupPreview.AsObject;
  static toObject(includeInstance: boolean, msg: GroupPreview): GroupPreview.AsObject;
  static serializeBinaryToWriter(message: GroupPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupPreview;
  static deserializeBinaryFromReader(message: GroupPreview, reader: jspb.BinaryReader): GroupPreview;
}

export namespace GroupPreview {
  export type AsObject = {
    id: string,
    name: string,
    membercount: number,
  }
}

export class GroupEdit extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getUsersaddList(): Array<string>;
  setUsersaddList(value: Array<string>): void;
  clearUsersaddList(): void;
  addUsersadd(value: string, index?: number): void;

  getUsersremoveList(): Array<string>;
  setUsersremoveList(value: Array<string>): void;
  clearUsersremoveList(): void;
  addUsersremove(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupEdit.AsObject;
  static toObject(includeInstance: boolean, msg: GroupEdit): GroupEdit.AsObject;
  static serializeBinaryToWriter(message: GroupEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupEdit;
  static deserializeBinaryFromReader(message: GroupEdit, reader: jspb.BinaryReader): GroupEdit;
}

export namespace GroupEdit {
  export type AsObject = {
    name: string,
    usersaddList: Array<string>,
    usersremoveList: Array<string>,
  }
}

export class Course extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUsersList(): Array<UserPreview>;
  setUsersList(value: Array<UserPreview>): void;
  clearUsersList(): void;
  addUsers(value?: UserPreview, index?: number): UserPreview;

  getTasksList(): Array<TaskPreview>;
  setTasksList(value: Array<TaskPreview>): void;
  clearTasksList(): void;
  addTasks(value?: TaskPreview, index?: number): TaskPreview;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Course.AsObject;
  static toObject(includeInstance: boolean, msg: Course): Course.AsObject;
  static serializeBinaryToWriter(message: Course, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Course;
  static deserializeBinaryFromReader(message: Course, reader: jspb.BinaryReader): Course;
}

export namespace Course {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    usersList: Array<UserPreview.AsObject>,
    tasksList: Array<TaskPreview.AsObject>,
    hash: string,
  }
}

export class CoursePreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoursePreview.AsObject;
  static toObject(includeInstance: boolean, msg: CoursePreview): CoursePreview.AsObject;
  static serializeBinaryToWriter(message: CoursePreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoursePreview;
  static deserializeBinaryFromReader(message: CoursePreview, reader: jspb.BinaryReader): CoursePreview;
}

export namespace CoursePreview {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class CourseEdit extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUsersaddList(): Array<string>;
  setUsersaddList(value: Array<string>): void;
  clearUsersaddList(): void;
  addUsersadd(value: string, index?: number): void;

  getUsersremoveList(): Array<string>;
  setUsersremoveList(value: Array<string>): void;
  clearUsersremoveList(): void;
  addUsersremove(value: string, index?: number): void;

  getGroupsaddList(): Array<string>;
  setGroupsaddList(value: Array<string>): void;
  clearGroupsaddList(): void;
  addGroupsadd(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseEdit.AsObject;
  static toObject(includeInstance: boolean, msg: CourseEdit): CourseEdit.AsObject;
  static serializeBinaryToWriter(message: CourseEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseEdit;
  static deserializeBinaryFromReader(message: CourseEdit, reader: jspb.BinaryReader): CourseEdit;
}

export namespace CourseEdit {
  export type AsObject = {
    name: string,
    description: string,
    usersaddList: Array<string>,
    usersremoveList: Array<string>,
    groupsaddList: Array<string>,
  }
}

export class Attachment extends jspb.Message {
  getFile(): string;
  setFile(value: string): void;

  getHidden(): boolean;
  setHidden(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Attachment.AsObject;
  static toObject(includeInstance: boolean, msg: Attachment): Attachment.AsObject;
  static serializeBinaryToWriter(message: Attachment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Attachment;
  static deserializeBinaryFromReader(message: Attachment, reader: jspb.BinaryReader): Attachment;
}

export namespace Attachment {
  export type AsObject = {
    file: string,
    hidden: boolean,
  }
}

export class Task extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getStatementfile(): string;
  setStatementfile(value: string): void;

  getSamplesolutionfile(): string;
  setSamplesolutionfile(value: string): void;

  getSamplesolutiondownloadable(): SampleSolutionDownloadable;
  setSamplesolutiondownloadable(value: SampleSolutionDownloadable): void;

  getDeadline(): number;
  setDeadline(value: number): void;

  getMaxpoints(): number;
  setMaxpoints(value: number): void;

  getEvalinfo(): EvalInfo | undefined;
  setEvalinfo(value?: EvalInfo): void;
  hasEvalinfo(): boolean;
  clearEvalinfo(): void;

  getShowratingafterdeadline(): boolean;
  setShowratingafterdeadline(value: boolean): void;

  getCourse(): CoursePreview | undefined;
  setCourse(value?: CoursePreview): void;
  hasCourse(): boolean;
  clearCourse(): void;

  getAttatchmentsList(): Array<Attachment>;
  setAttatchmentsList(value: Array<Attachment>): void;
  clearAttatchmentsList(): void;
  addAttatchments(value?: Attachment, index?: number): Attachment;

  getSubmissionsList(): Array<SubmissionPreview>;
  setSubmissionsList(value: Array<SubmissionPreview>): void;
  clearSubmissionsList(): void;
  addSubmissions(value?: SubmissionPreview, index?: number): SubmissionPreview;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    statementfile: string,
    samplesolutionfile: string,
    samplesolutiondownloadable: SampleSolutionDownloadable,
    deadline: number,
    maxpoints: number,
    evalinfo?: EvalInfo.AsObject,
    showratingafterdeadline: boolean,
    course?: CoursePreview.AsObject,
    attatchmentsList: Array<Attachment.AsObject>,
    submissionsList: Array<SubmissionPreview.AsObject>,
    hash: string,
  }
}

export class TaskPreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskPreview.AsObject;
  static toObject(includeInstance: boolean, msg: TaskPreview): TaskPreview.AsObject;
  static serializeBinaryToWriter(message: TaskPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskPreview;
  static deserializeBinaryFromReader(message: TaskPreview, reader: jspb.BinaryReader): TaskPreview;
}

export namespace TaskPreview {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class TaskEdit extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getStatementfile(): string;
  setStatementfile(value: string): void;

  getSamplesolutionfile(): string;
  setSamplesolutionfile(value: string): void;

  getSamplesolutiondownloadable(): SampleSolutionDownloadable;
  setSamplesolutiondownloadable(value: SampleSolutionDownloadable): void;

  getDeadline(): number;
  setDeadline(value: number): void;

  getShowratingafterdeadline(): boolean;
  setShowratingafterdeadline(value: boolean): void;

  getMaxpoints(): number;
  setMaxpoints(value: number): void;

  getEvalinfo(): EvalInfo | undefined;
  setEvalinfo(value?: EvalInfo): void;
  hasEvalinfo(): boolean;
  clearEvalinfo(): void;

  getCourseid(): string;
  setCourseid(value: string): void;

  getAttachmentsaddList(): Array<Attachment>;
  setAttachmentsaddList(value: Array<Attachment>): void;
  clearAttachmentsaddList(): void;
  addAttachmentsadd(value?: Attachment, index?: number): Attachment;

  getAttachmentsremoveList(): Array<string>;
  setAttachmentsremoveList(value: Array<string>): void;
  clearAttachmentsremoveList(): void;
  addAttachmentsremove(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskEdit.AsObject;
  static toObject(includeInstance: boolean, msg: TaskEdit): TaskEdit.AsObject;
  static serializeBinaryToWriter(message: TaskEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskEdit;
  static deserializeBinaryFromReader(message: TaskEdit, reader: jspb.BinaryReader): TaskEdit;
}

export namespace TaskEdit {
  export type AsObject = {
    name: string,
    description: string,
    statementfile: string,
    samplesolutionfile: string,
    samplesolutiondownloadable: SampleSolutionDownloadable,
    deadline: number,
    showratingafterdeadline: boolean,
    maxpoints: number,
    evalinfo?: EvalInfo.AsObject,
    courseid: string,
    attachmentsaddList: Array<Attachment.AsObject>,
    attachmentsremoveList: Array<string>,
  }
}

export class Submission extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  getFile(): string;
  setFile(value: string): void;

  getSubmissiondate(): number;
  setSubmissiondate(value: number): void;

  getUser(): UserPreview | undefined;
  setUser(value?: UserPreview): void;
  hasUser(): boolean;
  clearUser(): void;

  getTask(): TaskPreview | undefined;
  setTask(value?: TaskPreview): void;
  hasTask(): boolean;
  clearTask(): void;

  getRating(): Rating | undefined;
  setRating(value?: Rating): void;
  hasRating(): boolean;
  clearRating(): void;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Submission.AsObject;
  static toObject(includeInstance: boolean, msg: Submission): Submission.AsObject;
  static serializeBinaryToWriter(message: Submission, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Submission;
  static deserializeBinaryFromReader(message: Submission, reader: jspb.BinaryReader): Submission;
}

export namespace Submission {
  export type AsObject = {
    id: string,
    comment: string,
    file: string,
    submissiondate: number,
    user?: UserPreview.AsObject,
    task?: TaskPreview.AsObject,
    rating?: Rating.AsObject,
    hash: string,
  }
}

export class SubmissionPreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSubmissiondate(): number;
  setSubmissiondate(value: number): void;

  getUser(): UserPreview | undefined;
  setUser(value?: UserPreview): void;
  hasUser(): boolean;
  clearUser(): void;

  getRatingavailable(): boolean;
  setRatingavailable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionPreview.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionPreview): SubmissionPreview.AsObject;
  static serializeBinaryToWriter(message: SubmissionPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionPreview;
  static deserializeBinaryFromReader(message: SubmissionPreview, reader: jspb.BinaryReader): SubmissionPreview;
}

export namespace SubmissionPreview {
  export type AsObject = {
    id: string,
    submissiondate: number,
    user?: UserPreview.AsObject,
    ratingavailable: boolean,
  }
}

export class SubmissionEdit extends jspb.Message {
  getComment(): string;
  setComment(value: string): void;

  getFile(): string;
  setFile(value: string): void;

  getTaskid(): string;
  setTaskid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionEdit.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionEdit): SubmissionEdit.AsObject;
  static serializeBinaryToWriter(message: SubmissionEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionEdit;
  static deserializeBinaryFromReader(message: SubmissionEdit, reader: jspb.BinaryReader): SubmissionEdit;
}

export namespace SubmissionEdit {
  export type AsObject = {
    comment: string,
    file: string,
    taskid: string,
  }
}

export class Rating extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPoints(): number;
  setPoints(value: number): void;

  getGrade(): number;
  setGrade(value: number): void;

  getComment(): string;
  setComment(value: string): void;

  getUser(): UserPreview | undefined;
  setUser(value?: UserPreview): void;
  hasUser(): boolean;
  clearUser(): void;

  getSubmission(): SubmissionPreview | undefined;
  setSubmission(value?: SubmissionPreview): void;
  hasSubmission(): boolean;
  clearSubmission(): void;

  getHash(): string;
  setHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Rating.AsObject;
  static toObject(includeInstance: boolean, msg: Rating): Rating.AsObject;
  static serializeBinaryToWriter(message: Rating, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Rating;
  static deserializeBinaryFromReader(message: Rating, reader: jspb.BinaryReader): Rating;
}

export namespace Rating {
  export type AsObject = {
    id: string,
    points: number,
    grade: number,
    comment: string,
    user?: UserPreview.AsObject,
    submission?: SubmissionPreview.AsObject,
    hash: string,
  }
}

export class RatingEdit extends jspb.Message {
  getPoints(): number;
  setPoints(value: number): void;

  getGrade(): number;
  setGrade(value: number): void;

  getComment(): string;
  setComment(value: string): void;

  getSubmissionid(): string;
  setSubmissionid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RatingEdit.AsObject;
  static toObject(includeInstance: boolean, msg: RatingEdit): RatingEdit.AsObject;
  static serializeBinaryToWriter(message: RatingEdit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RatingEdit;
  static deserializeBinaryFromReader(message: RatingEdit, reader: jspb.BinaryReader): RatingEdit;
}

export namespace RatingEdit {
  export type AsObject = {
    points: number,
    grade: number,
    comment: string,
    submissionid: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class StringMessage extends jspb.Message {
  getStr(): string;
  setStr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StringMessage): StringMessage.AsObject;
  static serializeBinaryToWriter(message: StringMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringMessage;
  static deserializeBinaryFromReader(message: StringMessage, reader: jspb.BinaryReader): StringMessage;
}

export namespace StringMessage {
  export type AsObject = {
    str: string,
  }
}

export class UsersMessage extends jspb.Message {
  getUsersList(): Array<UserPreview>;
  setUsersList(value: Array<UserPreview>): void;
  clearUsersList(): void;
  addUsers(value?: UserPreview, index?: number): UserPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UsersMessage): UsersMessage.AsObject;
  static serializeBinaryToWriter(message: UsersMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersMessage;
  static deserializeBinaryFromReader(message: UsersMessage, reader: jspb.BinaryReader): UsersMessage;
}

export namespace UsersMessage {
  export type AsObject = {
    usersList: Array<UserPreview.AsObject>,
  }
}

export class UserEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): UserEdit | undefined;
  setEdit(value?: UserEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UserEditMessage): UserEditMessage.AsObject;
  static serializeBinaryToWriter(message: UserEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserEditMessage;
  static deserializeBinaryFromReader(message: UserEditMessage, reader: jspb.BinaryReader): UserEditMessage;
}

export namespace UserEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: UserEdit.AsObject,
  }
}

export class GroupsMessage extends jspb.Message {
  getGroupsList(): Array<GroupPreview>;
  setGroupsList(value: Array<GroupPreview>): void;
  clearGroupsList(): void;
  addGroups(value?: GroupPreview, index?: number): GroupPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GroupsMessage): GroupsMessage.AsObject;
  static serializeBinaryToWriter(message: GroupsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupsMessage;
  static deserializeBinaryFromReader(message: GroupsMessage, reader: jspb.BinaryReader): GroupsMessage;
}

export namespace GroupsMessage {
  export type AsObject = {
    groupsList: Array<GroupPreview.AsObject>,
  }
}

export class GroupEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): GroupEdit | undefined;
  setEdit(value?: GroupEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GroupEditMessage): GroupEditMessage.AsObject;
  static serializeBinaryToWriter(message: GroupEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupEditMessage;
  static deserializeBinaryFromReader(message: GroupEditMessage, reader: jspb.BinaryReader): GroupEditMessage;
}

export namespace GroupEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: GroupEdit.AsObject,
  }
}

export class CoursesMessage extends jspb.Message {
  getCoursesList(): Array<CoursePreview>;
  setCoursesList(value: Array<CoursePreview>): void;
  clearCoursesList(): void;
  addCourses(value?: CoursePreview, index?: number): CoursePreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoursesMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CoursesMessage): CoursesMessage.AsObject;
  static serializeBinaryToWriter(message: CoursesMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoursesMessage;
  static deserializeBinaryFromReader(message: CoursesMessage, reader: jspb.BinaryReader): CoursesMessage;
}

export namespace CoursesMessage {
  export type AsObject = {
    coursesList: Array<CoursePreview.AsObject>,
  }
}

export class CourseEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): CourseEdit | undefined;
  setEdit(value?: CourseEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CourseEditMessage): CourseEditMessage.AsObject;
  static serializeBinaryToWriter(message: CourseEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseEditMessage;
  static deserializeBinaryFromReader(message: CourseEditMessage, reader: jspb.BinaryReader): CourseEditMessage;
}

export namespace CourseEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: CourseEdit.AsObject,
  }
}

export class TasksMessage extends jspb.Message {
  getTasksList(): Array<TaskPreview>;
  setTasksList(value: Array<TaskPreview>): void;
  clearTasksList(): void;
  addTasks(value?: TaskPreview, index?: number): TaskPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TasksMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TasksMessage): TasksMessage.AsObject;
  static serializeBinaryToWriter(message: TasksMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TasksMessage;
  static deserializeBinaryFromReader(message: TasksMessage, reader: jspb.BinaryReader): TasksMessage;
}

export namespace TasksMessage {
  export type AsObject = {
    tasksList: Array<TaskPreview.AsObject>,
  }
}

export class TaskEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): TaskEdit | undefined;
  setEdit(value?: TaskEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TaskEditMessage): TaskEditMessage.AsObject;
  static serializeBinaryToWriter(message: TaskEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskEditMessage;
  static deserializeBinaryFromReader(message: TaskEditMessage, reader: jspb.BinaryReader): TaskEditMessage;
}

export namespace TaskEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: TaskEdit.AsObject,
  }
}

export class SubmissionEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): SubmissionEdit | undefined;
  setEdit(value?: SubmissionEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionEditMessage): SubmissionEditMessage.AsObject;
  static serializeBinaryToWriter(message: SubmissionEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionEditMessage;
  static deserializeBinaryFromReader(message: SubmissionEditMessage, reader: jspb.BinaryReader): SubmissionEditMessage;
}

export namespace SubmissionEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: SubmissionEdit.AsObject,
  }
}

export class AuthRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getExtendedtime(): boolean;
  setExtendedtime(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthRequest): AuthRequest.AsObject;
  static serializeBinaryToWriter(message: AuthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthRequest;
  static deserializeBinaryFromReader(message: AuthRequest, reader: jspb.BinaryReader): AuthRequest;
}

export namespace AuthRequest {
  export type AsObject = {
    username: string,
    password: string,
    extendedtime: boolean,
  }
}

export class SessionToken extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getCreationdate(): number;
  setCreationdate(value: number): void;

  getExpirationdate(): number;
  setExpirationdate(value: number): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionToken.AsObject;
  static toObject(includeInstance: boolean, msg: SessionToken): SessionToken.AsObject;
  static serializeBinaryToWriter(message: SessionToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionToken;
  static deserializeBinaryFromReader(message: SessionToken, reader: jspb.BinaryReader): SessionToken;
}

export namespace SessionToken {
  export type AsObject = {
    userid: string,
    creationdate: number,
    expirationdate: number,
    token: string,
  }
}

export class RatingEditMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getEdit(): RatingEdit | undefined;
  setEdit(value?: RatingEdit): void;
  hasEdit(): boolean;
  clearEdit(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RatingEditMessage.AsObject;
  static toObject(includeInstance: boolean, msg: RatingEditMessage): RatingEditMessage.AsObject;
  static serializeBinaryToWriter(message: RatingEditMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RatingEditMessage;
  static deserializeBinaryFromReader(message: RatingEditMessage, reader: jspb.BinaryReader): RatingEditMessage;
}

export namespace RatingEditMessage {
  export type AsObject = {
    id: string,
    hash: string,
    edit?: RatingEdit.AsObject,
  }
}

export class DatabaseConnectionSettings extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getDatabase(): string;
  setDatabase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DatabaseConnectionSettings.AsObject;
  static toObject(includeInstance: boolean, msg: DatabaseConnectionSettings): DatabaseConnectionSettings.AsObject;
  static serializeBinaryToWriter(message: DatabaseConnectionSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DatabaseConnectionSettings;
  static deserializeBinaryFromReader(message: DatabaseConnectionSettings, reader: jspb.BinaryReader): DatabaseConnectionSettings;
}

export namespace DatabaseConnectionSettings {
  export type AsObject = {
    address: string,
    username: string,
    password: string,
    database: string,
  }
}

export class ADImportSettings extends jspb.Message {
  getStudentsgroup(): string;
  setStudentsgroup(value: string): void;

  getTeachersgroup(): string;
  setTeachersgroup(value: string): void;

  getAdminsgroup(): string;
  setAdminsgroup(value: string): void;

  getGroupprefix(): string;
  setGroupprefix(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ADImportSettings.AsObject;
  static toObject(includeInstance: boolean, msg: ADImportSettings): ADImportSettings.AsObject;
  static serializeBinaryToWriter(message: ADImportSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ADImportSettings;
  static deserializeBinaryFromReader(message: ADImportSettings, reader: jspb.BinaryReader): ADImportSettings;
}

export namespace ADImportSettings {
  export type AsObject = {
    studentsgroup: string,
    teachersgroup: string,
    adminsgroup: string,
    groupprefix: string,
  }
}

export class BoolMessage extends jspb.Message {
  getBool(): boolean;
  setBool(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolMessage.AsObject;
  static toObject(includeInstance: boolean, msg: BoolMessage): BoolMessage.AsObject;
  static serializeBinaryToWriter(message: BoolMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BoolMessage;
  static deserializeBinaryFromReader(message: BoolMessage, reader: jspb.BinaryReader): BoolMessage;
}

export namespace BoolMessage {
  export type AsObject = {
    bool: boolean,
  }
}

export class CourseExPreview extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getNextdeadline(): number;
  setNextdeadline(value: number): void;

  getStudentmembers(): number;
  setStudentmembers(value: number): void;

  getSubmissions(): number;
  setSubmissions(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseExPreview.AsObject;
  static toObject(includeInstance: boolean, msg: CourseExPreview): CourseExPreview.AsObject;
  static serializeBinaryToWriter(message: CourseExPreview, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseExPreview;
  static deserializeBinaryFromReader(message: CourseExPreview, reader: jspb.BinaryReader): CourseExPreview;
}

export namespace CourseExPreview {
  export type AsObject = {
    id: string,
    name: string,
    nextdeadline: number,
    studentmembers: number,
    submissions: number,
  }
}

export class CoursesExMessage extends jspb.Message {
  getCoursesList(): Array<CourseExPreview>;
  setCoursesList(value: Array<CourseExPreview>): void;
  clearCoursesList(): void;
  addCourses(value?: CourseExPreview, index?: number): CourseExPreview;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoursesExMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CoursesExMessage): CoursesExMessage.AsObject;
  static serializeBinaryToWriter(message: CoursesExMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoursesExMessage;
  static deserializeBinaryFromReader(message: CoursesExMessage, reader: jspb.BinaryReader): CoursesExMessage;
}

export namespace CoursesExMessage {
  export type AsObject = {
    coursesList: Array<CourseExPreview.AsObject>,
  }
}

export class LdapSettings extends jspb.Message {
  getServer(): string;
  setServer(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getAdimportsettings(): ADImportSettings | undefined;
  setAdimportsettings(value?: ADImportSettings): void;
  hasAdimportsettings(): boolean;
  clearAdimportsettings(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LdapSettings.AsObject;
  static toObject(includeInstance: boolean, msg: LdapSettings): LdapSettings.AsObject;
  static serializeBinaryToWriter(message: LdapSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LdapSettings;
  static deserializeBinaryFromReader(message: LdapSettings, reader: jspb.BinaryReader): LdapSettings;
}

export namespace LdapSettings {
  export type AsObject = {
    server: string,
    username: string,
    password: string,
    adimportsettings?: ADImportSettings.AsObject,
  }
}

export class SslCredentialsInfo extends jspb.Message {
  getCommonname(): string;
  setCommonname(value: string): void;

  getThumbprint(): string;
  setThumbprint(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SslCredentialsInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SslCredentialsInfo): SslCredentialsInfo.AsObject;
  static serializeBinaryToWriter(message: SslCredentialsInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SslCredentialsInfo;
  static deserializeBinaryFromReader(message: SslCredentialsInfo, reader: jspb.BinaryReader): SslCredentialsInfo;
}

export namespace SslCredentialsInfo {
  export type AsObject = {
    commonname: string,
    thumbprint: string,
  }
}

export class SslCredentialsMessage extends jspb.Message {
  getFile(): string;
  setFile(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SslCredentialsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SslCredentialsMessage): SslCredentialsMessage.AsObject;
  static serializeBinaryToWriter(message: SslCredentialsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SslCredentialsMessage;
  static deserializeBinaryFromReader(message: SslCredentialsMessage, reader: jspb.BinaryReader): SslCredentialsMessage;
}

export namespace SslCredentialsMessage {
  export type AsObject = {
    file: string,
    password: string,
  }
}

export class SetupStateMessage extends jspb.Message {
  getState(): SetupState;
  setState(value: SetupState): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupStateMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SetupStateMessage): SetupStateMessage.AsObject;
  static serializeBinaryToWriter(message: SetupStateMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupStateMessage;
  static deserializeBinaryFromReader(message: SetupStateMessage, reader: jspb.BinaryReader): SetupStateMessage;
}

export namespace SetupStateMessage {
  export type AsObject = {
    state: SetupState,
  }
}

export class SetupSummary extends jspb.Message {
  getDatabasesettings(): DatabaseConnectionSettings | undefined;
  setDatabasesettings(value?: DatabaseConnectionSettings): void;
  hasDatabasesettings(): boolean;
  clearDatabasesettings(): void;

  getSslinfo(): SslCredentialsInfo | undefined;
  setSslinfo(value?: SslCredentialsInfo): void;
  hasSslinfo(): boolean;
  clearSslinfo(): void;

  getLdapsettings(): LdapSettings | undefined;
  setLdapsettings(value?: LdapSettings): void;
  hasLdapsettings(): boolean;
  clearLdapsettings(): void;

  getGeneralsettings(): GeneralSettingsMessage | undefined;
  setGeneralsettings(value?: GeneralSettingsMessage): void;
  hasGeneralsettings(): boolean;
  clearGeneralsettings(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupSummary.AsObject;
  static toObject(includeInstance: boolean, msg: SetupSummary): SetupSummary.AsObject;
  static serializeBinaryToWriter(message: SetupSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupSummary;
  static deserializeBinaryFromReader(message: SetupSummary, reader: jspb.BinaryReader): SetupSummary;
}

export namespace SetupSummary {
  export type AsObject = {
    databasesettings?: DatabaseConnectionSettings.AsObject,
    sslinfo?: SslCredentialsInfo.AsObject,
    ldapsettings?: LdapSettings.AsObject,
    generalsettings?: GeneralSettingsMessage.AsObject,
  }
}

export class GeneralSettingsMessage extends jspb.Message {
  getUsehsts(): boolean;
  setUsehsts(value: boolean): void;

  getConcurrentexecutioncount(): number;
  setConcurrentexecutioncount(value: number): void;

  getJobexecutiontime(): number;
  setJobexecutiontime(value: number): void;

  getExecuteevalasjob(): boolean;
  setExecuteevalasjob(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneralSettingsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GeneralSettingsMessage): GeneralSettingsMessage.AsObject;
  static serializeBinaryToWriter(message: GeneralSettingsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneralSettingsMessage;
  static deserializeBinaryFromReader(message: GeneralSettingsMessage, reader: jspb.BinaryReader): GeneralSettingsMessage;
}

export namespace GeneralSettingsMessage {
  export type AsObject = {
    usehsts: boolean,
    concurrentexecutioncount: number,
    jobexecutiontime: number,
    executeevalasjob: boolean,
  }
}

export class Int64Message extends jspb.Message {
  getInt(): number;
  setInt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int64Message.AsObject;
  static toObject(includeInstance: boolean, msg: Int64Message): Int64Message.AsObject;
  static serializeBinaryToWriter(message: Int64Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int64Message;
  static deserializeBinaryFromReader(message: Int64Message, reader: jspb.BinaryReader): Int64Message;
}

export namespace Int64Message {
  export type AsObject = {
    pb_int: number,
  }
}

export class CheckerInfo extends jspb.Message {
  getProgramminglanguage(): string;
  setProgramminglanguage(value: string): void;

  getSupportedcheckmodesList(): Array<CheckMode>;
  setSupportedcheckmodesList(value: Array<CheckMode>): void;
  clearSupportedcheckmodesList(): void;
  addSupportedcheckmodes(value: CheckMode, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckerInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CheckerInfo): CheckerInfo.AsObject;
  static serializeBinaryToWriter(message: CheckerInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckerInfo;
  static deserializeBinaryFromReader(message: CheckerInfo, reader: jspb.BinaryReader): CheckerInfo;
}

export namespace CheckerInfo {
  export type AsObject = {
    programminglanguage: string,
    supportedcheckmodesList: Array<CheckMode>,
  }
}

export class EvalInfo extends jspb.Message {
  getProgramminglanguage(): string;
  setProgramminglanguage(value: string): void;

  getOutput(): EvalInfo.Output | undefined;
  setOutput(value?: EvalInfo.Output): void;
  hasOutput(): boolean;
  clearOutput(): void;

  getSamplesolution(): EvalInfo.SampleSolution | undefined;
  setSamplesolution(value?: EvalInfo.SampleSolution): void;
  hasSamplesolution(): boolean;
  clearSamplesolution(): void;

  getTestprogramfile(): string;
  setTestprogramfile(value: string): void;

  getModeCase(): EvalInfo.ModeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EvalInfo.AsObject;
  static toObject(includeInstance: boolean, msg: EvalInfo): EvalInfo.AsObject;
  static serializeBinaryToWriter(message: EvalInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EvalInfo;
  static deserializeBinaryFromReader(message: EvalInfo, reader: jspb.BinaryReader): EvalInfo;
}

export namespace EvalInfo {
  export type AsObject = {
    programminglanguage: string,
    output?: EvalInfo.Output.AsObject,
    samplesolution?: EvalInfo.SampleSolution.AsObject,
    testprogramfile: string,
  }

  export class SampleSolution extends jspb.Message {
    getCheckconsoleoutput(): boolean;
    setCheckconsoleoutput(value: boolean): void;

    getInputsList(): Array<string>;
    setInputsList(value: Array<string>): void;
    clearInputsList(): void;
    addInputs(value: string, index?: number): void;

    getOutputfilestocheckList(): Array<string>;
    setOutputfilestocheckList(value: Array<string>): void;
    clearOutputfilestocheckList(): void;
    addOutputfilestocheck(value: string, index?: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SampleSolution.AsObject;
    static toObject(includeInstance: boolean, msg: SampleSolution): SampleSolution.AsObject;
    static serializeBinaryToWriter(message: SampleSolution, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SampleSolution;
    static deserializeBinaryFromReader(message: SampleSolution, reader: jspb.BinaryReader): SampleSolution;
  }

  export namespace SampleSolution {
    export type AsObject = {
      checkconsoleoutput: boolean,
      inputsList: Array<string>,
      outputfilestocheckList: Array<string>,
    }
  }


  export class Output extends jspb.Message {
    getInputsList(): Array<string>;
    setInputsList(value: Array<string>): void;
    clearInputsList(): void;
    addInputs(value: string, index?: number): void;

    getOutputsList(): Array<string>;
    setOutputsList(value: Array<string>): void;
    clearOutputsList(): void;
    addOutputs(value: string, index?: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Output.AsObject;
    static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
    static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Output;
    static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
  }

  export namespace Output {
    export type AsObject = {
      inputsList: Array<string>,
      outputsList: Array<string>,
    }
  }


  export enum ModeCase { 
    MODE_NOT_SET = 0,
    OUTPUT = 2,
    SAMPLESOLUTION = 3,
    TESTPROGRAMFILE = 4,
  }
}

export class CheckersMessage extends jspb.Message {
  getCheckersList(): Array<CheckerInfo>;
  setCheckersList(value: Array<CheckerInfo>): void;
  clearCheckersList(): void;
  addCheckers(value?: CheckerInfo, index?: number): CheckerInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckersMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CheckersMessage): CheckersMessage.AsObject;
  static serializeBinaryToWriter(message: CheckersMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckersMessage;
  static deserializeBinaryFromReader(message: CheckersMessage, reader: jspb.BinaryReader): CheckersMessage;
}

export namespace CheckersMessage {
  export type AsObject = {
    checkersList: Array<CheckerInfo.AsObject>,
  }
}

export enum Role { 
  STUDENT = 0,
  TEACHER = 1,
  ADMIN = 2,
}
export enum CheckMode { 
  OUTPUT = 0,
  SAMPLE_SOLUTION = 1,
  TEST_PROGRAM = 2,
}
export enum SampleSolutionDownloadable { 
  NO = 0,
  YES = 1,
  AFTERDEADLINE = 2,
}
export enum SetupState { 
  UNCONFIGURED = 0,
  DATABASE_CONFIGURED = 1,
  ADMIN_CONFIGURED = 2,
  SSL_CONFIGURED = 3,
  LDAP_CONFIGURED = 4,
  GENERAL_CONFIGURED = 5,
  COMPLETE = 6,
}
