export interface User {
  id: number;
  email: string;
  access_token: string;
}

export interface UserData {
  email: string;
  password: string;
  name?: string;
}

export interface ResponeUser {
  email: string;
  hashed_password: string;
  name: string;
  id: string;
  createdAt: string;
}

export interface ResponeUserData {
  token: string;
  user: ResponeUser;
}

export interface Category {
  id: number;
  dateCreated: string;
  name: string;
  userId: number;
}

export enum MethodType {
  'post',
  'putch',
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  categoryId: number;
}

export interface TaskDataCreate {
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
}

export interface TaskDataUpdate {
  name?: string;
  description?: string;
  dateStart?: string;
  dateEnd?: string;
}
