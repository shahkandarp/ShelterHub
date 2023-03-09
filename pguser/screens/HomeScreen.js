import {
  View,
  Text,
  Pressable,
  PermissionsAndroid,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {USER_IP, PRIMARY_COLOR} from '@env';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ImageCarousel from './HomeScreen/ImageCarousel';
import FamousPg from '../components/HomeScreenComponent/FamousPg';

const HomeScreen = () => {
  const [location, setLocation] = useState(false);
  const navigation = useNavigation();
  const {users, setLoginPending, loginPending, tokens, name, getFamousPg} =
    useAuthContext();
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (location) {
      onUpdatePressed();
      getFamousPg();
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
        // console.log(response.data);
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
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        // console.log('You can use Geolocation');
        return true;
      } else {
        // console.log('You cannot use Geolocation');
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
            // See error code charts below.
            // console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    // console.log(location);
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
    <ScrollView
      style={{backgroundColor: 'white', flex: 1}}
      showsVerticalScrollIndicator={false}>
      {/* App Logo */}
      <Image
        source={require('../data/logo.png')}
        style={{
          height: 45,
          width: 90,
          marginTop: 8,
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
      />
      {/* <View
        style={{flexDirection: 'row', paddingHorizontal: 15, marginBottom: 2}}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
          }}>
          Hey {name} ,
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
          }}>
          {' '}
          {greeting()}
        </Text>
      </View> */}
      {/* Search Bar */}
      <Pressable
        style={styles.searchSection}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={18}
          color={PRIMARY_COLOR}
        />
        <View style={styles.input}>
          <Text style={{fontFamily: 'Poppins-Regular'}}>
            Search PGs , Hostels...
          </Text>
        </View>
      </Pressable>

      {location && (
        <View>
          {/* Featured Carousel */}
          <View>
            <ImageCarousel />
          </View>

          {/* Top 10 PGs */}
          <View>
            <FamousPg />
          </View>

          {/* Nearby PGs */}
          <View></View>
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
    // fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;
