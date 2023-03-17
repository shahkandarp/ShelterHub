import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import NearByPgComponent from '../../components/HomeScreenComponent/NearByPgComponent';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import {useRoute} from '@react-navigation/native';
const FilteredPgScreen = () => {
  const [cityFilteredPg, setCityFilteredPg] = useState([]);
  const {users, tokens} = useAuthContext();
  const route = useRoute();
  const city = route?.params.city;
  useEffect(() => {
    getNearByPg();
  }, []);
  const getNearByPg = async () => {
    // console.log(city);
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/pg/filter`,
      {cityname: city},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data);
    setCityFilteredPg(response.data.data);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
      <NearByPgComponent data={cityFilteredPg} check={true} />
    </View>
  );
};

export default FilteredPgScreen;
