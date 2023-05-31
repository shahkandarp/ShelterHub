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
import axios from 'axios';
import {AUTH_IP} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchLoader from '../../components/SearchLoader';

const ForgotPasswordScreen = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const onSendPressed = async data => {
    setCheck(false);
    try {
      setLoading(true);
      console.log('hey');
      const response = await axios.patch(
        `http://testlb-921443916.ap-south-1.elb.amazonaws.com/api/v1/user/forgotpassword`,
        {email: email},
      );
      navigation.navigate('ConfirmEmail', {email: email});
      setLoading(false);
    } catch (err) {
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
        style={{backgroundColor: 'white'}}>
        <View style={styles.root}>
          <Image
            source={require('../../data/loginunsuccessful.png')}
            style={{
              height: 220,
              width: 220,
              borderRadius: 20,
              marginTop: 5,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
              color: '#242424',
            }}>
            Forgot Password?
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              color: 'grey',
            }}>
            Don't worry! It happens. Please enter the address associated with
            your account.
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 45}}>
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={'#757575'}
              style={{marginRight: 3}}
            />
            <TextInput
              onChangeText={setEmail}
              placeholderTextColor="grey"
              placeholder="Email ID"
              value={email}
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
          <View style={{alignContent: 'flex-start'}}>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Fredoka-Regular',
                fontSize: 11,
                textAlign: 'left',
                opacity: check ? 1 : 0,
              }}>
              Email is never registered.
            </Text>
          </View>
          <View style={{borderRadius: 9}}>
            <Pressable
              onPress={onSendPressed}
              style={{
                shadowColor: '#19347d',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 5,
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 40,
                backgroundColor: '#19347d',
                paddingVertical: 9,
                borderRadius: 13,
                flex: 1,
                // maxWidth: width,
                // paddingHorizontal: width / 2 - 54
                width: width - 48,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                Send
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
      {loading ? <SearchLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 19,
    color: 'black',
    margin: 10,
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

export default ForgotPasswordScreen;
