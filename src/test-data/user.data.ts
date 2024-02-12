import { LoginUserModel, UserNameModel } from '@_src/models/user.model';

export const testUser: LoginUserModel = {
  userID: process.env.USER_ID ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};

export const loggedTestUser: UserNameModel = {
  userName: process.env.LOGGED_USER_NAME ?? '[NOT SET]',
};
