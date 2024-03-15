import { faker } from '@faker-js/faker/locale/pl';

export function generateRandomSentence(length: number): string {
  let sentence = faker.lorem.sentence();
  while (sentence.length < length) {
    sentence += ' ' + faker.lorem.sentence();
  }
  sentence = sentence.substring(0, length);

  return sentence;
}

export function generateBankAccountNumber(length: number): string {
  return faker.finance.accountNumber(length);
}
