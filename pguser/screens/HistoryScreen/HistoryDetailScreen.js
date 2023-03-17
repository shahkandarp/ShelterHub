import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ImageBackground,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImageComponent from '../../components/HomeScreenComponent/ImageComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {USER_IP} from '@env';
import axios from 'axios';
import {useAuthContext} from '../../src/Context/AuthContext';
import RoomComponent from '../../components/HomeScreenComponent/RoomComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from '@env';
import RulesComponent from '../../components/HomeScreenComponent/RulesComponent';
import FamousPlaces from '../../components/HomeScreenComponent/FamousPlaces';
const HistoryDetailScreen = () => {
  const {tokens, users} = useAuthContext();
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const {width, height} = useWindowDimensions();
  const route = useRoute();
  const data = route?.params?.data;
  const mapRef = useRef();
  const navigation = useNavigation();
  const [pgDetails, setPgDetails] = useState([]);
  useEffect(() => {
    getPgDetail();
  }, []);
  const getPgDetail = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/pg/${data.pg._id}`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    console.log(response.data.data.rooms);
    setPgDetails(response.data.data);
  };
  const onPress = () => {
    setModal(true);
  };
  const MapPressed = () => {
    setMapModal(true);
  };
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <ImageBackground
          source={{uri: data.pg.photos[0].uri}}
          style={{width: width, height: 230, paddingTop: 130}}>
          <LinearGradient
            colors={['#00000000', '#ffffff']}
            style={{
              height: '100%',
              width: '100%',
            }}></LinearGradient>
        </ImageBackground>
        <Pressable onPress={onPress}>
          <FlatList
            data={data.pg.photos}
            horizontal
            style={{
              marginBottom: 20,
              marginTop: -20,
              marginHorizontal: 20,
              alignSelf: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ImageComponent image={item} />}
            keyExtractor={item => item.uri}
          />
        </Pressable>
      </View>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#101010',
          fontSize: 16,
          marginHorizontal: 12,
        }}>
        {data.pg.propertytitle}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: 'grey',
          fontSize: 11,
          marginHorizontal: 12,
        }}>
        {data.pg.address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 12,
          marginTop: 5,
        }}>
        <FontAwesome name="star" size={13} color={'#fabe1b'} />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'grey',
            fontSize: 11,
            marginTop: 2,
          }}>
          {'  '}
          {data.pg?.ratings?.$numberDecimal}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'grey',
            fontSize: 11,
            marginTop: 2,
          }}>
          {' '}
          {'\u25CF'} {data.pg?.noofraters} ratings
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginTop: 10,
        }}></View>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 15,
          marginHorizontal: 12,
        }}>
        Amenities
      </Text>
      {data.pg?.isAC && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <MaterialCommunityIcons
            name="air-conditioner"
            size={12}
            style={{marginLeft: 11, color: PRIMARY_COLOR}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              color: '#191919',
              marginLeft: 6,
              marginTop: 3,
            }}>
            AC Rooms Available
          </Text>
        </View>
      )}
      {data.pg.isWIFI && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <FontAwesome5
            name="wifi"
            size={12}
            style={{marginLeft: 12, color: PRIMARY_COLOR}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              color: '#191919',
              marginLeft: 6,
              marginTop: 3,
            }}>
            WiFi Available
          </Text>
        </View>
      )}
      {data.pg.isHotWater && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <FontAwesome5
            name="hot-tub"
            size={12}
            style={{marginLeft: 12, color: PRIMARY_COLOR}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              color: '#191919',
              marginLeft: 6,
              marginTop: 3,
            }}>
            Hot Water
          </Text>
        </View>
      )}
      {data.pg.isCooler && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <MaterialCommunityIcons
            name="coolant-temperature"
            size={13}
            style={{marginLeft: 12, color: PRIMARY_COLOR}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              color: '#191919',
              marginLeft: 6,
              marginTop: 3,
            }}>
            Cooler
          </Text>
        </View>
      )}
      <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginVertical: 20,
        }}></View>
      {/* <Pressable onPress={() => navigation.navigate('MapScreen', {data: data})}>
        <Text style={{color: 'black'}}>View on map</Text>
      </Pressable> */}
      {/* <Text style={{}}>Rooms available</Text> */}
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          // marginTop: 10,
          marginHorizontal: 12,
        }}>
        You showed interest in this room,
      </Text>
      <FlatList
        data={pgDetails.rooms}
        style={{
          marginBottom: 4,
          marginHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RoomComponent datas={item} data2={data.pg} check={true} />
        )}
        keyExtractor={item => item._id}
      />
      {/* <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginTop: 10,
          marginBottom: 10,
        }}></View> */}
      <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginVertical: 15,
        }}></View>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 5,
          marginHorizontal: 12,
        }}>
        Ratings
      </Text>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 12,
          // marginTop: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <FontAwesome
              style={{marginHorizontal: 3}}
              name={
                i < Math.floor(data.pg?.ratings?.$numberDecimal)
                  ? 'star'
                  : 'star-o'
              }
              size={22}
              // color={dish.isAvailable ? '#fabe1b' : 'grey'}
              color={'#fabe1b'}
            />
          ))}
        </View>

        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 13,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
              color: '#191919',
            }}>
            {data.pg?.ratings?.$numberDecimal}
          </Text>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
            {data.pg?.noofraters} ratings
          </Text>
          {/* </View> */}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginTop: 20,
        }}></View>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 15,
          marginHorizontal: 12,
        }}>
        What's nearby?
      </Text>
      <FlatList
        data={data?.pg?.famousplacedistance}
        style={{
          marginBottom: 8,
          marginHorizontal: 13,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <FamousPlaces data={item} />}
        keyExtractor={item => item._id}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 15,
          marginHorizontal: 12,
        }}>
        About us
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#808080',
          fontSize: 12,
          marginTop: 10,
          marginHorizontal: 12,
        }}>
        {data?.pg?.About}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 15,
          marginHorizontal: 12,
        }}>
        Rules
      </Text>
      <FlatList
        data={data?.pg?.Rules}
        style={{
          marginBottom: 55,
          marginHorizontal: 13,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RulesComponent data={item} />}
        keyExtractor={item => item._id}
      />
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{flex: 1, backgroundColor: '#000000aa'}}>
          <View style={{height: 100, alignItems: 'center'}}>
            {/* // onPress={() => setModal(false)}> */}
            <Pressable
              onPress={() => setModal(false)}
              style={{
                backgroundColor: 'white',
                height: 35,
                width: 35,
                padding: 7,
                borderRadius: 17,
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Entypo name="cross" size={21} color={'#000000'} />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View style={{height: 10}}></View>
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 15,
                marginTop: 8,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#191919',
                  fontSize: 16,

                  // textAlign: 'center',
                }}>
                Photos
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'grey',
                  fontSize: 11,
                }}>
                {data.pg.photos.length > 0
                  ? `${data.pg.photos.length} Images`
                  : '1 Image'}
              </Text>
              <FlatList
                data={data.pg.photos}
                style={{marginBottom: 153, alignSelf: 'center'}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <ImageComponent image={item} modal={true} />
                )}
                keyExtractor={item => item.url}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={mapModal} animationType={'slide'}>
        <View style={{flex: 1, backgroundColor: '#000000aa'}}>
          <View style={{height: 100, alignItems: 'center'}}>
            {/* // onPress={() => setModal(false)}> */}
            {/* <Pressable
              onPress={() => setModal(false)}
              style={{
                backgroundColor: 'white',
                height: 35,
                width: 35,
                padding: 7,
                borderRadius: 17,
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Entypo name="cross" size={21} color={'#000000'} />
            </Pressable> */}
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <MapView
              ref={mapRef}
              followsUserLocation={true}
              showsUserLocation={true}
              style={{
                height: height,
                width: width,
              }}
              initialRegion={{
                latitude: data.pg?.lat?.$numberDecimal,
                longitude: data.pg?.lng?.$numberDecimal,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}>
              <Marker
                title={data.pg?.propertytitle}
                coordinate={{
                  latitude: data.pg?.lat?.$numberDecimal,
                  longitude: data.pg?.lng?.$numberDecimal,
                }}
                description={data.address}>
                <View
                  style={{
                    backgroundColor: 'orange',
                    borderRadius: 6,
                    padding: 5,
                  }}>
                  <MaterialIcons name="restaurant" size={15} color={'white'} />
                </View>
              </Marker>
              {/* <Marker
                title={user?.name}
                coordinate={{
                  latitude: user?.lat,
                  longitude: user?.lng,
                }}
                description={user?.address}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 6,
                    padding: 5,
                  }}>
                  <Entypo name="user" size={15} color={'black'} />
                </View>
              </Marker> */}
            </MapView>
            {/* <View style={{height: 10}}></View> */}
            {/* <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 15,
                marginTop: 8,
              }}></View> */}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HistoryDetailScreen;
