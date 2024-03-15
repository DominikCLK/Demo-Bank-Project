import {
  generateBankAccountNumber,
  generateRandomSentence,
} from '@_src/factories/randomData.factory';
import {
  FastTransferModel,
  RegularTransferModel,
} from '@_src/models/transfer.model';
import { faker } from '@faker-js/faker/locale/pl';

export function prepareTransferData(): FastTransferModel {
  const fastTransferData: FastTransferModel = {
    recipientOfTransfer: '1',
    transferAmount: String(Math.floor(Math.random() * 10000)),
    titleOfTransfer: generateRandomSentence(10),
  };
  return fastTransferData;
}

export function prepareRegularTransferData(): RegularTransferModel {
  const regularTransferData: RegularTransferModel = {
    recipientOfRegularTransfer: faker.person.fullName(),
    bankAccountNumber: generateBankAccountNumber(26),
    regularTransferAmount: String(Math.floor(Math.random() * 9999) + 1),
    titleOfRegularTransfer: generateRandomSentence(10),
  };
  return regularTransferData;
}
