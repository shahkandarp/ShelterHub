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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useAuthContext} from '../../src/Context/AuthContext';
import {USER_IP} from '@env';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const NewPasswordScreen = () => {
  const width = Dimensions.get('window').width;
  const [setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordWrong, setPasswordWrong] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [hidePass, setHidePass] = useState(true);
  const email = route?.params.email;
  const onSubmitPressed = async data => {
    if (password.length >= 8) {
      try {
        // setLoading(true);
        // console.log(email);
        const response = await axios.post(
          `http://testlb-921443916.ap-south-1.elb.amazonaws.com/api/v1/user/${email}/password`,
          {password: password},
        );
        // console.log(response.data.res);
        if (response.data.res) {
          navigation.navigate('SignIn');
        }
        // navigation.navigate('SignIn');
        // setLoading(false);
      } catch (e) {
        setLoading(false);
        Alert.alert('Oops', e.message);
      }
    } else {
      setPasswordWrong(true);
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
            source={require('../../data/forgotpass.jpg')}
            style={{
              height: 220,
              width: 220,
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
            Reset Password
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
              placeholder="New Password"
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
          <Text
            style={{
              color: 'red',
              marginTop: 5,
              fontSize: 12,
              fontFamily: 'Fredoka-Regular',
              opacity: passwordWrong ? 1 : 0,
            }}>
            Password should be minimum of 8 characters
          </Text>
          <View style={{borderRadius: 9}}>
            <Pressable
              onPress={onSubmitPressed}
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
                marginTop: 25,
                backgroundColor: '#19347d',
                paddingVertical: 9,
                borderRadius: 13,
                flex: 1,
                // maxWidth: width,
                width: width - 48,
                // paddingHorizontal: width / 2 - 64,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                Submit
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
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    margin: 10,
    textAlign: 'center',
    fontFamily: 'Fredoka-Medium',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default NewPasswordScreen;
