import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import defaultBottomSheetConfigs from '../../../common/configs/BottomSheetConfigs';
import SubAccountKind from '../../../common/data/enums/SubAccountKind';
import SendHelpContents from '../../../components/Helper/SendHelpContents';
import { removeTwoFA } from '../../../store/actions/accounts';
import { initialKnowMoreSendSheetShown } from '../../../store/actions/preferences';
import usePrimarySubAccountForShell from '../../../utils/hooks/account-utils/UsePrimarySubAccountForShell';
import useAccountShellFromNavigation from '../../../utils/hooks/state-selectors/accounts/UseAccountShellFromNavigation';
import usePreferencesState from '../../../utils/hooks/state-selectors/preferences/UsePreferencesState';
import useSubAccountsInGroup from '../../../utils/hooks/state-selectors/accounts/UseSubAccountsInGroup';

export type Props = {
  navigation: any;
};


const AccountSendContainerScreen: React.FC<Props> = ({
  navigation,
}: Props) => {
  const dispatch = useDispatch();
  const { present: presentBottomSheet, dismiss: dismissBottomSheet } = useBottomSheetModal();

  const primarySubAccount = usePrimarySubAccountForShell(useAccountShellFromNavigation(navigation));

  const sendableSubAccounts = useSubAccountsInGroup(primarySubAccount.transactionGroup);
  const sendableContacts = useTrustedContacts();

  const {
    hasCompletedTFASetup,
    hasShownInitialKnowMoreSendSheet,
   } = usePreferencesState();


  const showKnowMoreBottomSheet = useCallback(() => {
    presentBottomSheet(
      <SendHelpContents titleClicked={dismissBottomSheet} />,
      {
        ...defaultBottomSheetConfigs,
        snapPoints: [0, '89%'],
        onChange: (newIndex) => {
          if (newIndex < 1) {
            dispatch(initialKnowMoreSendSheetShown());
          }
        }
      },
    );
  }, [presentBottomSheet, dismissBottomSheet]);


  useEffect(() => {
    if (hasCompletedTFASetup == false && primarySubAccount.isTFAEnabled) {
      dispatch(removeTwoFA());
      navigation.navigate('TwoFASetup', {
        // TODO: Figure out how `service.secureHDWallet.twoFASetup` fits in on this screen 👇.
        // twoFASetup: accountsState[this.state.serviceType].service.secureHDWallet.twoFASetup,
      });
    }
  }, [hasCompletedTFASetup, primarySubAccount]);


  useEffect(() => {
    if (primarySubAccount.kind == SubAccountKind.TEST && hasShownInitialKnowMoreSendSheet == false) {
      showKnowMoreBottomSheet();
    }
  }, [hasShownInitialKnowMoreSendSheet, primarySubAccount.kind]);




  return (
    <View style={styles.rootContainer}>
      <Text>AccountSendContainerScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
  }
});

export default AccountSendContainerScreen;
