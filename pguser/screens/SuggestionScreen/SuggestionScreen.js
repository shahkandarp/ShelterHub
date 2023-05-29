import {ScrollView, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PRIMARY_COLOR} from '@env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoader from '../../components/AppLoader';
import axios from 'axios';
import {USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import NearByPgComponent from '../../components/HomeScreenComponent/NearByPgComponent';
const SuggestionScreen = () => {
  const {tokens} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    getNearByPg();
  }, []);
  const getNearByPg = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/suggestion`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data);
    setSuggestions(response.data.data);
    setLoading(false);
  };
  return (
    <>
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 13,
            marginTop: 13,
          }}>
          <FontAwesome name="comment" size={16} color={PRIMARY_COLOR} />
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              marginHorizontal: 6,
              marginTop: 3,
            }}>
            Our Suggestions...
          </Text>
        </View>
        <View>
          <NearByPgComponent data={suggestions} check={true} />
        </View>
      </ScrollView>
      {loading ? <AppLoader /> : null}
      {/* <View>
        <Text>hii</Text>
      </View> */}
    </>
  );
};

export default SuggestionScreen;
