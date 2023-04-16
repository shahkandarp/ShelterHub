import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Linking,
  Share,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '@env';
import {USER_IP} from '@env';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Share from 'react-native-share';
const ProfileScreen = () => {
  const {dbUser} = useAuthContext();
  const {width} = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    getUser();
  }, []);
  const {setUser, users, tokens, setTokens, loginPending, setLoginPending} =
    useAuthContext();

  // const url = 'https://awesome.contents.com/';
  // const title = 'Awesome Contents';
  // const message = 'Please check this out.';

  // const options = {
  //   title,
  //   url,
  //   message,
  // };
  // const share = async (customOptions = options) => {
  //   try {
  //     console.log('hello');
  //     await Share.open(customOptions);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const onRate = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
    );
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey there! I found this Niwas App really very helpful. You may solve your PG/Hostel renting problem with this amazing app.${'\n'}${'\n'} Download now:${'\n'}https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const getUser = async () => {
    const response = await axios.get(`http://${USER_IP}/api/v1/user/${users}`, {
      headers: {Authorization: `Bearer ${tokens}`},
    });
    // console.log(response.data.data);
    setUserDetail(response.data.data);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // walletDetail();
    getUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const logout = async () => {
    setLoginPending(true);
    await AsyncStorage.clear();
    setTimeout(() => setTokens(null), 200);
    setTimeout(() => setUser(false), 500);
    setLoginPending(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: 'white', flex: 1, padding: 13}}
      showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <FontAwesome5
          name="user-alt"
          size={13}
          color={PRIMARY_COLOR}
          // style={{marginTop: 1}}
        /> */}
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            color: '#191919',
            marginTop: 4,
            marginHorizontal: 5,
          }}>
          Your Profile
        </Text>
      </View>
      <View style={{marginTop: 25, alignSelf: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderWidth: 3,
            borderColor: PRIMARY_COLOR,
            padding: 13,
            borderRadius: 34,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="user-alt" size={34} color={PRIMARY_COLOR} />
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: '#191919',
            marginTop: 10,
            marginHorizontal: 5,
          }}>
          {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: 'grey',
            marginHorizontal: 5,
          }}>
          {userDetail?.phoneno}
        </Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 12}}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 9,
          }}
          onPress={() => navigation.navigate('HistoryScreen')}>
          <Foundation
            name="dollar-bill"
            size={23}
            color={PRIMARY_COLOR}
            style={{}}
          />
          <Text style={styles.textcolour}>Your Interests</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 9,
          }}
          onPress={() => navigation.navigate('UpdateProfile')}>
          <FontAwesome5 name="user-edit" size={17} color={PRIMARY_COLOR} />
          <Text style={styles.textcolour}>Update Profile</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 9,
          }}>
          <MaterialIcons name="privacy-tip" size={19} color={PRIMARY_COLOR} />
          <Text
            style={styles.textcolour}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            Privacy Policies
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('AboutUsScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 9,
          }}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color={PRIMARY_COLOR}
          />
          <Text style={styles.textcolour}>About Us</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={onShare}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 9,
          marginHorizontal: 13,
        }}>
        <FontAwesome name="share" size={17} color={PRIMARY_COLOR} />
        <Text style={styles.textcolour}>Share/Refer App to your friends</Text>
      </Pressable>
      {/* <Text
        style={styles.textcolour}
        onPress={() =>
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
          )
        }>
        Rate Us On PlayStore
      </Text> */}
      <Pressable
        onPress={onRate}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 9,
          marginHorizontal: 13,
        }}>
        <FontAwesome name="star" size={17} color={PRIMARY_COLOR} />
        <Text style={styles.textcolour}>Rate us on PlayStore</Text>
      </Pressable>
      <Pressable
        onPress={logout}
        style={{
          shadowColor: '#19347d',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          elevation: 3,
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 40,
          backgroundColor: '#19347d',
          paddingVertical: 9,
          borderRadius: 13,
          width: width - 48,
          marginBottom: 70,
        }}>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
          }}>
          Logout
        </Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textcolour: {
    fontSize: 14,
    color: '#4d4d4d',
    marginBottom: 7,
    marginTop: 8,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  like: {
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    fontFamily: 'Fredoka-Regular',
  },
  likr1: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
  },
});
export default ProfileScreen;
