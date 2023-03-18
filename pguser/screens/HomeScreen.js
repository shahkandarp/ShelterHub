import {
  View,
  Text,
  Pressable,
  PermissionsAndroid,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {USER_IP, PRIMARY_COLOR} from '@env';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ImageCarousel from './HomeScreen/ImageCarousel';
import FamousPg from '../components/HomeScreenComponent/FamousPg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';
// import NearByPgScreen from './HomeScreen/NearByPgScreen';
import NearByPgComponent from '../components/HomeScreenComponent/NearByPgComponent';
const HomeScreen = () => {
  const [location, setLocation] = useState(false);
  const navigation = useNavigation();
  const {users, setLoginPending, loginPending, tokens, name} = useAuthContext();
  const [names, setNames] = useState(null);
  const [region, setRegion] = useState(null);
  const [data, setData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [nearByPg, setNearByPgData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  Geocoder.init('AIzaSyATSR2CjwA97n3qJ72ELXN9LcY9_BXkLbk');
  useEffect(() => {
    getLocation();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // walletDetail();
    // getUser();
    // console.log(location);
    // getLocation();

    if (location) {
      onUpdatePressed();
      getData();
      getFamousPg();
      getFeaturedPg();
      getNearByPg();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (location) {
      onUpdatePressed();
      getData();
      getFamousPg();
      getFeaturedPg();
      getNearByPg();
    }
  }, [location]);
  const onUpdatePressed = async data => {
    {
      try {
        setLoginPending(true);
        const response = await axios.patch(
          `http://${USER_IP}/api/v1/user/${users}`,
          {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          },
        );
        setLoginPending(false);
      } catch (err) {
        setLoginPending(false);
        Alert.alert(err);
      }
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // console.log('granted', granted);
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      // console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            // console.log(position);
            setLocation(position);
          },
          error => {
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  const getData = () => {
    setLoginPending(true);
    // fetch(
    //   `http://api.positionstack.com/v1/reverse?access_key=10f6947e017d55dce0675bf26d081e4c&query=${location.coords.latitude},${location.coords.longitude}&limit=1&fields=label`,
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     var jasonData = responseJson;
    //     // console.log(jasonData);
    //     jasonData.data.forEach(item => {
    //       var name = item.name;
    //       var locality = item.locality;
    //       setNames(name);
    //       setRegion(locality);
    //     });
    //   });
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then(json => {
        var region = json.results[0].address_components[3].long_name;
        var names = json.results[0].formatted_address;
        setRegion(region);
        setNames(names);
        // console.log(json.results[0]);
      })
      .catch(error => console.warn(error));
    setLoginPending(false);
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
  const getFamousPg = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/${users}/pg?sort=ratings`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setData(response.data.data);
  };
  const getFeaturedPg = async () => {
    const response = await axios.get(`http://${USER_IP}/api/v1/user/city`, {
      headers: {Authorization: `Bearer ${tokens}`},
    });
    setFeaturedData(response.data.data);
  };
  const getNearByPg = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/${users}/pg/nearby`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setNearByPgData(response.data.data);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: 'white', flex: 1}}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        animated={true}
        backgroundColor={PRIMARY_COLOR}
        barStyle={'light-content'}
      />
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
              onPress={getLocation}
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
                {location ? names : 'Provide Location'}
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
              {location ? region : 'None'}
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
      <Pressable
        style={styles.searchSection}
        onPress={() =>
          navigation.navigate('SearchScreen', {names: names, region: region})
        }>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={16}
          color={PRIMARY_COLOR}
        />
        <View style={styles.input}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              marginLeft: -5,
              color: 'grey',
            }}>
            Search for PGs , Hostels...
          </Text>
        </View>
      </Pressable>

      {location && (
        <View>
          {/* Featured Carousel */}
          <View>
            <ImageCarousel featured={featuredData} />
          </View>

          {/* Top 10 PGs */}
          <View>
            <FamousPg data={data} />
          </View>

          {/* Nearby PGs */}
          <View>
            <NearByPgComponent data={nearByPg} />
          </View>
        </View>
      )}
      {!location && (
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#252525',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Please provide your location...
          </Text>
          {/* <Pressable onPress={getLocation}>
            <Text>Provide Location</Text>
          </Pressable> */}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6f7',
    marginTop: 1,
    borderRadius: 25,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 3,
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
    // borderRadius: 10,
    borderRadius: 25,
    backgroundColor: '#f5f6f7',
    color: PRIMARY_COLOR,
    height: 39,
    justifyContent: 'center',
    // fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;
