import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import HistoryComponent from '../components/HistoryScreenComponent/HistoryComponent';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../src/Context/AuthContext';

const HistoryScreen = () => {
  const {users, tokens} = useAuthContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    getInterestedPgs();
  }, []);
  const getInterestedPgs = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/${users}/interest`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setData(response.data.data);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          color: '#191919',
          marginHorizontal: 13,
          marginTop: 13,
        }}>
        You shown interest in those PGs/Hostels,
      </Text>
      <FlatList
        data={data}
        style={{marginBottom: 20, marginTop: 5}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <HistoryComponent data={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default HistoryScreen;
