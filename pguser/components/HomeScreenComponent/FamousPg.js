import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const FamousPg = () => {
  const {users, tokens, getFamousPg} = useAuthContext();
  //   useEffect(() => {
  //     getFamousPg();
  //   }, []);
  //   const getFamousPg = async () => {
  //     console.log('hello');
  //     const response = await axios.get(
  //       `http://${USER_IP}/api/v1/user/${users}/pg?filter=ratings`,
  //       {headers: {Authorization: `Bearer ${tokens}`}},
  //     );
  //     console.log('y');
  //     console.log(response.data);
  //   };
  return (
    <View>
      <Text>FamousPg</Text>
    </View>
  );
};

export default FamousPg;
