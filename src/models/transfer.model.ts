export interface FastTransferModel {
  recipientOfTransfer: string;
  transferAmount: string;
  titleOfTransfer: string;
}
export interface RegularTransferModel {
  recipientOfRegularTransfer: string;
  bankAccountNumber: string;
  regularTransferAmount: string;
  titleOfRegularTransfer: string;
}
