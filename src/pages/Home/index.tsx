import React, { createRef, PureComponent, useMemo } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    ImageBackground,
    Platform,
    AsyncStorage,
    Linking,
    Alert,
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import TransparentHeaderModal from '../../components/TransparentHeaderModal';
import CustodianRequestRejectedModalContents from '../../components/CustodianRequestRejectedModalContents';
import MoreHomePageTabContents from '../../components/MoreHomePageTabContents';
import SmallHeaderModal from '../../components/SmallHeaderModal';
import AddModalContents from '../../components/AddModalContents';
import QrCodeModalContents from '../../components/QrCodeModalContents';
import { AppState } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import RNBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Colors from '../../common/Colors';
import HomeHeader from '../../components/home/home-header';
import moment from 'moment';
import { connect } from 'react-redux'
import {
    setCurrencyToggleValue,
} from '../../store/actions/preferences';
import config from '../../bitcoin/HexaConfig';

import {
    TEST_ACCOUNT,
    REGULAR_ACCOUNT,
    SECURE_ACCOUNT,
    TRUSTED_CONTACTS,
    FAST_BITCOINS,
    DONATION_ACCOUNT,
} from '../../common/constants/serviceTypes';
import {
    trustedChannelActions,
    DonationDerivativeAccountElements,
} from '../../bitcoin/utilities/Interface';


interface HomePropsTypes {
    navigation: any,
    accounts: any[];
}

interface HomeStateTypes {
    notificationData: any[],
    notificationDataChange: boolean,
    switchOn: boolean,
    balances: any,
    transactions: any[],
    isBalanceLoading: boolean
}



class Home extends PureComponent<HomePropsTypes, HomeStateTypes> {

    constructor(props) {
        super(props);
        this.state = {
            notificationData: [],
            notificationDataChange: false,
            switchOn: false,
            balances: {},
            transactions: [],
            isBalanceLoading: false
        }
    }


    onPressNotifications = async () => {
        let notificationList = JSON.parse(
            await AsyncStorage.getItem('notificationList'),
        );
        let tmpList = [];
        if (notificationList) {
            for (let i = 0; i < notificationList.length; i++) {
                const element = notificationList[i];
                let obj = {
                    ...element,
                    read: element.isMandatory ? false : true,
                };
                tmpList.push(obj);
            }
        }
        await AsyncStorage.setItem('notificationList', JSON.stringify(tmpList));
        tmpList.sort(function (left, right) {
            return moment.utc(right.date).unix() - moment.utc(left.date).unix();
        });
        this.setState({
            notificationData: tmpList,
            notificationDataChange: !this.state.notificationDataChange,
        });
        // TODO --- 
        // setTimeout(() => {
        //     this.setState({ notificationLoading: false });
        // }, 500);
        // this.notificationsListBottomSheetRef.current?.snapTo(1);
    };

    onSwitchToggle = (switchOn) => {
        this.setState({
            switchOn,
        });
    };

    setCurrencyToggleValue = (temp) => {
        // this.props.setCurrencyToggleValue(temp);
    };



    componentDidMount = () => {
        this.getBalances()
    };



    getBalances = () => {
        const { accounts } = this.props;
        let testBalance = accounts[TEST_ACCOUNT].service
            ? accounts[TEST_ACCOUNT].service.hdWallet.balances.balance +
            accounts[TEST_ACCOUNT].service.hdWallet.balances.unconfirmedBalance
            : 0;

        const testTransactions = accounts[TEST_ACCOUNT].service
            ? accounts[TEST_ACCOUNT].service.hdWallet.transactions.transactionDetails
            : [];

        if (!testTransactions.length) testBalance = 10000; // hardcoding t-balance (till t-faucet saga syncs)

        let regularBalance = accounts[REGULAR_ACCOUNT].service
            ? accounts[REGULAR_ACCOUNT].service.hdWallet.balances.balance +
            accounts[REGULAR_ACCOUNT].service.hdWallet.balances.unconfirmedBalance
            : 0;

        let regularTransactions = accounts[REGULAR_ACCOUNT].service
            ? accounts[REGULAR_ACCOUNT].service.hdWallet.transactions
                .transactionDetails
            : [];

        // regular derivative accounts
        for (const dAccountType of config.DERIVATIVE_ACC_TO_SYNC) {
            const derivativeAccount =
                accounts[REGULAR_ACCOUNT].service.hdWallet.derivativeAccounts[
                dAccountType
                ];
            if (derivativeAccount && derivativeAccount.instance.using) {
                for (
                    let accountNumber = 1;
                    accountNumber <= derivativeAccount.instance.using;
                    accountNumber++
                ) {
                    if (derivativeAccount[accountNumber].balances) {
                        regularBalance +=
                            derivativeAccount[accountNumber].balances.balance +
                            derivativeAccount[accountNumber].balances.unconfirmedBalance;
                    }

                    if (derivativeAccount[accountNumber].transactions) {
                        derivativeAccount[
                            accountNumber
                        ].transactions.transactionDetails.forEach((tx) => {
                            let include = true;
                            for (const currentTx of regularTransactions) {
                                if (tx.txid === currentTx.txid) {
                                    include = false;
                                    break;
                                }
                            }
                            if (include) regularTransactions.push(tx);
                        });
                    }
                }
            }
        }

        let secureBalance = accounts[SECURE_ACCOUNT].service
            ? accounts[SECURE_ACCOUNT].service.secureHDWallet.balances.balance +
            accounts[SECURE_ACCOUNT].service.secureHDWallet.balances
                .unconfirmedBalance
            : 0;

        const secureTransactions = accounts[SECURE_ACCOUNT].service
            ? accounts[SECURE_ACCOUNT].service.secureHDWallet.transactions
                .transactionDetails
            : [];

        // secure derivative accounts
        for (const dAccountType of config.DERIVATIVE_ACC_TO_SYNC) {
            if (dAccountType === TRUSTED_CONTACTS) continue;

            const derivativeAccount =
                accounts[SECURE_ACCOUNT].service.secureHDWallet.derivativeAccounts[
                dAccountType
                ];
            if (derivativeAccount && derivativeAccount.instance.using) {
                for (
                    let accountNumber = 1;
                    accountNumber <= derivativeAccount.instance.using;
                    accountNumber++
                ) {
                    if (derivativeAccount[accountNumber].balances) {
                        secureBalance +=
                            derivativeAccount[accountNumber].balances.balance +
                            derivativeAccount[accountNumber].balances.unconfirmedBalance;
                    }

                    if (derivativeAccount[accountNumber].transactions) {
                        derivativeAccount[
                            accountNumber
                        ].transactions.transactionDetails.forEach((tx) => {
                            let include = true;
                            for (const currentTx of secureTransactions) {
                                if (tx.txid === currentTx.txid) {
                                    include = false;
                                    break;
                                }
                            }
                            if (include) secureTransactions.push(tx);
                        });
                    }
                }
            }
        }

        // donation transactions
        const donationTxs = [];
        let donationsBalance = 0;
        for (const serviceType of [REGULAR_ACCOUNT, SECURE_ACCOUNT]) {
            const derivativeAccounts =
                accounts[serviceType].service[
                    serviceType === SECURE_ACCOUNT ? 'secureHDWallet' : 'hdWallet'
                ].derivativeAccounts;

            if (!derivativeAccounts[DONATION_ACCOUNT]) continue;

            for (
                let index = 1;
                index <= derivativeAccounts[DONATION_ACCOUNT].instance.using;
                index++
            ) {
                const donAcc: DonationDerivativeAccountElements =
                    derivativeAccounts[DONATION_ACCOUNT][index];

                if (donAcc.balances)
                    donationsBalance +=
                        donAcc.balances.balance + donAcc.balances.unconfirmedBalance;
                if (
                    donAcc.transactions &&
                    donAcc.transactions.transactionDetails.length
                )
                    donationTxs.push(...donAcc.transactions.transactionDetails);
            }
        }

        const accumulativeBalance =
            regularBalance + secureBalance + donationsBalance;

        const accumulativeTransactions = [
            ...testTransactions,
            ...regularTransactions,
            ...secureTransactions,
            ...donationTxs,
        ];
        if (accumulativeTransactions.length) {
            accumulativeTransactions.sort(function (left, right) {
                return moment.utc(right.date).unix() - moment.utc(left.date).unix();
            });
        }

        this.setState({
            balances: {
                testBalance,
                regularBalance,
                secureBalance,
                accumulativeBalance,
            },
            transactions: accumulativeTransactions,
            isBalanceLoading: false,
        });
    };


    render() {
        const { notificationData, switchOn, balances } = this.state
        const { navigation } = this.props
        return (
            <ImageBackground
                source={require('../../assets/images/home-bg.png')}
                style={{ width: '100%', height: '100%', flex: 1 }}
                imageStyle={{ resizeMode: 'stretch' }}
            >
                <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
                <View
                    style={{
                        flex: 3.8,
                        paddingTop:
                            Platform.OS == 'ios' && DeviceInfo.hasNotch ? hp('5%') : 0,
                    }}
                >
                    <HomeHeader
                        onPressNotifications={this.onPressNotifications}
                        notificationData={notificationData}
                        switchOn={switchOn}
                        balances={balances}
                        navigation={this.props.navigation}
                        onSwitchToggle={this.onSwitchToggle}
                        setCurrencyToggleValue={this.setCurrencyToggleValue}
                    />
                </View>
                <View style={{ flex: 7 }}>

                </View>
            </ImageBackground>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        accounts: state.accounts || [],
    };
};


export default connect(mapStateToProps, { setCurrencyToggleValue })(Home)