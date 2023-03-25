import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
import {useAuthContext} from '../../src/Context/AuthContext';
import {AUTH_IP, PRIMARY_COLOR} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;

const OtpScreen = () => {
  const route = useRoute();
  const {setTokens, setName, setUserId, getData} = useAuthContext();
  const width = Dimensions.get('window').width;
  const userID = route?.params.userID;
  const name = route?.params.name;
  const token = route?.params.token;
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://${AUTH_IP}/api/v1/user/verifymobileotp`,
        {
          otp: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const obj = {
        token: token,
        userID: userID,
        name: name,
      };
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('userDetail', jsonValue);
      setTokens(token);
      setName(name);
      setUserId(userID);
      await getData();
      setLoading(false);
    } catch (e) {
      setCheck(true);
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', padding: 20}}>
        <View style={{}}>
          <Image
            source={require('../../data/email1.jpg')}
            style={{
              height: 190,
              width: 287,
              borderRadius: 20,
              marginTop: 30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginTop: 45,
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
              color: '#353535',
            }}>
            Enter OTP
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              color: 'grey',
            }}>
            A 4-digit code has been sent to your Phone No.
          </Text>
          <SafeAreaView style={styles.root}>
            {/* <Text style={styles.e}>Verification</Text> */}
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </SafeAreaView>
          <View style={{alignContent: 'flex-start'}}>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Fredoka-Regular',
                fontSize: 12,
                marginTop: 5,
                textAlign: 'left',
                opacity: check ? 1 : 0,
              }}>
              Invalid OTP
            </Text>
          </View>
          <View style={{borderRadius: 9}}>
            <Pressable
              onPress={onConfirmPressed}
              style={{
                shadowColor: '#19347d',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 7,
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: '#19347d',
                paddingVertical: 9,
                borderRadius: 13,
                flex: 1,
                width: width - 48,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                Confirm
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
              }}>
              Want to change Phone No.?
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  titlee: {
    fontSize: 18,
    color: 'black',
    margin: 10,
    marginTop: 15,
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  root: {padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 18,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    textAlign: 'center',
    color: '#101010',
    borderRadius: 8,
  },
  focusCell: {
    borderColor: PRIMARY_COLOR,
    color: '#101010',
  },
});

export default OtpScreen;
