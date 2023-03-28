import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import NearByPgComponent from '../../components/HomeScreenComponent/NearByPgComponent';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import {useRoute} from '@react-navigation/native';
import AppLoader from '../../components/AppLoader';
import FilterComponent from '../../components/HomeScreenComponent/FilterComponent';

const FilteredPgScreen = () => {
  const [cityFilteredPg, setCityFilteredPg] = useState([]);
  const {users, tokens} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const city = route?.params.city;
  useEffect(() => {
    getNearByPg();
  }, []);
  const getNearByPg = async () => {
    setLoading(true);
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/pg/filter`,
      {areaname: city},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data[0].pg);
    setCityFilteredPg(response.data.data);
    setLoading(false);
  };
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <Text
          style={{
            marginHorizontal: 13,
            color: '#191919',
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            marginTop: 15,
          }}>
          PGs/Hostels in {city}
        </Text>
        <FlatList
          data={cityFilteredPg}
          style={{marginBottom: 60, marginTop: 5}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FilterComponent data={item} />}
          keyExtractor={item => item.name}
        />
      </ScrollView>
      {loading ? <AppLoader /> : null}
    </>
  );
};

export default FilteredPgScreen;
