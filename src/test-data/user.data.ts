import { LoginUser, UserName } from '../models/user.model';

export const testUser: LoginUser = {
  userID: process.env.USER_ID ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};

export const loggedTestUser: UserName = {
  userName: process.env.LOGGED_USER_NAME ?? '[NOT SET]',
};
