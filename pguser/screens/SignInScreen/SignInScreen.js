import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../src/Context/AuthContext';
import {AUTH_IP} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SignInScreen = () => {
  const {setTokens, getData, setLoginPending, setName, setUserId} =
    useAuthContext();
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [changeText, setChangeText] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [emailWrong, setEmailWrong] = useState(false);
  const onSignInPressed = async data => {
    setEmailWrong(false);
    if (!changeText || !password) {
      Alert.alert('Enter all required details.');
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(changeText) === false) {
        setEmailWrong(true);
      } else {
        try {
          setLoginPending(true);
          const GitHubClient = axios.create({
            baseURL: `http://${AUTH_IP}`,
            timeout: 1000,
            headers: {
              Accept: 'application/vnd.GitHub.v3+json',
            },
          });
          const response = await GitHubClient.post('/api/v1/user/login', {
            email: changeText,
            password: password,
          });

          const obj = {
            token: response.data.token,
            userID: response.data.user.id,
            name: response.data.user.name,
          };
          const jsonValue = JSON.stringify(obj);
          await AsyncStorage.setItem('userDetail', jsonValue);
          setTokens(response.data.token);
          setName(response.data.user.name);
          setUserId(response.data.user.id);
          await getData();
          setLoginPending(false);
        } catch (err) {
          Alert.alert('Email or password is wrong');
          setLoginPending(false);
        }
      }
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', padding: 20}}>
        <View style={{}}>
          <Image
            source={require('../../data/login.jpg')}
            style={{
              height: 220,
              width: 220,
              borderRadius: 20,
              marginTop: 5,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              // marginVertical: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-SemiBold',
                color: '#353535',
              }}>
              Login
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={'#757575'}
            style={{marginRight: 3}}
          />
          <TextInput
            onChangeText={setChangeText}
            placeholderTextColor="grey"
            placeholder="Email ID"
            value={changeText}
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
        </View>
        <Text
          style={{
            color: 'red',
            fontFamily: 'Fredoka-Regular',
            fontSize: 10,
            opacity: emailWrong ? 1 : 0,
          }}>
          Email is invalid
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather
            name="lock"
            size={20}
            color={'#757575'}
            style={{marginRight: 3}}
          />
          <TextInput
            secureTextEntry={hidePass ? true : false}
            onChangeText={setPassword}
            placeholderTextColor="grey"
            placeholder="Password"
            value={password}
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
            }}></TextInput>
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={15}
            onPress={() => setHidePass(!hidePass)}
          />
        </View>
        <Pressable
          onPress={onForgotPasswordPressed}
          style={{
            alignContent: 'flex-end',
            alignSelf: 'flex-end',
            marginTop: 24,
          }}>
          <Text
            style={{
              color: '#19347d',
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
            }}>
            Forgot Password?
          </Text>
        </Pressable>
        <View style={{borderRadius: 9}}>
          <Pressable
            onPress={onSignInPressed}
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
              // maxWidth: width,
              // paddingHorizontal: width / 2 - 54,
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 14,
              }}>
              Login
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'grey', alignSelf: 'center'}}>
            ---------------OR---------------
          </Text>
        </View>
        <Pressable
          onPress={onSignUpPress}
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 40,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'grey',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
              }}>
              New to Nivaas?
            </Text>
            <Text
              style={{
                color: '#19347d',
                fontFamily: 'Poppins-SemiBold',
                marginLeft: 5,
                fontSize: 13,
              }}>
              Register
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 20,
  },
});

export default SignInScreen;
