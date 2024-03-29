import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FilterScreen from '../screens/FilterScreen';
import SearchScreen from '../screens/HomeScreen/SearchScreen';
import PgDetailScreen from '../screens/HomeScreen/PgDetailScreen';
import FilteredPgScreen from '../screens/HomeScreen/FilteredPgScreen';
import {PRIMARY_COLOR} from '@env';
import MapScreen from '../screens/HomeScreen/MapScreen';
import HistoryDetailScreen from '../screens/HistoryScreen/HistoryDetailScreen';
import FilterResultScreen from '../screens/FilterScreen/FilterResultScreen';
import UpdateProfile from '../screens/ProfileScreen/UpdateProfile';
import AboutUsScreen from '../screens/ProfileScreen/AboutUsScreen';
import PrivacyPolicyScreen from '../screens/ProfileScreen/PrivacyPolicyScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SuggestionScreen from '../screens/SuggestionScreen/SuggestionScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#e0e9ff',
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 48,
          position: 'absolute',
          bottom: 7,
          right: 7,
          left: 7,
          borderRadius: 13,
          paddingBottom: 6,
          // backgroundColor: PRIMARY_COLOR,
        },
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          // unmountOnBlur: true,
          headerShown: false,
          // keyboardHidesTabBar: true,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={18.5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={FilterStack}
        name="Filter"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          // keyboardHidesTabBar: true,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="filter" size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HistoryStack}
        name="Shortlist"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <AntDesign name="heart" size={18.5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreenStack}
        name="Suggestions"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Ionicons name="md-images-sharp" size={18.5} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HistoryScreen} name="HistoryScreen" />
      <Stack.Screen
        component={HistoryDetailScreen}
        name="HistoryDetailScreen"
      />
    </Stack.Navigator>
  );
};

const FilterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Stack.Screen component={FilterScreen} name="FilterScreen" />
      <Stack.Screen component={FilterResultScreen} name="FilterResultScreen" />
      <Stack.Screen component={PgDetailScreen} name="PgDetailScreen" />
    </Stack.Navigator>
  );
};
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={SuggestionScreen} name="SuggestionScreen" />
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={HistoryScreen} name="HistoryScreen" />
      <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
      <Stack.Screen component={PgDetailScreen} name="PgDetailScreen" />
      <Stack.Screen
        component={PrivacyPolicyScreen}
        name="PrivacyPolicyScreen"
      />
      <Stack.Screen component={AboutUsScreen} name="AboutUsScreen" />
      <Stack.Screen
        component={HistoryDetailScreen}
        name="HistoryDetailScreen"
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={SearchScreen} name="SearchScreen" />
      <Stack.Screen component={PgDetailScreen} name="PgDetailScreen" />
      <Stack.Screen component={MapScreen} name="MapScreen" />
      <Stack.Screen component={FilteredPgScreen} name="FilteredPgScreen" />
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={HistoryScreen} name="HistoryScreen" />
      <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
      <Stack.Screen
        component={PrivacyPolicyScreen}
        name="PrivacyPolicyScreen"
      />
      <Stack.Screen component={AboutUsScreen} name="AboutUsScreen" />
      <Stack.Screen
        component={HistoryDetailScreen}
        name="HistoryDetailScreen"
      />
    </Stack.Navigator>
  );
};
