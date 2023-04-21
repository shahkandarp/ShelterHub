import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Image,
  useWindowDimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '@env';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import {USER_IP} from '@env';
import SearchComponent from '../components/FilterScreenComponent/SearchComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import SearchLoader from '../components/SearchLoader';
const FilterScreen = () => {
  const [search, setSearch] = useState(null);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [searchResult, setSearchResult] = useState([]);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [threek, setThreek] = useState(true);
  const [fourk, setFourk] = useState(false);
  const [fivek, setFivek] = useState(false);
  const [sixk, setSixk] = useState(false);
  const [tenk, setTenk] = useState(false);
  const [twentyk, setTwentyk] = useState(false);
  const [thirtyk, setThirtyk] = useState(false);
  const [fortyk, setFortyk] = useState(false);
  const [price, setPrice] = useState(2000);
  const [rating, setRating] = useState(1);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  // const [gender, setGender] = useState('male');
  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);
  const [isHotWater, setIsHotWater] = useState(false);
  const [isCooler, setIsCooler] = useState(false);
  const [isAC, setIsAC] = useState(false);
  const [isAttached, setIsAttached] = useState(false);
  const [isWIFI, setIsWIFI] = useState(false);
  const [single, setSingle] = useState(false);
  const [shared, setShared] = useState(true);
  const [bool, setBool] = useState(false);
  const [familyrooms, setFamilyRooms] = useState(false);
  const [pg, setPg] = useState(false);
  const [mess, setMess] = useState(false);
  const [hostel, setHostel] = useState(true);
  const [pgType, setPgType] = useState('HOSTEL');
  const [occupancy, setOccupancy] = useState('shared');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {users, tokens, city, setCity} = useAuthContext();

  const onApplyFilters = async () => {
    // console.log('isHotWater:', isHotWater);
    // console.log('isAC:', isAC);
    // console.log('isCooler:', isCooler);
    // console.log('isAttached:', isAttached);
    // console.log('isWIFI:', isWIFI);
    // console.log('isAC:', isAC);
    // console.log('pgType:', pgType);
    // console.log({
    //   occupancy: occupancy,
    //   isAttached: isAttached,
    //   cityname: city,
    //   isAC: isAC,
    //   isCooler: isCooler,
    //   isHotWater: isHotWater,
    //   isWIFI: isWIFI,
    //   typeofpg: pgType,
    //   isFemale: isFemale,
    //   isMale: isMale,
    //   ratingFilters: `ratings>=${rating}&ratings<5`,
    //   priceFilters: `price>=${price}&price<50000`,
    // });
    setLoading(true);
    console.log(search);
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/pg/filter`,
      {
        occupancy: mess ? null : occupancy,
        isAttached: mess ? null : isAttached,
        cityname: 'Kota',
        isAC: mess ? null : isAC,
        isCooler: mess ? null : isCooler,
        isHotWater: mess ? null : isHotWater,
        isWIFI: mess ? null : isWIFI,
        typeofpg: pgType,
        isFemale: mess ? null : isFemale,
        isMale: mess ? null : isMale,
        ratingFilters: `ratings>=${rating}&ratings<5`,
        priceFilters: `price<=${price}&price>0`,
        areaname: search,
      },
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data);
    setData(response.data.data);
    navigation.navigate('FilterResultScreen', {data: response.data.data});
    setLoading(false);
  };
  const onrate = () => {};
  const onPress = async () => {
    if (search?.length >= 2) {
      const response = await axios.get(
        `http://${USER_IP}/api/v1/user/area?search=${search}`,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      console.log(response.data.data);
      setSearchResult(response.data.data);
    } else {
      setSearchResult(null);
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          <FontAwesome5 name="filter" size={13} color={PRIMARY_COLOR} />
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              marginHorizontal: 5,
              marginTop: 3,
            }}>
            Filters
          </Text>
        </View>
        <Text
          style={{
            color: '#191919',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            marginHorizontal: 13,
            marginTop: 10,
            marginBottom: 5,
          }}>
          Search city :
        </Text>
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
            onFocus={() => setBool(true)}
            onChangeText={setSearch}
            onTextInput={onPress}
            placeholder="Search for localities/areas..."
            placeholderTextColor={'grey'}
            underlineColorAndroid="transparent"
          />
        </View>
        {/* <FlatList
        data={searchResult}
        renderItem={({item}) => <SearchComponent searchResult={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      /> */}
        {bool && (
          <FlatList
            data={searchResult}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  // setCity(item.name);
                  setSearch(item.name);
                  setBool(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginBottom: 4,
                  padding: 15,
                }}>
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 45, width: 45, borderRadius: 22.5}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 13,
                      marginHorizontal: 8,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* <Text>city</Text> */}
        <Text
          style={{
            color: '#191919',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            marginHorizontal: 13,
            marginTop: 15,
            marginBottom: 5,
          }}>
          What you're looking for,
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 8,
          }}>
          <Pressable
            style={{
              width: 65,
              marginHorizontal: 6,
              backgroundColor: hostel ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: hostel ? 0.5 : 0,
              borderColor: hostel ? '#286aed' : 'white',
            }}
            onPress={() => {
              if (hostel) {
                // setHostel(false);
              } else {
                setHostel(true);
                setPg(false);
                setFamilyRooms(false);
                setMess(false);
                setPgType('HOSTEL');
              }
            }}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 3,
              }}>
              Hostel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (pg) {
                setPg(false);
                if (!hostel) {
                  setHostel(true);
                  setFamilyRooms(false);
                  setPgType('HOSTEL');
                }
              } else {
                setPg(true);
                setHostel(false);
                setMess(false);
                setFamilyRooms(false);
                setPgType('PG');
              }
            }}
            style={{
              width: 65,
              marginHorizontal: 6,
              backgroundColor: pg ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: pg ? 0.5 : 0,
              borderColor: pg ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 3,
              }}>
              PG
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (familyrooms) {
                setFamilyRooms(false);
                if (!hostel) {
                  setHostel(true);
                  setPg(false);
                  setMess(false);
                  setPgType('HOSTEL');
                }
              } else {
                setFamilyRooms(true);
                setHostel(false);
                setMess(false);
                setPg(false);
                setPgType('FAMILYROOMS');
              }
            }}
            style={{
              width: 90,
              marginHorizontal: 6,
              backgroundColor: familyrooms ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: familyrooms ? 0.5 : 0,
              borderColor: familyrooms ? '#286aed' : 'white',
              // marginBottom: 40,
            }}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 3,
              }}>
              Family Room
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (mess) {
                setMess(false);
                if (!hostel) {
                  setHostel(true);
                  setFamilyRooms(false);
                  setPg(false);
                  setPgType('HOSTEL');
                }
              } else {
                setMess(true);
                setPg(false);
                setHostel(false);
                setFamilyRooms(false);
                setPgType('MESS');
              }
            }}
            style={{
              width: 65,
              marginHorizontal: 6,
              backgroundColor: mess ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: mess ? 0.5 : 0,
              borderColor: mess ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 3,
              }}>
              Mess
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: '#191919',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            marginHorizontal: 13,
            marginTop: 10,
            marginBottom: 5,
          }}>
          Ratings:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 2,
          }}>
          <Pressable
            onPress={() => {
              if (one) {
                setOne(false);
              } else {
                setOne(true);
                setTwo(false);
                setThree(false);
                setFour(false);
                setRating(1);
                // console.log(rating);
              }
            }}
            style={{
              width: 50,
              backgroundColor: one ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: one ? 0.5 : 0,
              borderColor: one ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`>= 1`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (two) {
                setTwo(false);
                setRating(1);
              } else {
                setTwo(true);
                setOne(false);
                setThree(false);
                setFour(false);
                setRating(2);
                // console.log(rating);
              }
            }}
            style={{
              width: 50,
              backgroundColor: two ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: two ? 0.5 : 0,
              borderColor: two ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`>= 2`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (three) {
                setThree(false);
                setRating(1);
              } else {
                setThree(true);
                setOne(false);
                setTwo(false);
                setFour(false);
                setRating(3);
                // console.log(rating);
              }
            }}
            style={{
              width: 50,
              backgroundColor: three ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              marginHorizontal: 8,
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: three ? 0.5 : 0,
              borderColor: three ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`>= 3`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (four) {
                setFour(false);
                setRating(1);
              } else {
                setFour(true);
                setOne(false);
                setTwo(false);
                setThree(false);
                setRating(4);
                // console.log(rating);
              }
            }}
            style={{
              width: 50,
              marginHorizontal: 8,
              backgroundColor: four ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: four ? 0.5 : 0,
              borderColor: four ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`>= 4`}</Text>
          </Pressable>
          {/* <Pressable
          onPress={() => {
            setOne(true);
            setRating(1);
          }}
          style={{
            width: 50,
            backgroundColor: '#cad7fa',
            height: 30,
            alignItems: 'center',
            borderRadius: 8,
          }}></Pressable> */}
        </View>
        {!mess && (
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              marginHorizontal: 13,
              marginTop: 15,
              marginBottom: 5,
            }}>
            Gender:
          </Text>
        )}
        {!mess && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 2,
            }}>
            <Pressable
              style={{
                width: 65,
                marginHorizontal: 8,
                backgroundColor: male ? '#cad7fa' : '#edeef0',
                height: 30,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: male ? 0.5 : 0,
                borderColor: male ? '#286aed' : 'white',
              }}
              onPress={() => {
                if (male) {
                  setMale(false);
                  setIsMale(false);
                } else {
                  setMale(true);
                  // setFemale(false);
                  setIsMale(true);
                }
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Male
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (female) {
                  setFemale(false);
                  setIsFemale(false);
                } else {
                  setFemale(true);
                  setIsFemale(true);
                }
              }}
              style={{
                width: 65,
                marginHorizontal: 8,
                backgroundColor: female ? '#cad7fa' : '#edeef0',
                height: 30,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: female ? 0.5 : 0,
                borderColor: female ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Female
              </Text>
            </Pressable>
          </View>
        )}
        {!mess && (
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              marginHorizontal: 13,
              marginTop: 15,
              marginBottom: 5,
            }}>
            Amenities:
          </Text>
        )}
        {!mess && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginHorizontal: 13,
            }}>
            <Pressable
              onPress={() => {
                if (isHotWater) {
                  setIsHotWater(false);
                } else {
                  setIsHotWater(true);
                }
              }}
              style={{
                width: 80,
                marginHorizontal: 8,
                backgroundColor: isHotWater ? '#cad7fa' : '#edeef0',
                height: 33,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: isHotWater ? 0.5 : 0,
                borderColor: isHotWater ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Hot water
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (isAC) {
                  setIsAC(false);
                } else {
                  setIsAC(true);
                }
              }}
              style={{
                width: 80,
                marginHorizontal: 8,
                backgroundColor: isAC ? '#cad7fa' : '#edeef0',
                height: 33,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: isAC ? 0.5 : 0,
                borderColor: isAC ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                AC room
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (isCooler) {
                  setIsCooler(false);
                } else {
                  setIsCooler(true);
                }
              }}
              style={{
                width: 80,
                marginHorizontal: 8,
                backgroundColor: isCooler ? '#cad7fa' : '#edeef0',
                height: 33,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: isCooler ? 0.5 : 0,
                borderColor: isCooler ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Cooler
              </Text>
            </Pressable>
          </View>
        )}
        {!mess && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 17,
              marginHorizontal: 13,
            }}>
            <Pressable
              onPress={() => {
                if (isAttached) {
                  setIsAttached(false);
                } else {
                  setIsAttached(true);
                }
              }}
              style={{
                width: 177,
                marginHorizontal: 8,
                backgroundColor: isAttached ? '#cad7fa' : '#edeef0',
                height: 33,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: isAttached ? 0.5 : 0,
                borderColor: isAttached ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Attached Bathroom
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (isWIFI) {
                  setIsWIFI(false);
                } else {
                  setIsWIFI(true);
                }
              }}
              style={{
                width: 80,
                marginHorizontal: 8,
                backgroundColor: isWIFI ? '#cad7fa' : '#edeef0',
                height: 33,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: isWIFI ? 0.5 : 0,
                borderColor: isWIFI ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                WiFi
              </Text>
            </Pressable>
          </View>
        )}
        {!mess && (
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              marginHorizontal: 13,
              marginTop: 15,
              marginBottom: 5,
            }}>
            Type of Occupancy:
          </Text>
        )}
        {!mess && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 8,
            }}>
            <Pressable
              style={{
                width: 65,
                marginHorizontal: 8,
                backgroundColor: shared ? '#cad7fa' : '#edeef0',
                height: 30,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: shared ? 0.5 : 0,
                borderColor: shared ? '#286aed' : 'white',
              }}
              onPress={() => {
                if (shared) {
                  setShared(false);
                  setSingle(true);
                  setOccupancy('single');
                } else {
                  setShared(true);
                  setSingle(false);
                  setOccupancy('shared');
                }
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Shared
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (single) {
                  setSingle(false);
                  setShared(true);
                  setOccupancy('shared');
                } else {
                  setSingle(true);
                  setShared(false);
                  setOccupancy('single');
                }
              }}
              style={{
                width: 65,
                marginHorizontal: 8,
                backgroundColor: single ? '#cad7fa' : '#edeef0',
                height: 30,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'center',
                borderWidth: single ? 0.5 : 0,
                borderColor: single ? '#286aed' : 'white',
              }}>
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 3,
                }}>
                Single
              </Text>
            </Pressable>
          </View>
        )}
        <Text
          style={{
            color: '#191919',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            marginHorizontal: 13,
            marginTop: 15,
            marginBottom: 5,
          }}>
          Price (monthly):
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 2,
          }}>
          <Pressable
            onPress={() => {
              if (threek) {
                // setThreek(false);
              } else {
                setThreek(true);
                setFourk(false);
                setFivek(false);
                setSixk(false);
                setTenk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(false);
                setPrice(3000);
                // console.log(rating);
              }
            }}
            style={{
              width: 68,
              backgroundColor: threek ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: threek ? 0.5 : 0,
              borderColor: threek ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 3000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (fourk) {
                setFourk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setFourk(true);
                setThreek(false);
                setFivek(false);
                setSixk(false);
                setTenk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(false);
                setPrice(4000);
                // console.log(rating);
              }
            }}
            style={{
              width: 68,
              backgroundColor: fourk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: fourk ? 0.5 : 0,
              borderColor: fourk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 4000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (fivek) {
                setFivek(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setFivek(true);
                setThreek(false);
                setFourk(false);
                setSixk(false);
                setTenk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(false);
                setPrice(5000);
                // console.log(rating);
              }
            }}
            style={{
              width: 68,
              backgroundColor: fivek ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              marginHorizontal: 8,
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: fivek ? 0.5 : 0,
              borderColor: fivek ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 5000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (sixk) {
                setSixk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setSixk(true);
                setThreek(false);
                setFourk(false);
                setFivek(false);
                setTenk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(false);
                setPrice(6000);
              }
            }}
            style={{
              width: 68,
              marginHorizontal: 8,
              backgroundColor: sixk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: sixk ? 0.5 : 0,
              borderColor: sixk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 6000`}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 19,
          }}>
          <Pressable
            onPress={() => {
              if (tenk) {
                setTenk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setTenk(true);
                setThreek(false);
                setFourk(false);
                setFivek(false);
                setSixk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(false);
                setPrice(10000);
              }
            }}
            style={{
              width: 68,
              backgroundColor: tenk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: tenk ? 0.5 : 0,
              borderColor: tenk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 10000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (twentyk) {
                setTwentyk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setTenk(false);
                setThreek(false);
                setFourk(false);
                setFivek(false);
                setSixk(false);
                setTwentyk(true);
                setThirtyk(false);
                setFortyk(false);
                setPrice(20000);
              }
            }}
            style={{
              width: 68,
              backgroundColor: twentyk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              borderWidth: twentyk ? 0.5 : 0,
              borderColor: twentyk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 20000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (thirtyk) {
                setThirtyk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setTenk(false);
                setThreek(false);
                setFourk(false);
                setFivek(false);
                setSixk(false);
                setTwentyk(false);
                setThirtyk(true);
                setFortyk(false);
                setPrice(30000);
              }
            }}
            style={{
              width: 68,
              backgroundColor: thirtyk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              marginHorizontal: 8,
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: thirtyk ? 0.5 : 0,
              borderColor: thirtyk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 30000`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (fortyk) {
                setFortyk(false);
                if (!threek) {
                  setThreek(true);
                  setPrice(3000);
                }
              } else {
                setTenk(false);
                setThreek(false);
                setFourk(false);
                setFivek(false);
                setSixk(false);
                setTwentyk(false);
                setThirtyk(false);
                setFortyk(true);
                setPrice(40000);
              }
            }}
            style={{
              width: 68,
              marginHorizontal: 8,
              backgroundColor: fortyk ? '#cad7fa' : '#edeef0',
              height: 30,
              alignItems: 'center',
              borderRadius: 8,
              justifyContent: 'center',
              borderWidth: fortyk ? 0.5 : 0,
              borderColor: fortyk ? '#286aed' : 'white',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                color: '#303030',
                fontSize: 12,
              }}>{`< 40000`}</Text>
          </Pressable>
        </View> */}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#191919',
            marginHorizontal: 15,
            fontSize: 13,
          }}>
          Rs.{price}
        </Text>
        <Slider
          style={{
            width: width - 50,
            height: 30,
            marginHorizontal: 15,
            // pointerEvents: 'box-only',
          }}
          minimumValue={0}
          maximumValue={30000}
          minimumTrackTintColor={PRIMARY_COLOR}
          maximumTrackTintColor={'#6186e8'}
          value={2000}
          step={500}
          onValueChange={setPrice}
          thumbTintColor={PRIMARY_COLOR}
        />
        <Pressable
          onPress={onApplyFilters}
          style={{
            shadowColor: '#19347d',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 7,
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: '#19347d',
            paddingVertical: 9,
            borderRadius: 13,
            // flex: 1,
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
            Apply Filters
          </Text>
        </Pressable>
      </ScrollView>
      {loading ? <SearchLoader /> : null}
    </>
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
export default FilterScreen;
