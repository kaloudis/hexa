import ServiceAccountKind from "../../../common/data/enums/ServiceAccountKind";
import { NewTestAccountPayload, NewCheckingAccountPayload, NewSavingsAccountPayload, NewDonationAccountPayload, NewServiceAccountPayload, NewFullyImportedWalletAccountPayload, NewWatchOnlyImportedWalletAccountPayload, NewTrustedContactsAccountPayload } from "../../../common/data/models/NewAccountPayload";

// TODO: Make this a reusable hook that dynamically computes default properties
const NEW_ACCOUNT_CHOICES = {
  hexaAccounts: [
    new NewTestAccountPayload(),
    new NewSavingsAccountPayload(),
    new NewCheckingAccountPayload(),
    new NewTrustedContactsAccountPayload(),
    new NewDonationAccountPayload(),
  ],

  serviceAccounts: [
    new NewServiceAccountPayload({
      title: "Swan Bitcoin",
      shortDescription: "Stack Sats with Swan.",
      serviceAccountKind: ServiceAccountKind.SWAN,
    }),
    new NewServiceAccountPayload({
      title: "FastBitcoins.com",
      shortDescription: "Use FastBitcoin Vouchers.",
      serviceAccountKind: ServiceAccountKind.FAST_BITCOINS,
    }),
    new NewServiceAccountPayload({
      title: "Whirlpool Account",
      shortDescription: "Powered by Samurai.",
      serviceAccountKind: ServiceAccountKind.WHIRLPOOL,
    }),
  ],

  importedWalletAccounts: [
    new NewWatchOnlyImportedWalletAccountPayload(),
    new NewFullyImportedWalletAccountPayload(),
  ],
};

export default NEW_ACCOUNT_CHOICES;
