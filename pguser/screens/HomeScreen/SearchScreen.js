import {View, Text, TextInput, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuthContext} from '../../src/Context/AuthContext';
import axios from 'axios';
import SearchComponent from '../../components/HomeScreenComponent/SearchComponent';
import {USER_IP, PRIMARY_COLOR} from '@env';

const SearchScreen = () => {
  const {name, tokens, users} = useAuthContext();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
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
    if (today.getHours() < 12 && today.getHours() > 6) {
      return 'Good Morning';
    } else if (today.getHours() > 12 && today.getHours() < 16) {
      return 'Good Afternoon!';
    } else if (today.getHours() > 16 && today.getHours() < 23) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Image
        source={require('../../data/logo.png')}
        style={{
          width: 90,
          height: 45,
          marginTop: 8,
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
      />
      <View style={{paddingHorizontal: 15, marginBottom: 2}}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
          }}>
          Hey {name},
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
          }}>
          {greeting()}
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color={PRIMARY_COLOR}
        />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onTextInput={onPress}
          placeholder="Search PGs , Hostels..."
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
    backgroundColor: '#fff',
    marginTop: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  searchIcon: {
    padding: 7,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: PRIMARY_COLOR,
    height: 45,
    justifyContent: 'center',
  },
});
export default SearchScreen;
