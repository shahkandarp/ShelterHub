import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import HistoryComponent from '../components/HistoryScreenComponent/HistoryComponent';
import axios from 'axios';
import {USER_IP, PRIMARY_COLOR} from '@env';
import {useAuthContext} from '../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchLoader from '../components/SearchLoader';
const HistoryScreen = () => {
  const {users, tokens} = useAuthContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getInterestedPgs();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInterestedPgs();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const getInterestedPgs = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/${users}/interest`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setData(response.data.data);
    setLoading(false);
  };
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{flex: 1, backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        {data.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 13,
              marginTop: 13,
            }}>
            <FontAwesome5 name="hotel" size={16} color={PRIMARY_COLOR} />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                color: '#191919',
                marginHorizontal: 5,
                marginTop: 3,
              }}>
              You shown interest in those PGs/Hostels,
            </Text>
          </View>
        )}
        {data.length > 0 && (
          <FlatList
            data={data}
            style={{marginBottom: 60, marginTop: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <HistoryComponent data={item} />}
            keyExtractor={item => item._id}
          />
        )}
        {data.length == 0 && (
          <View style={{marginTop: 100}}>
            <Image
              source={require('../data/cartEmpty.jpg')}
              style={{height: 230, width: 230, alignSelf: 'center'}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                color: '#191919',
                fontSize: 15,
                // marginTop: 12,
              }}>
              You have not yet shown any interests in PGs/Hostels
            </Text>
          </View>
        )}
      </ScrollView>
      {loading ? <SearchLoader /> : null}
    </>
  );
};

export default HistoryScreen;
