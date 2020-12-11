import { useMemo } from 'react';
import ServiceAccountKind from '../../../common/data/enums/ServiceAccountKind';
import DonationSubAccountInfo from '../../../common/data/models/SubAccountInfo/DonationSubAccountInfo';
import ExternalServiceSubAccountInfo from '../../../common/data/models/SubAccountInfo/ExternalServiceSubAccountInfo';
import CheckingSubAccountInfo from '../../../common/data/models/SubAccountInfo/HexaSubAccounts/CheckingSubAccountInfo';
import SavingsSubAccountInfo from '../../../common/data/models/SubAccountInfo/HexaSubAccounts/SavingsSubAccountInfo';
import FullyImportedWalletSubAccountInfo from '../../../common/data/models/SubAccountInfo/ImportedWalletSubAccounts/FullyImportedWalletSubAccountInfo';
import WatchOnlyImportedWalletSubAccountInfo from '../../../common/data/models/SubAccountInfo/ImportedWalletSubAccounts/WatchOnlyImportedWalletSubAccountInfo';
import SubAccountDescribing from '../../../common/data/models/SubAccountInfo/Interfaces';
import useActiveAccountShells from '../state-selectors/accounts/UseActiveAccountShells';
import SubAccountKind from '../../../common/data/enums/SubAccountKind';

type Choices = {
  hexaAccounts: SubAccountDescribing[];
  serviceAccounts: SubAccountDescribing[];
  importedWalletAccounts: SubAccountDescribing[];
};

export default function useNewAccountChoices() {
  const accountShells = useActiveAccountShells();

  let testAccountCount = 0;
  let checkingAccountCount = 0;
  let savingsAccountCount = 0;
  let donationAccountCount = 0;

  accountShells.forEach((shell) => {
    switch (shell.primarySubAccount.kind) {
      case SubAccountKind.TEST_ACCOUNT:
        testAccountCount += 1;
        break;
      case SubAccountKind.REGULAR_ACCOUNT:
        checkingAccountCount += 1;
        break;
      case SubAccountKind.SECURE_ACCOUNT:
        savingsAccountCount += 1;
        break;
      case SubAccountKind.DONATION_ACCOUNT:
        donationAccountCount += 1;
        break;
      default:
        break;
    }
  });

  return useMemo<Choices>(() => {
    return {
      hexaAccounts: [
        // 📝 Holding off on allowing multiple test accounts for now.
        // (See: https://github.com/bithyve/hexa/issues/2236#issuecomment-743180907)
        // new TestSubAccountInfo({
        //   defaultTitle: `Test Account${
        //     testAccountCount > 0 ? ` ${testAccountCount + 1}` : ''
        //   }`,
        // }),
        new SavingsSubAccountInfo({
          defaultTitle: `Savings Account${
            savingsAccountCount > 0 ? ` ${savingsAccountCount + 1}` : ''
          }`,
        }),
        new CheckingSubAccountInfo({
          defaultTitle: `Checking Account${
            checkingAccountCount > 0 ? ` ${checkingAccountCount + 1}` : ''
          }`,
        }),
        new DonationSubAccountInfo({
          defaultTitle: `Donation Account${
            donationAccountCount > 0 ? ` ${donationAccountCount + 1}` : ''
          }`,
          doneeName: '',
          causeName: '',
        }),
      ],

      serviceAccounts: [
        new ExternalServiceSubAccountInfo({
          instanceNumber: 1,
          defaultTitle: 'Swan Bitcoin',
          defaultDescription: 'Stack Sats with Swan',
          serviceAccountKind: ServiceAccountKind.SWAN,
        }),
        new ExternalServiceSubAccountInfo({
          instanceNumber: 1,
          defaultTitle: 'FastBitcoins.com',
          defaultDescription: 'Use FastBitcoin Vouchers',
          serviceAccountKind: ServiceAccountKind.FAST_BITCOINS,
        }),
        new ExternalServiceSubAccountInfo({
          instanceNumber: 1,
          defaultTitle: 'Whirlpool Account',
          defaultDescription: 'Powered by Samurai',
          serviceAccountKind: ServiceAccountKind.WHIRLPOOL,
        }),
      ],

      importedWalletAccounts: [
        new WatchOnlyImportedWalletSubAccountInfo({
          instanceNumber: 1,
        }),
        new FullyImportedWalletSubAccountInfo({
          instanceNumber: 1,
        }),
      ],
    };
  }, []);
}
