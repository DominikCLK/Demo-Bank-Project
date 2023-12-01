import { LoginUser } from '../models/user.model';

export const testUser: LoginUser = {
  userID: process.env.USER_ID ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
