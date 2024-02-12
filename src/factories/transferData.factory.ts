import { generateRandomSentence } from '@_src/factories/randomData.factory';
import { FastTransferModel } from '@_src/models/transfer.model';

export function prepareTransferData(): FastTransferModel {
  const fastTransferData: FastTransferModel = {
    recipientOfTransfer: '1',
    transferAmount: String(Math.floor(Math.random() * 10000)),
    titleOfTransfer: generateRandomSentence(10),
  };
  return fastTransferData;
}
