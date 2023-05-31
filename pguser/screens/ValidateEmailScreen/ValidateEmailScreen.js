import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
import {useAuthContext} from '../../src/Context/AuthContext';
import {AUTH_IP} from '@env';
import Feather from 'react-native-vector-icons/Feather';

const ValidateEmailScreen = () => {
  const route = useRoute();
  const width = Dimensions.get('window').width;
  const userID = route?.params.userID;
  const name = route?.params.name;
  const token = route?.params.token;
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneno, setPhoneno] = useState('');
  const navigation = useNavigation();
  const onConfirmPressed = async data => {
    try {
      setLoading(true);
      console.log(phoneno);
      const response = await axios.post(
        `http://testlb-921443916.ap-south-1.elb.amazonaws.com/api/v1/user/sendmobileotp`,
        {
          phoneno: phoneno,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log('hello');
      navigation.navigate('OtpScreen', {
        token: token,
        userID: userID,
        name: name,
      });
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
            source={require('../../data/otpdesign.jpg')}
            resizeMode={'stretch'}
            style={{
              height: 190,
              width: 287,
              borderRadius: 20,
              marginTop: 15,
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
            Enter Phone No.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              color: 'grey',
            }}></Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
            <Feather
              name="phone"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setPhoneno}
              placeholderTextColor="grey"
              placeholder="Enter Phone No."
              value={phoneno}
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
              color: 'grey',
              fontFamily: 'Fredoka-Regular',
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 12,
              // textAlign: 'left',
              // opacity: check ? 1 : 0,
            }}>
            Don't start your phone no. with{'  '}+91{'  '}or{'  '}0.
          </Text>
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
              Invalid Phone No.
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
                marginTop: 25,
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
            onPress={onSignInPress}
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
  title: {
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
});

export default ValidateEmailScreen;
