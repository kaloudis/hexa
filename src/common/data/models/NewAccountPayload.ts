import { v4 as uuidv4 } from 'uuid';
import AccountKind from "../enums/AccountKind";
import ServiceAccountKind from "../enums/ServiceAccountKind";


export interface NewAccountPayload {
  uuid: string;
  kind: AccountKind;
  title: string;
  shortDescription: string;
  accountNumber: number;
  balance: number;
  customDisplayName: string;
  customDescription: string;
  imageSource: NodeRequire;
}

export class NewTestAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  title = "Test Account";
  shortDescription = "Learn Bitcoin"
  kind: AccountKind.TEST;
  accountNumber: number;
  balance: number;
  customDisplayName: string;
  customDescription: string;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
}

export class NewSavingsAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  title = "Savings Account";
  shortDescription = "Multi-factor security";
  kind = AccountKind.SECURE;
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDescription: string;
  customDisplayName: string;
}

export class NewCheckingAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  title = "Checking Account";
  shortDescription = "Fast and easy";
  kind = AccountKind.REGULAR;
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDescription: string;
  customDisplayName: string;
}


export class NewTrustedContactsAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  title = "Joint Account";
  shortDescription = "Account with Trusted Contacts"
  kind = AccountKind.TRUSTED_CONTACTS;
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDisplayName: string;
  customDescription: string;
}


export class NewDonationAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  kind: AccountKind.DONATION;
  title = "Donation Account"
  shortDescription = "Directly Accept Donations";
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDisplayName: string;
  customDescription: string;
}


export class NewServiceAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  kind = AccountKind.SERVICE;
  title: string;
  shortDescription: string;
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDisplayName: string;
  customDescription: string;

  serviceAccountKind: ServiceAccountKind;

  constructor({ title, shortDescription, serviceAccountKind }) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.serviceAccountKind = serviceAccountKind;
  }
}


export class NewWatchOnlyImportedWalletAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  kind = AccountKind.WATCH_ONLY_IMPORTED_WALLET
  title = "Watch Only";
  shortDescription = "View a non-Hexa wallet as an account";
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDescription: string;
  customDisplayName: string;
}


export class NewFullyImportedWalletAccountPayload implements NewAccountPayload {
  uuid = uuidv4();
  kind = AccountKind.FULLY_IMPORTED_WALLET
  title = "Full Import";
  shortDescription = "Fully import and manage a non-Hexa wallet.";
  accountNumber: number;
  balance: number;
  imageSource = require('../../../assets/images/icons/icon_bitcoin_dark.png');
  customDisplayName: string;
  customDescription: string;
}
