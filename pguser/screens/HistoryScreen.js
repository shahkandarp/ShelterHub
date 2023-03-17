import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import HistoryComponent from '../components/HistoryScreenComponent/HistoryComponent';
import axios from 'axios';
import {USER_IP, PRIMARY_COLOR} from '@env';
import {useAuthContext} from '../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 13,
          marginTop: 13,
        }}>
        <FontAwesome5 name="hotel" size={18} color={PRIMARY_COLOR} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            color: '#191919',
            marginHorizontal: 5,
            marginTop: 3,
          }}>
          You shown interest in those PGs/Hostels,
        </Text>
      </View>
      <FlatList
        data={data}
        style={{marginBottom: 60, marginTop: 5}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <HistoryComponent data={item} />}
        keyExtractor={item => item._id}
      />
    </ScrollView>
  );
};

export default HistoryScreen;
