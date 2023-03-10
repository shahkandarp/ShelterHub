// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Image,
//   TextInput,
//   Pressable,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// // import {useForm} from 'react-hook-form';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import {useAuthContext} from '../../src/Context/AuthContext';
// // import AppLoader from '../../components/AppLoader';
// // import {PAYMENT_IP} from '@env';x

// const ConfirmEmailScreen = () => {
//   const route = useRoute();
//   const {users} = useAuthContext();
//   // const {control, handleSubmit, watch} = useForm({
//   //   defaultValues: {username: route?.params?.username},
//   // });
//   const email = route?.params.email;
//   // const username = watch('username');
//   const [check, setCheck] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState('');

//   const navigation = useNavigation();

//   const onConfirmPressed = async data => {
//     try {
//       // await Auth.confirmSignUp(data.username, data.code);
//       console.log('email', email);
//       setLoading(true);
//       const response = await axios.post(
//         `http://10.0.2.2:8000/api/v1/user/${users}/validateOtp`,
//         {otp: otp},
//       );
//       console.log(response);
//       navigation.navigate('NewPasswordScreen', {email});
//       setLoading(false);
//     } catch (e) {
//       // Alert.alert();
//       setCheck(true);
//       setLoading(false);
//     }
//   };

//   const onSignInPress = () => {
//     navigation.navigate('SignIn');
//   };

//   return (
//     <>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{backgroundColor: 'white'}}>
//         <View style={styles.root}>
//           <Image
//             source={require('../../data/email1.jpg')}
//             style={{
//               height: 230,
//               width: 230,
//               borderRadius: 20,
//               marginTop: 30,
//               alignSelf: 'center',
//             }}
//           />
//           <Text style={styles.e}>Confirm your email</Text>

//           {/* <CustomInput
//             name="otp"
//             control={control}
//             placeholder="Enter your confirmation code"
//             rules={{
//               required: 'Confirmation code is required',
//             }}
//           /> */}
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 14,
//               fontFamily: 'Fredoka-Regular',
//             }}>
//             OTP:
//           </Text>
//           <TextInput
//             onChangeText={setOtp}
//             value={otp}
//             keyboardType={'numeric'}
//             style={{
//               height: 36,
//               borderWidth: 0.5,
//               borderColor: '#d1cfcf',
//               marginTop: 5,
//               borderRadius: 8,
//               paddingHorizontal: 10,
//               fontSize: 13,
//               fontFamily: 'Fredoka-Regular',
//               color: 'black',
//             }}
//           />
//           <View style={{alignContent: 'flex-start'}}>
//             <Text
//               style={{
//                 color: 'red',
//                 fontFamily: 'Fredoka-Regular',
//                 fontSize: 12,
//                 textAlign: 'left',
//                 opacity: check ? 1 : 0,
//               }}>
//               Invalid OTP
//             </Text>
//           </View>

//           {/* <CustomButton
//             text="Confirm"
//             onPress={handleSubmit(onConfirmPressed)}
//           /> */}
//           <Pressable
//             onPress={onConfirmPressed}
//             style={{
//               alignContent: 'center',
//               alignSelf: 'center',
//               marginTop: 8,
//               backgroundColor: '#f35858',
//               paddingVertical: 12,
//               borderRadius: 9,
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontFamily: 'Fredoka-Medium',
//                 paddingHorizontal: 127,
//                 fontSize: 15,
//               }}>
//               Confirm
//             </Text>
//           </Pressable>

//           {/* <CustomButton
//             text="Back to Sign in"
//             onPress={onSignInPress}
//             type="TERTIARY"
//           /> */}
//           <Pressable
//             onPress={onSignInPress}
//             style={{
//               alignContent: 'center',
//               alignSelf: 'center',
//               marginTop: 20,
//             }}>
//             <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
//               Back to Sign in
//             </Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//       {/* {loading ? <AppLoader /> : null} */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     // alignItems: 'center',
//     padding: 20,
//   },
//   e: {
//     fontSize: 18,
//     color: 'black',
//     margin: 10,
//     marginTop: 15,
//     fontFamily: 'Fredoka-Medium',
//     textAlign: 'center',
//   },
//   text: {
//     color: 'gray',
//     marginVertical: 10,
//   },
//   link: {
//     color: '#FDB075',
//   },
// });

// export default ConfirmEmailScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
import {useAuthContext} from '../../src/Context/AuthContext';
import {USER_IP, AUTH_IP, PRIMARY_COLOR} from '@env';
import Feather from 'react-native-vector-icons/Feather';
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
  const {users, jsonValue, setTokens, setName, setUserId, getData} =
    useAuthContext();
  const width = Dimensions.get('window').width;
  //   const email = route?.params.email;
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
      console.log(value);
      const response = await axios.post(
        `http://${AUTH_IP}/api/v1/userverification/verifymobileotp`,
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
      console.log(obj);
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('userDetail', jsonValue);
      setTokens(token);
      setName(name);
      setUserId(userID);
      await getData();
      //   navigation.navigate('HomeScreen');
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
            // resizeMode={'stretch'}
            style={{
              height: 200,
              width: 300,
              borderRadius: 20,
              marginTop: 30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginTop: 45,
              fontSize: 22,
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
          {/* <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
            <Feather
              name="unlock"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setOtp}
              placeholderTextColor="grey"
              placeholder="Enter OTP"
              value={otp}
              style={{
                height: 40,
                marginLeft: 4,
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#d1cfcf',
                marginTop: 5,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingBottom: 9,
                fontSize: 13,
                fontFamily: 'Poppins-Medium',
                color: '#212121',
              }}
            />
          </View> */}
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
                // shadowColor: '#4b2be3',
                shadowColor: '#19347d',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 25,
                // backgroundColor: '#6949ff',
                backgroundColor: '#19347d',
                paddingVertical: 10,
                borderRadius: 13,
                flex: 1,
                maxWidth: width,
                paddingHorizontal: width / 2 - 54,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                }}>
                Confirm
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={onSignInPress}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
              Back to Sign in
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    // padding: 20,
  },
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
    // fontFamily: 'Poppins-Medium',
    // paddingBottom: -5,
  },
  focusCell: {
    borderColor: PRIMARY_COLOR,
    color: '#101010',
  },
});

export default OtpScreen;