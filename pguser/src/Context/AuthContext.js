import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
import SearchLoader from '../../components/SearchLoader';
import {USER_IP} from '@env';
// import axios from 'axios';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [dbUser, setDbUser] = useState(null);
  const [user, setUser] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  const [choice1, setChoice1] = useState(false);
  const [choice2, setChoice2] = useState(false);
  const [nonTechArr, setNonTechArr] = useState([]);
  const [techArr, setTechArr] = useState([]);
  const [workshopArr, setWorkshopArr] = useState([]);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginPending, setLoginPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState(null);
  // const [name,setName] = useState()
  let jsonValue;
  let favourite;
  let Arr;
  useEffect(() => {
    getData();
  }, []);
  // const set = arr => {
  //   setTechArr(arr);
  //   console.log('from context arr:', techArr);
  // };
  const check = () => {
    console.log('tech:', techArr.length);
    console.log('nontech:', nonTechArr.length);
    console.log('workshop:', workshopArr.length);
    if (
      techArr.length == 2 &&
      nonTechArr.length == 1 &&
      workshopArr.length == 1
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const getFamousPg = async () => {
    console.log('hello');
    // console.log(tokens);
    const response = await axios.get(
      `http://testlb-921443916.ap-south-1.elb.amazonaws.com/api/v1/user/${users}/pg?sort=ratings`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log('y');
    // console.log(response.data);
  };
  const getData = async () => {
    setLoginPending(true);
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    if (value != null) {
      console.log('user in auth context:', jsonValue);
      setUser(true);
      setUsers(jsonValue?.userID);
      setTokens(jsonValue?.token);
      setName(jsonValue?.name);
      setDbUser(jsonValue);
    } else {
      setUser(false);
    }
    setLoginPending(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        dbUser,
        tokens,
        users,
        setTokens,
        jsonValue,
        getData,
        loginPending,
        setLoginPending,
        name,
        setName,
        setUserId,
        userId,
        choice1,
        setChoice1,
        choice2,
        setChoice2,
        techArr,
        setTechArr,
        nonTechArr,
        setNonTechArr,
        workshopArr,
        setWorkshopArr,
        loading,
        setLoading,
        check,
        visible,
        setVisible,
        Arr,
        getFamousPg,
        city,
        setCity,
      }}>
      {children}
      {loginPending ? <AppLoader /> : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
