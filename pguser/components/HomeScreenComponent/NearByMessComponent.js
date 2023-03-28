import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import {useNavigation} from '@react-navigation/native';
// import FamousMessComponent from './FamousMessComponent';
import FamousMessComponent from './FamousMessComponent';

const NearByMessComponent = ({data}) => {
  const {users, tokens} = useAuthContext();
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
          Messes in your Area...
        </Text>
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          horizontal
          style={{marginBottom: 20, marginTop: 5}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FamousMessComponent famous={item} />}
          keyExtractor={item => item.name}
        />
      )}
    </View>
  );
};

export default NearByMessComponent;
