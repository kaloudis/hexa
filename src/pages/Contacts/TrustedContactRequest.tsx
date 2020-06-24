import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../../common/Colors';
import Fonts from '../../common/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppBottomSheetTouchableWrapper } from '../../components/AppBottomSheetTouchableWrapper';
import { ScrollView } from 'react-native-gesture-handler';

export default function TrustedContactRequest(props) {
  const [WrongInputError, setWrongInputError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [EmailId, setEmailId] = useState('');
  const [onBlurFocus, setOnBlurFocus] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeArray, setPasscodeArray] = useState([]);
  console.log("props.hint", props.hint);
  function onPressNumber(text) {
    let tmpPasscode = passcodeArray;
    if (text) {
      tmpPasscode.push(text);
    } else {
      tmpPasscode.pop();
    }
    setPasscodeArray(tmpPasscode);
    if (tmpPasscode.length == 6) {
      setPasscode(tmpPasscode.join(''));
    }
  }

  useEffect(()=>{
    if(!props.inputType) setIsDisabled(false);
    else setIsDisabled(true);
  },[props.inputType])

  const getStyle = (i) => {
    if (i == 0) {
      return this.textInput && this.textInput.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
    if (i == 1) {
      return this.textInput2 && this.textInput2.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
    if (i == 2) {
      return this.textInput3 && this.textInput3.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
    if (i == 3) {
      return this.textInput4 && this.textInput4.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
    if (i == 4) {
      return this.textInput5 && this.textInput5.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
    if (i == 5) {
      return this.textInput6 && this.textInput6.isFocused()
        ? styles.textBoxActive
        : styles.textBoxStyles;
    }
  };
  const getInputBox = () => {
    if (props.inputType == 'email') {
      return (
        <View style={styles.textboxView}>
          <TextInput
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.borderColor}
            placeholder={'Enter email'}
            onChangeText={(text) => {
              setEmailId(text);
            }}
            style={{ flex: 1, fontSize: RFValue(13) }}
            onFocus={() => {
              setOnBlurFocus(true);
              props.bottomSheetRef.snapTo(2);
            }}
            onBlur={() => {
              checkForValidation(EmailId);
              setOnBlurFocus(false);
              props.bottomSheetRef.snapTo(1);
            }}
          />
          {/* <View style={styles.separatorView} />
          <Text
            style={{
              ...styles.countryCodeText,
              color: EmailId ? Colors.textColorGrey : Colors.borderColor,
            }}
          >
            @bithyve.com
          </Text> */}
        </View>
      );
    } else if (props.inputType == 'phone') {
      return (
        <View style={styles.textboxView}>
          {/* <Text
            style={{
              ...styles.countryCodeText,
              color: PhoneNumber ? Colors.textColorGrey : Colors.borderColor,
            }}
          >
            +91
          </Text>
          <View style={styles.separatorView} /> */}
          <TextInput
            keyboardType={'numeric'}
            placeholderTextColor={Colors.borderColor}
            placeholder={'Enter Phone Number'}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (text.length === 10)
                checkForValidation(text)
            }}
            style={{ flex: 1 }}
            onFocus={() => {
              setOnBlurFocus(true);
              props.bottomSheetRef.snapTo(2);
            }}
            onBlur={() => {
              checkForValidation(PhoneNumber);
              setOnBlurFocus(false);
              props.bottomSheetRef.snapTo(1);
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', marginBottom: wp('5%') }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            return (
              <TextInput
                maxLength={1}
                returnKeyType="done"
                returnKeyLabel="Done"
                keyboardType="number-pad"
                ref={(input) => {
                  if (i == 0) this.textInput = input;
                  if (i == 1) this.textInput2 = input;
                  if (i == 2) this.textInput3 = input;
                  if (i == 3) this.textInput4 = input;
                  if (i == 4) this.textInput5 = input;
                  if (i == 5) this.textInput6 = input;
                }}
                style={getStyle(i)}
                onChangeText={(value) => {
                  onPressNumber(value);
                  if (value && i == 0) this.textInput2.focus();
                  if (value && i == 1) this.textInput3.focus();
                  if (value && i == 2) this.textInput4.focus();
                  if (value && i == 3) this.textInput5.focus();
                  if (value && i == 4) this.textInput6.focus();
                  if (value && i == 5) this.textInput6.focus();
                }}
                onKeyPress={(e) => {
                  if (e.nativeEvent.key === 'Backspace' && i == 0)
                    this.textInput.focus();
                  if (e.nativeEvent.key === 'Backspace' && i == 1)
                    this.textInput.focus();
                  if (e.nativeEvent.key === 'Backspace' && i == 2)
                    this.textInput2.focus();
                  if (e.nativeEvent.key === 'Backspace' && i == 3)
                    this.textInput3.focus();
                  if (e.nativeEvent.key === 'Backspace' && i == 4)
                    this.textInput4.focus();
                  if (e.nativeEvent.key === 'Backspace' && i == 5)
                    this.textInput5.focus();
                }}
                onFocus={() => {
                  if (passcode.length == 0 && i == 0) {
                    props.bottomSheetRef.snapTo(2);
                  } else {
                    props.bottomSheetRef.snapTo(2);
                  }
                }}
                onBlur={() => {
                  if (
                    (passcode.length == 0 || passcode.length == 6) &&
                    i == 5
                  ) {
                    props.bottomSheetRef.snapTo(1);
                  }
                }}
              />
            );
          })}
        </View>
      );
    }
  };

  const checkForValidation = (text) => {
    console.log("TEXT",text.charAt(0) + text.substring(8), props.hint)
    if (props.inputType == 'phone') {
      if (text.length == 0) {
        setWrongInputError('');
        setIsDisabled(true);
      } else if (text.length != 0 && text.length < 10) {
        setWrongInputError('Incorrect Phone Number, try again');
        setIsDisabled(true);
      } else if (!text.match(/^[0-9]+$/)) {
        setWrongInputError('Incorrect Phone Number, try again');
        setIsDisabled(true);
      } else if (
        text.length >= 3 &&
        text.charAt(0) + text.substring(8) != props.hint
      ) {
        setWrongInputError('Incorrect Phone Number, try again');
        setIsDisabled(true);
      } else {
        setWrongInputError('');
        setIsDisabled(false);
      }
    }
    if (props.inputType == 'email') {
      if (text.length == 0) {
        setWrongInputError('Please enter Email, try again');
        setIsDisabled(true);
      } else if (
        text.length >= 3 &&
        text.charAt(0) + text.substring(8) != props.hint
      ) {
        setWrongInputError('Incorrect Email, try again');
        setIsDisabled(true);
      } else {
        setWrongInputError('');
        setIsDisabled(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: '100%',
        backgroundColor: Colors.white,
      }}
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      enabled
    >
      <ScrollView
        style={{
          ...styles.modalContentContainer,
          paddingBottom: onBlurFocus ? hp('30%') : 0,
        }}
      >
        <View>
          <View style={styles.successModalHeaderView}>
            {!props.isRecovery ? (
              props.isPayment ? (
                <Text style={styles.modalTitleText}>Payment Request </Text>
              ) : (
                <Text style={styles.modalTitleText}>
                  Friends and Family{'\n'}Request{' '}
                  {props.isGuardian ? '(Guardian)' : null}
                </Text>
              )
            ) : (
                <Text style={styles.modalTitleText}>Recovery Share Request</Text>
              )}
            <Text style={{ ...styles.modalInfoText, marginTop: wp('1.5%') }}>
              {props.inputType ? "Accept the request to add your contact to Friends and Family" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }
            </Text>
          </View>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: hp('2%'),
              }}
            >
              <Image
                style={styles.successModalAmountImage}
                source={require('../../assets/images/icons/icon_wallet.png')}
              />
              <Text
                style={{
                  fontSize: RFValue(25),
                  fontFamily: Fonts.FiraSansRegular,
                  color: Colors.black1,
                }}
              >
                {props.trustedContactName}
              </Text>
            </View>
          </View>

          {!props.isQR ? (
            <Text
              style={{
                ...styles.modalInfoText,
                marginLeft: wp('8%'),
                marginRight: wp('8%'),
                marginBottom: wp('8%'),
              }}
            >
              {props.inputType === 'phone'
                  ? "Enter your 10 digit phone number  " : props.inputType === 'email'
                  ? "Enter your email ID  " : null}
              <Text style={{ fontFamily: Fonts.FiraSansMediumItalic }}>
                {props.inputType === 'phone'
                  ? `${props.hint.charAt(0)}XXX XXX X${props.hint.substring(1)}`
                  : props.inputType === 'email'
                    ? `${props.hint.charAt(0)}XXXXXXXX@XXX${props.hint.substring(1)}.com`
                    : null}
              </Text>
            </Text>
          ) : null}

          {!props.isQR ? (
            <View style={{ marginLeft: wp('8%'), marginRight: wp('8%') }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.phoneNumberInfoText}>
                {props.inputType === 'phone' ? "Enter Phone Number" : "Enter Email Address"}
                </Text>
                <Text style={styles.inputErrorText}>{WrongInputError}</Text>
              </View>
              {getInputBox()}
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 'auto',
              alignItems: 'center',
            }}
          >
            <AppBottomSheetTouchableWrapper
              disabled={isDisabled}
              onPress={() => {
                const key =
                  props.inputType === 'phone'
                    ? PhoneNumber
                    : props.inputType === 'email'
                    ? EmailId
                    : null;
                setTimeout(() => {
                  setPhoneNumber('');
                }, 2);
                props.onPressAccept(key);
              }}
              style={{
                ...styles.successModalButtonView,
                backgroundColor: isDisabled ? Colors.lightBlue : Colors.blue,
              }}
            >
              {props.loading && props.loading == true ? (
                <ActivityIndicator size="small" />
              ) : (
                  <Text style={styles.proceedButtonText}>Accept Request</Text>
                )}
            </AppBottomSheetTouchableWrapper>
            <AppBottomSheetTouchableWrapper
              onPress={() => {
                const key =
                  props.inputType === 'phone'
                    ? PhoneNumber
                    : props.inputType === 'email'
                    ? EmailId
                    : null;
                props.onPressReject(key);
              }}
              style={{
                height: wp('13%'),
                width: wp('35%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...styles.proceedButtonText, color: Colors.blue }}>
                Reject Request
              </Text>
            </AppBottomSheetTouchableWrapper>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  box: {
    backgroundColor: Colors.backgroundColor1,
    marginRight: wp('8%'),
    marginLeft: wp('8%'),
    padding: hp('2%'),
    marginBottom: hp('3%'),
    borderRadius: 10,
    justifyContent: 'center',
  },
  successModalHeaderView: {
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    marginRight: wp('8%'),
    marginLeft: wp('8%'),
  },
  modalTitleText: {
    color: Colors.blue,
    fontSize: RFValue(18),
    fontFamily: Fonts.FiraSansMedium,
  },
  modalInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(11),
    fontFamily: Fonts.FiraSansRegular,
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
    alignSelf: 'center',
    marginLeft: wp('8%'),
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue(13),
    fontFamily: Fonts.FiraSansMedium,
  },
  successModalAmountImage: {
    width: wp('15%'),
    height: wp('15%'),
    marginRight: 15,
    marginLeft: 10,
    marginBottom: wp('1%'),
    resizeMode: 'contain',
  },
  phoneNumberInfoText: {
    fontFamily: Fonts.FiraSansRegular,
    fontSize: RFValue(11),
    color: Colors.textColorGrey,
    marginBottom: wp('5%'),
  },
  inputErrorText: {
    fontFamily: Fonts.FiraSansMediumItalic,
    fontSize: RFValue(10),
    color: Colors.red,
    marginBottom: wp('5%'),
    marginLeft: 'auto',
  },
  textboxView: {
    flexDirection: 'row',
    paddingLeft: 15,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderColor,
    marginBottom: wp('5%'),
    alignItems: 'center',
  },
  countryCodeText: {
    fontFamily: Fonts.FiraSansRegular,
    fontSize: RFValue(13),
    paddingRight: 15,
  },
  separatorView: {
    marginRight: 15,
    height: 25,
    width: 2,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  textBoxStyles: {
    borderWidth: 0.5,
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: 7,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginLeft: 8,
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
  textBoxActive: {
    borderWidth: 0.5,
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: 7,
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginLeft: 8,
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
  textStyles: {
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
  textFocused: {
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
});
