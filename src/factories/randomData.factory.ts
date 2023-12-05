import { faker } from '@faker-js/faker/locale/en';

export function generateRandomSentence(length: number): string {
  let sentence = faker.lorem.sentence();
  while (sentence.length < length) {
    sentence += ' ' + faker.lorem.sentence();
  }
  sentence = sentence.substring(0, length);

  return sentence;
}
