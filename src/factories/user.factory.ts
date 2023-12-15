import { LoginUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomLoginData(
  userIDLength?: number,
  userPasswordLength?: number,
): LoginUserModel {
  const userID = faker.string.numeric({ length: userIDLength });

  const userPassword = faker.string.alphanumeric({
    length: userPasswordLength,
  });

  const loginData: LoginUserModel = {
    userID: userID,
    userPassword: userPassword,
  };

  return loginData;
}
