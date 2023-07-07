import { instance } from '../api/axios.api';
import { ResponeUserData, User, UserData } from '../types';

export const AuthService = {
  async registration(
    userData: UserData,
  ): Promise<ResponeUserData | undefined> {
    const { data } = await instance.post<ResponeUserData>('user', userData);

    return data;
  },

  async login(userData: UserData): Promise<User | undefined> {
    const { data } = await instance
      .post<User>('auth/login', userData);

    return data;
  },
  async getUser(): Promise<User | undefined> {
    const { data } = await instance.get<User>('auth/profile');

    if (data) {
      return data;
    }
  },
};
