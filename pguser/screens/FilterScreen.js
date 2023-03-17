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
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '@env';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import {USER_IP} from '@env';
import SearchComponent from '../components/FilterScreenComponent/SearchComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const FilterScreen = () => {
  const [search, setSearch] = useState(null);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [searchResult, setSearchResult] = useState([]);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [oneThousand, setOneThousand] = useState(true);
  const [twoThousand, setTwoThousand] = useState(false);
  const [threeThousand, setThreeThousand] = useState(false);
  const [fourThousand, setFourThousand] = useState(false);
  const [price, setPrice] = useState(1000);
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
  const [hostel, setHostel] = useState(true);
  const [pgType, setPgType] = useState('HOSTEL');
  const [occupancy, setOccupancy] = useState('shared');
  const {users, tokens, city, setCity} = useAuthContext();

  const onApplyFilters = async () => {
    // console.log('isHotWater:', isHotWater);
    // console.log('isAC:', isAC);
    // console.log('isCooler:', isCooler);
    // console.log('isAttached:', isAttached);
    // console.log('isWIFI:', isWIFI);
    // console.log('isAC:', isAC);
    // console.log('pgType:', pgType);
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/pg/filter`,
      {
        occupancy: occupancy,
        isAttached: isAttached,
        cityname: city,
        isAC: isAC,
        isCooler: isCooler,
        isHotWater: isHotWater,
        isWIFI: isWIFI,
        typeofpg: pgType,
        isFemale: isFemale,
        isMale: isMale,
        ratingFilters: rating,
        priceFilters: price,
      },
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setSearchResult(response.data.data);
  };
  const onrate = () => {};
  const onPress = async () => {
    if (search?.length >= 2) {
      const response = await axios.get(
        `http://${USER_IP}/api/v1/user/city?search=${search}`,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      setSearchResult(response.data.data);
    } else {
      setSearchResult(null);
    }
  };
  return (
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
            fontSize: 15,
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
          placeholder="Search for cities..."
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
      <Text
        style={{
          color: '#191919',
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          marginHorizontal: 13,
          marginTop: 15,
          marginBottom: 5,
        }}>
        Price:
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
            if (oneThousand) {
              // setOneThousand(false);
            } else {
              setOneThousand(true);
              setTwoThousand(false);
              setThreeThousand(false);
              setFourThousand(false);
              setPrice(1000);
              // console.log(rating);
            }
          }}
          style={{
            width: oneThousand ? 80 : 60,
            backgroundColor: oneThousand ? '#cad7fa' : '#edeef0',
            height: 30,
            alignItems: 'center',
            borderRadius: 8,
            marginHorizontal: 8,
            justifyContent: 'center',
            borderWidth: oneThousand ? 0.5 : 0,
            borderColor: oneThousand ? '#286aed' : 'white',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              marginTop: 3,
              color: '#303030',
              fontSize: 12,
            }}>{`>= 1000`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (twoThousand) {
              setTwoThousand(false);
              if (!oneThousand) {
                setOneThousand(true);
                setPrice(1000);
              }
            } else {
              setTwoThousand(true);
              setOneThousand(false);
              setThreeThousand(false);
              setFourThousand(false);
              setPrice(2000);
              // console.log(rating);
            }
          }}
          style={{
            width: twoThousand ? 80 : 60,
            backgroundColor: twoThousand ? '#cad7fa' : '#edeef0',
            height: 30,
            alignItems: 'center',
            borderRadius: 8,
            marginHorizontal: 8,
            justifyContent: 'center',
            borderWidth: twoThousand ? 0.5 : 0,
            borderColor: twoThousand ? '#286aed' : 'white',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              marginTop: 3,
              color: '#303030',
              fontSize: 12,
            }}>{`>= 2000`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (threeThousand) {
              setThreeThousand(false);
              if (!oneThousand) {
                setOneThousand(true);
                setPrice(1000);
              }
            } else {
              setThreeThousand(true);
              setOneThousand(false);
              setTwoThousand(false);
              setFourThousand(false);
              setPrice(3000);
              // console.log(rating);
            }
          }}
          style={{
            width: threeThousand ? 80 : 60,
            backgroundColor: threeThousand ? '#cad7fa' : '#edeef0',
            height: 30,
            alignItems: 'center',
            marginHorizontal: 8,
            borderRadius: 8,
            justifyContent: 'center',
            borderWidth: threeThousand ? 0.5 : 0,
            borderColor: threeThousand ? '#286aed' : 'white',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              marginTop: 3,
              color: '#303030',
              fontSize: 12,
            }}>{`>= 3000`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (fourThousand) {
              setFourThousand(false);
              if (!oneThousand) {
                setOneThousand(true);
                setPrice(1000);
              }
            } else {
              setFourThousand(true);
              setOneThousand(false);
              setTwoThousand(false);
              setThreeThousand(false);
              setPrice(4000);
            }
          }}
          style={{
            width: fourThousand ? 80 : 60,
            marginHorizontal: 8,
            backgroundColor: fourThousand ? '#cad7fa' : '#edeef0',
            height: 30,
            alignItems: 'center',
            borderRadius: 8,
            justifyContent: 'center',
            borderWidth: fourThousand ? 0.5 : 0,
            borderColor: fourThousand ? '#286aed' : 'white',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              marginTop: 3,
              color: '#303030',
              fontSize: 12,
            }}>{`>= 4000`}</Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: '#191919',
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          marginHorizontal: 13,
          marginTop: 15,
          marginBottom: 5,
        }}>
        Type of PG:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 15,
          marginTop: 8,
          // marginBottom: 80,
        }}>
        <Pressable
          style={{
            width: 65,
            marginHorizontal: 8,
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
              setFamilyRooms(false);
              setPgType('PG');
            }
          }}
          style={{
            width: 65,
            marginHorizontal: 8,
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
                setPgType('HOSTEL');
              }
            } else {
              setFamilyRooms(true);
              setHostel(false);
              setPg(false);
              setPgType('FAMILYROOMS');
            }
          }}
          style={{
            width: 90,
            marginHorizontal: 8,
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
      </View>
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
          flex: 1,
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
