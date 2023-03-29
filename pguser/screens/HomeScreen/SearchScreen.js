import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuthContext} from '../../src/Context/AuthContext';
import axios from 'axios';
import SearchComponent from '../../components/HomeScreenComponent/SearchComponent';
import {USER_IP, PRIMARY_COLOR} from '@env';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';

const SearchScreen = () => {
  const {name, tokens, users} = useAuthContext();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const route = useRoute();
  const names = route?.params?.names;
  const region = route?.params?.region;

  const onPress = async () => {
    if (search?.length >= 2) {
      const response = await axios.get(
        `http://${USER_IP}/api/v1/user/${users}/pg?search=${search}`,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      setSearchResult(response.data.data);
    } else {
      setSearchResult(null);
    }
  };
  const today = new Date();
  const greeting = () => {
    // console.log(today.getHours());
    if (today.getHours() < 12 && today.getHours() >= 4) {
      return 'Good Morning';
    } else if (today.getHours() >= 12 && today.getHours() < 16) {
      return 'Good Afternoon!';
    } else if (today.getHours() >= 16 && today.getHours() < 22) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10,
          marginBottom: 3,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="location-pin" size={22} color={PRIMARY_COLOR} />
          <View style={{marginHorizontal: 5}}>
            <TouchableOpacity
              // onPress={getLocation}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                // maxFontSizeMultiplier={1}
                minimumFontScale={10}
                style={{
                  color: PRIMARY_COLOR,
                  fontSize: 12,
                  fontFamily: 'Poppins-SemiBold',
                  maxWidth: 140,
                }}>
                {names}
              </Text>

              <AntDesign
                name="caretdown"
                size={11}
                style={{marginHorizontal: 2}}
                color={PRIMARY_COLOR}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
                fontFamily: 'Poppins-Regular',
              }}>
              {region}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="ios-notifications-outline"
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginBottom: 4,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 12.5,
            fontFamily: 'Poppins-Regular',
          }}>
          Hey {name},{' '}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 12.5,
            fontFamily: 'Poppins-Medium',
          }}>
          {greeting()}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={16}
          color={PRIMARY_COLOR}
        />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onTextInput={onPress}
          placeholder="Search for PGs, Hostels, Messes..."
          placeholderTextColor={'grey'}
          underlineColorAndroid="transparent"
        />
      </View>
      <View>
        <FlatList
          data={searchResult}
          renderItem={({item}) => <SearchComponent searchResult={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6f7',
    marginTop: 1,
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  searchIcon: {
    padding: 7,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    borderRadius: 25,
    backgroundColor: '#f5f6f7',
    color: PRIMARY_COLOR,
    height: 45,
    fontSize: 12,
    // marginTop: 5,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
export default SearchScreen;
