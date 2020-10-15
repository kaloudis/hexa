import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../common/Colors';
import Fonts from '../../common/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import {
  approveTrustedContact,
  fetchEphemeralChannel,
  clearPaymentDetails,
} from '../../store/actions/trustedContacts';
import idx from 'idx';
import KeeperTypeModalContents from './KeeperTypeModalContent';
import { timeFormatter } from '../../common/CommonFunctions/timeFormatter';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import { createAndUploadOnEFChannel, updateMSharesHealth, generateMetaShare, initLevelTwo } from '../../store/actions/health';

interface KeeperFeaturesStateTypes {
  levelData: any;
  selectedIds: any[];
}

interface KeeperFeaturesPropsTypes {
  navigation: any;
  createAndUploadOnEFChannel: any;
  levelHealth: any[];
  s3Service: any;
  updateMSharesHealth: any;
  isLevelTwoMetaShareCreated: Boolean;
  generateMetaShare: any;
  initLevelTwo: any;
  isLevel2Initialized: Boolean;
}

class KeeperFeatures extends Component<
  KeeperFeaturesPropsTypes,
  KeeperFeaturesStateTypes
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      levelData: [
        {
          type: 'health',
          title: 'Show Backup Health',
          info: 'Keep an eye on your wallet health',
          id: 1,
        },
        {
          type: 'balance',
          title: 'Show Balances',
          info: 'View balances of your wallet accounts',
          id: 3,
        },
        {
          type: 'receive',
          title: 'Receive Bitcoins',
          info: 'Generate receive bitcoin address',
          id: 4,
        },
      ],
    };
  }

  componentDidMount = () => {
    if(this.props.navigation.state.params.qrScannedData){
      console.log('this.props.navigation.state.params.qrScannedData', this.props.navigation.state.params.qrScannedData)
    }
  };

  updatePrimaryKeeperHealth = () =>{
    let levelHealth = this.props.levelHealth;
    console.log('cloud health update home levelHealth', levelHealth);
    if(levelHealth[0].levelInfo[1].shareType == 'primaryKeeper'){
      levelHealth[0].levelInfo[1].updatedAt = moment(new Date()).valueOf();
      levelHealth[0].levelInfo[1].status = 'accessible';
      levelHealth[0].levelInfo[1].reshareVersion = 1;
      levelHealth[0].levelInfo[1].guardian = 'cloud';
    }
    let shareArray = [
      {
        walletId: this.props.s3Service.getWalletId().data.walletId,
        shareId: levelHealth[0].levelInfo[1].shareId,
        reshareVersion: levelHealth[0].levelInfo[1].reshareVersion,
        updatedAt: moment(new Date()).valueOf(),
      }
    ];
    this.props.updateMSharesHealth(shareArray);
  }

  getTime = (item) => {
    return (item.toString() && item.toString() == '0') ||
      item.toString() == 'never'
      ? 'never'
      : timeFormatter(moment(new Date()), item);
  };

  onFeatureSelect = (value) => {
    let selectedId = this.state.selectedIds;
    if (this.state.selectedIds.findIndex((item) => item == value.id) == -1) {
      selectedId.push(value.id);
    } else {
      selectedId.splice(
        this.state.selectedIds.findIndex((item) => item == value.id),
        1,
      );
    }
    this.setState({ selectedIds: selectedId });
  };

  setUpKeeper = async() =>{
    if(!this.props.isLevelTwoMetaShareCreated) await this.props.generateMetaShare(2);
    if(!this.props.isLevel2Initialized){ this.props.initLevelTwo() }
    this.uploadDataOnEFChannel();
  }

  uploadDataOnEFChannel = () => {
    if(this.props.navigation.state.params.qrScannedData){
      let featuresList = [];
      let isPrimaryKeeper = this.props.navigation.state.params.isPrimaryKeeper;
      for (let i = 0; i < this.state.levelData.length; i++) {
        const element = this.state.levelData[i];
        if(this.state.selectedIds.findIndex(value => value == element.id) > -1){
          featuresList.push(element);
        } 
      }
      this.props.createAndUploadOnEFChannel(this.props.navigation.state.params.qrScannedData, featuresList, isPrimaryKeeper, this.props.navigation.state.params.selectedShareId);
    }
    this.props.navigation.replace('ManageBackupKeeper');
  }


  render() {
    const { levelData, selectedIds } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor1 }}>
        <SafeAreaView style={{ flex: 0 }} />
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <View style={styles.modalHeaderTitleView}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerBackArrowView}
            >
              <FontAwesome
                name="long-arrow-left"
                color={Colors.blue}
                size={17}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', width: wp('80%') }}>
              <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={2} style={styles.modalHeaderTitleText}>
                {'Setup Primary Keeper\non a Personal Device'}
              </Text>
              <TouchableOpacity
              style={{ marginLeft: 'auto', marginRight: wp('1%') }}
              onPress={() => {}}
            >
              <Text
                    onPress={() => {}}
                    style={{
                      color: Colors.textColorGrey,
                        fontSize: RFValue(12),
                        marginLeft: 'auto',
                        textAlign: 'center',
                        padding: 10
                    }}
                  >
                    Know more
                  </Text>
                  </TouchableOpacity>
              </View>
              <Text numberOfLines={2} style={styles.modalHeaderInfoText}>
                Lorem ipsum dolor sit amet, consetetur Lorem ipsum dolor sit
                amet, consetetur Lorem ipsum dolor sit amet, consetetur
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ ...styles.topHealthView }}>
            <View
              style={{
                justifyContent: 'center',
                width: wp('80%'),
                marginLeft: wp('6%'),
                paddingTop: wp('5%'),
                paddingBottom: wp('5%'),
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: RFValue(13),
                  color: Colors.black,
                  fontFamily: Fonts.FiraSansRegular,
                }}
              >
                Help recover Hexa app
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: RFValue(11),
                  color: Colors.textColorGrey,
                  fontFamily: Fonts.FiraSansRegular,
                  marginTop: 5,
                }}
              >
                Store one of your wallet's Recovery Key
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                width: wp('80%'),
                marginLeft: wp('6%'),
                paddingTop: wp('2%'),
                paddingBottom: wp('7%'),
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: RFValue(13),
                  color: Colors.black,
                  fontFamily: Fonts.FiraSansRegular,
                }}
              >
                2FA for Savings accounts
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: RFValue(11),
                  color: Colors.textColorGrey,
                  fontFamily: Fonts.FiraSansRegular,
                  marginTop: 5,
                }}
              >
                Generate 2FA code to send from your savings account
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              width: wp('90%'),
              alignSelf: 'center',
              backgroundColor: Colors.borderColor,
            }}
          />
          <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            <Text
              numberOfLines={2}
              style={{
                ...styles.modalHeaderInfoText,
                marginTop: hp('1.5%'),
                marginLeft: wp('10%'),
                marginRight: wp('10%')
              }}
            >
              Lorem ipsum dolor sit amet, consetetur Lorem ipsum dolor sit amet,
              consetetur Lorem ipsum dolor sit amet, consetetur
            </Text>
            {levelData.map((value) => {
              return (
                <TouchableOpacity
                  activeOpacity={10}
                  onPress={() => this.onFeatureSelect(value)}
                  style={styles.keeperTypeElementView}
                >
                  <View style={styles.typeRadioButtonView}>
                    <RadioButton
                      size={15}
                      color={Colors.lightBlue}
                      borderColor={Colors.borderColor}
                      isChecked={
                        selectedIds.findIndex((item) => item == value.id) > -1
                          ? true
                          : false
                      }
                      onpress={() => this.onFeatureSelect(value)}
                    />
                  </View>
                  <View>
                    <Text style={styles.keeperTypeTitle}>{value.title}</Text>
                    <Text numberOfLines={1} style={styles.keeperTypeInfo}>
                      {value.info}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {/* <BottomInfoBox
            backgroundColor={Colors.white}
            title={'Note'}
            infoText={
              'Lorem ipsum dolor sit amet, consetetur Lorem ipsum dolor sit amet, consetetur Lorem ipsum dolor sit amet, consetetur'
            }
          /> */}
        <View style={styles.bottomButtonView}>
          <TouchableOpacity
            onPress={() => {
              this.setUpKeeper();
            }}
            style={{
              ...styles.successModalButtonView,
              shadowColor: Colors.shadowBlue,
              backgroundColor: Colors.blue,
            }}
          >
            <Text
              style={{
                ...styles.proceedButtonText,
                color: Colors.white,
              }}
            >
              Setup keeper
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonView}
          >
            <Text
              style={{
                ...styles.proceedButtonText,
                color: Colors.blue,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts || [],
    walletName:
      idx(state, (_) => _.storage.database.WALLET_SETUP.walletName) || '',
    s3Service: idx(state, (_) => _.sss.service),
    overallHealth: idx(state, (_) => _.sss.overallHealth),
    trustedContacts: idx(state, (_) => _.trustedContacts.service),
    levelHealth: idx(state, (_) => _.health.levelHealth),
    isLevelTwoMetaShareCreated: idx(state, (_) => _.health.isLevelTwoMetaShareCreated),
    isLevel2Initialized: idx(state, (_) => _.health.isLevel2Initialized),
  };
};

export default withNavigationFocus(
  connect(mapStateToProps, {
    fetchEphemeralChannel,
    createAndUploadOnEFChannel,
    updateMSharesHealth,
    generateMetaShare,
    initLevelTwo
  })(KeeperFeatures),
);

const styles = StyleSheet.create({
  modalHeaderTitleView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  modalHeaderTitleText: {
    color: Colors.blue,
    fontSize: RFValue(18),
    fontFamily: Fonts.FiraSansMedium,
  },
  modalHeaderInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(11),
    fontFamily: Fonts.FiraSansRegular,
    marginTop: hp('0.7%'),
    marginBottom: hp('0.7%'),
  },
  headerBackArrowView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
  },
  topHealthView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keeperTypeElementView: {
    flexDirection: 'row',
    paddingTop: wp('5%'),
    paddingBottom: wp('5%'),
  },
  typeRadioButtonView: {
    justifyContent: 'center',
    width: wp('10%'),
    height: wp('10%'),
  },
  keeperTypeTitle: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.FiraSansMedium,
    fontSize: RFValue(13),
    marginBottom: 5,
  },
  keeperTypeInfo: {
    color: Colors.textColorGrey,
    fontFamily: Fonts.FiraSansRegular,
    fontSize: RFValue(11),
    width: wp('70%'),
  },
  bottomButtonView: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: wp('8%'),
  },
  backButtonView: {
    height: wp('13%'),
    width: wp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalButtonView: {
    height: wp('13%'),
    width: wp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 10,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: { width: 15, height: 15 },
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginLeft: wp('8%'),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue(13),
    fontFamily: Fonts.FiraSansMedium,
  },
});