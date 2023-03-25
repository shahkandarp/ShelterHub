import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
// import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import AppLoader from '../../components/AppLoader';
// import AppLoader from '../components/AppLoader';
import AppLoader from '../../components/AppLoader';
// import {useAuthContext} from '../src/Context/AuthContext';
import {useAuthContext} from '../../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {USER_IP, PRIMARY_COLOR} from '@env';

const UpdateProfile = () => {
  const {height, width} = useWindowDimensions();
  const {users, tokens} = useAuthContext();
  //   const {control, handleSubmit, watch} = useForm();
  //   const pwd = watch('password');
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async data => {
    {
      try {
        setLoadingPending(true);
        const response = await axios.get(
          `http://${USER_IP}/api/v1/user/${users}`,
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          },
        );
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setLoadingPending(false);
      } catch (err) {
        setLoadingPending(false);
        Alert.alert(err);
      }
    }
  };
  const onUpdatePressed = async data => {
    {
      if (name && email) {
        try {
          setLoadingPending(true);
          const response = await axios.patch(
            `http://${USER_IP}/api/v1/user/${users}`,
            {
              name: name,
              email: email,
            },
            {
              headers: {
                Authorization: `Bearer ${tokens}`,
              },
            },
          );
          const obj = {
            token: tokens,
            userID: users,
            name: name,
          };
          const jsonValue = JSON.stringify(obj);
          await AsyncStorage.setItem('userDetail', jsonValue);
          navigation.navigate('ProfileScreen');
          setLoadingPending(false);
        } catch (err) {
          setLoadingPending(false);
          Alert.alert(err);
        }
      } else {
        Alert.alert("Name/Email field can't be empty.");
      }
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', flex: 1, padding: 12}}>
        <View style={styles.root}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <FontAwesome5
              name="user-edit"
              size={13}
              color={'#000000'}
              style={{marginRight: 3}}
            />
            <Text
              style={{
                marginLeft: 3,
                color: '#000000',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                marginTop: 5,
              }}>
              Update Your Profile
            </Text>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              marginTop: 15,
            }}>
            Name:
          </Text>
          <TextInput
            onChangeText={setName}
            value={name}
            style={{
              height: 42,
              borderWidth: 0.5,
              borderColor: '#d1cfcf',
              marginTop: 5,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: 'black',
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}>
            Email:
          </Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={{
              height: 42,
              borderWidth: 0.5,
              borderColor: '#d1cfcf',
              marginTop: 5,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: 'black',
              marginBottom: 10,
            }}
          />
          <Pressable
            onPress={onUpdatePressed}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 14,
              backgroundColor: PRIMARY_COLOR,
              paddingVertical: 8,
              borderRadius: 12,
              width: width - 40,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Update
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'gray',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  link: {
    color: '#FDB075',
  },
  logo: {
    width: 260,
    maxWidth: 260,
    maxHeight: 260,
    alignSelf: 'center',
  },
});

export default UpdateProfile;
