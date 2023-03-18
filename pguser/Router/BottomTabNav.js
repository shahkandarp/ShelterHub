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
        },
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          // keyboardHidesTabBar: true,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={16} color={color} />
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
            <FontAwesome5 name="filter" size={16} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HistoryStack}
        name="History"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="history" size={16} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreenStack}
        name="Profile"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabelStyle: {marginTop: -8, marginBottom: 2, fontSize: 9},
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={16} color={color} />
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
      {/* <Stack.Screen component={MyEvents} name="MyEvents" /> */}
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
      {/* <Stack.Screen component={ComboScreen} name="ComboScreen" />
      <Stack.Screen component={StaticComboScreen} name="StaticComboScreen" />
      <Stack.Screen component={DynamicComboScreen} name="DynamicComboScreen" />
      <Stack.Screen
        component={DynamicTechSelectScreen}
        name="DynamicTechSelectScreen"
      />
      <Stack.Screen
        component={DynamicNonTechSelectScreen}
        name="DynamicNonTechSelectScreen"
      />
      <Stack.Screen
        component={DynamicWorkshopSelectScreen}
        name="DynamicWorkshopSelectScreen"
      />
      <Stack.Screen component={EventDetailScreen} name="EventDetailScreen" /> */}
      <Stack.Screen component={FilterScreen} name="FilterScreen" />
      <Stack.Screen component={FilterResultScreen} name="FilterResultScreen" />
      <Stack.Screen component={PgDetailScreen} name="PgDetailScreen" />
    </Stack.Navigator>
  );
};
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={TechEvents} name="TechEvents" />
      <Stack.Screen component={NonTechEvents} name="NonTechEvents" />
      <Stack.Screen component={CulturalEvents} name="CulturalEvents" />
      <Stack.Screen component={Workshop} name="Workshop" />
  <Stack.Screen component={EventDetailScreen} name="EventDetailScreen" />*/}
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={SearchScreen} name="SearchScreen" />
      <Stack.Screen component={PgDetailScreen} name="PgDetailScreen" />
      <Stack.Screen component={MapScreen} name="MapScreen" />
      <Stack.Screen component={FilteredPgScreen} name="FilteredPgScreen" />
    </Stack.Navigator>
  );
};
