import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import FamousPgComponent from './FamousPgComponent';

const FamousPg = ({data}) => {
  const {users, tokens} = useAuthContext();
  // console.log('imp', data);
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   getFamousPg();
  // }, []);
  // const getFamousPg = async () => {
  //   console.log('hello');
  //   const response = await axios.get(
  //     `http://${USER_IP}/api/v1/user/${users}/pg?filter=ratings`,
  //     {headers: {Authorization: `Bearer ${tokens}`}},
  //   );
  //   setData(response.data.data);
  //   // console.log('y');
  //   console.log(response.data.data);
  // };
  return (
    <View style={{marginTop: 8}}>
      {data.length > 0 && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#191919',
            fontSize: 14,
            marginHorizontal: 15,
          }}>
          Famous Hostels/PGs in your Area...
        </Text>
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          horizontal
          style={{marginBottom: 20, marginTop: 5}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FamousPgComponent famous={item} />}
          keyExtractor={item => item.name}
        />
      )}
    </View>
  );
};

export default FamousPg;
