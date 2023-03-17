import {View, Text, Pressable} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from '@env';
const ProfileScreen = () => {
  const {dbUser} = useAuthContext();
  // const navigation = useNavigation();
  const {
    setUser,
    users,
    tokens,
    jsonValue,
    setTokens,
    loginPending,
    setLoginPending,
  } = useAuthContext();
  const logout = async () => {
    setLoginPending(true);
    await AsyncStorage.clear();
    // setItems([]);
    setTimeout(() => setTokens(null), 200);
    setTimeout(() => setUser(false), 500);
    setLoginPending(false);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1, padding: 13}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome5
          name="user-alt"
          size={13}
          color={PRIMARY_COLOR}
          style={{marginTop: 1}}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            color: '#191919',
            marginTop: 4,
            marginHorizontal: 5,
          }}>
          Your Profile
        </Text>
      </View>
      <Pressable onPress={logout}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
