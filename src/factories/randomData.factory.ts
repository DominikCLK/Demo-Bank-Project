import { faker } from '@faker-js/faker/locale/en';

export function generateRandomSentence(length: number): string {
  let sentence = faker.lorem.sentence();

  // Repeat the sentence until it reaches the desired length
  while (sentence.length < length) {
    sentence += ' ' + faker.lorem.sentence();
  }

  // Trim the sentence to the desired length
  sentence = sentence.substring(0, length);

  return sentence;
}
