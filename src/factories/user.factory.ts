import { LoginUser } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomLoginData(
  userIDLength?: number,
  userPasswordLength?: number,
): LoginUser {
  const userID = faker.string.numeric({ length: userIDLength });

  const userPassword = faker.string.alphanumeric({
    length: userPasswordLength,
  });

  const loginData: LoginUser = { userID: userID, userPassword: userPassword };

  return loginData;
}
