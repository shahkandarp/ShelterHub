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
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Linking,
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
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PgDetailScreen = () => {
  const {tokens, users} = useAuthContext();
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const {width, height} = useWindowDimensions();
  const route = useRoute();
  const data = route?.params?.data;
  const check = route?.params?.check;
  const mess = route?.params?.mess;
  const mapRef = useRef();
  const navigation = useNavigation();
  const [pgDetails, setPgDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [showOwnerDetails, setShowOwnerDetails] = useState(false);
  const pgDetail = route?.params?.pgDetail;
  useEffect(() => {
    if (check) {
      // console.log(pgDetail);
    } else {
      getPgDetail();
      getReviews();
      // console.log(stars);
    }
  }, []);
  const openMap = async (latitude, longitude, label = 'MyLabel') => {
    const tag = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
    const link = Platform.select({
      ios: `${tag}${label}@${data?.lat?.$numberDecimal},${data?.lng?.$numberDecimal}`,
      android: `${tag}${data?.lat?.$numberDecimal},${data?.lng?.$numberDecimal}(${label})`,
    });

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };
  const showInterest = async () => {
    // console.log(data._id);
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/${users}/interest`,
      {room: data._id},
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    // console.log(response.data.data);
    setShowOwnerDetails(true);
    await showToastWithGravityAndOffset();
    // setModal(false);
    // setPgDetails(response.data.data);
  };
  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Your interest sent to Owner!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const getPgDetail = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/pg/${data._id}`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setPgDetails(response.data.data);
  };
  const getReviews = async () => {
    const response = await axios.get(
      `http://${USER_IP}/api/v1/user/pg/${data._id}/reviews`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    console.log(response.data.data);
    setReviews(response.data.data);
  };
  const stars = (
    data?.ratings?.$numberDecimal - Math.floor(data?.ratings?.$numberDecimal)
  ).toFixed(1);
  //  const getDetails = async () => {
  //    const response = await axios.get(
  //      `http://${USER_IP}/api/v1/user/pg/${data._id}`,
  //      {headers: {Authorization: `Bearer ${tokens}`}},
  //    );
  //    setPgDetails(response.data.data);
  //  };
  var arr = data.address;
  var arr1 = arr.split('/');

  const onPress = () => {
    setModal(true);
    // console.log(stars);
  };
  const MapPressed = () => {
    setMapModal(true);
  };
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <ImageBackground
          source={{uri: data.photos[0].uri}}
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
            data={data.photos}
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
        {data.propertytitle}
        {/* {arr1[0]} */}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: 'grey',
          fontSize: 11,
          marginHorizontal: 12,
        }}>
        {/* {data.address} */}
        {`${arr1[0]}`}
        {', '}
        {arr1[2]}
      </Text>
      <Pressable
        onPress={openMap}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 8,
        }}>
        <MaterialIcons name="location-pin" size={19} color={'#3483eb'} />
        <Text
          style={{
            marginLeft: 2,
            fontFamily: 'Poppins-Regular',
            color: '#3483eb',
            fontSize: 12,
            marginTop: 2,
          }}>
          View on Google Map
        </Text>
      </Pressable>
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
          {data?.ratings?.$numberDecimal}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'grey',
            fontSize: 11,
            marginTop: 2,
          }}>
          {' '}
          {'\u25CF'} {data?.noofraters} ratings
        </Text>
      </View>
      {!mess && (
        <View
          style={{
            backgroundColor: '#e0e0ed',
            height: 1,
            marginHorizontal: 30,
            marginTop: 10,
          }}></View>
      )}
      {!mess && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#191919',
            fontSize: 15,
            marginTop: 10,
            marginHorizontal: 12,
          }}>
          Here's Our Room,
        </Text>
      )}
      {!mess && (
        <FlatList
          data={check ? pgDetail : pgDetails.rooms}
          style={{
            marginBottom: 4,
            marginHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <RoomComponent datas={item} data2={data} />}
          keyExtractor={item => item._id}
        />
      )}
      {!mess && (
        <View
          style={{
            backgroundColor: '#e0e0ed',
            height: 1,
            marginHorizontal: 30,
            marginVertical: 15,
          }}></View>
      )}
      {!mess && (
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
      )}
      {data?.isAC && !mess && (
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
      {data.isWIFI && !mess && (
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
      {data.isHotWater && !mess && (
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
      {data.isCooler && !mess && (
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
      {/* {!mess && ( */}
      {mess && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#191919',
            fontSize: 15,
            marginTop: 15,
            marginHorizontal: 12,
          }}>
          Mess Menu
        </Text>
      )}
      {/* <View style={{backgroundColor: 'blue', height: 300}}> */}
      {mess && (
        <Image
          source={{uri: data?.messmenuphoto.uri}}
          style={{width: 300, height: 400, marginHorizontal: 30}}
        />
      )}
      <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginVertical: 20,
        }}></View>
      {showOwnerDetails && (
        <View style={{marginBottom: 30}}>
          <Text
            style={{
              marginHorizontal: 13,
              fontFamily: 'Poppins-Medium',
              color: '#101010',
              fontSize: 14,
              marginTop: 13,
            }}>
            Owner Details
          </Text>
          <Text
            style={{
              marginHorizontal: 13,
              fontFamily: 'Poppins-Regular',
              color: '#101010',
              fontSize: 11,
              marginTop: 3,
            }}>
            Name: {data.name}
          </Text>
          <Text
            style={{
              marginHorizontal: 13,
              fontFamily: 'Poppins-Regular',
              color: '#101010',
              fontSize: 11,
              marginTop: 3,
            }}>
            Email: {data.email}
          </Text>
          <Text
            style={{
              marginHorizontal: 13,
              fontFamily: 'Poppins-Regular',
              color: '#101010',
              fontSize: 11,
              marginTop: 3,
            }}>
            Phone No: {data.phoneno}
          </Text>
        </View>
      )}
      {mess && !showOwnerDetails && (
        <View>
          {/* {!check && !show && ( */}
          <TouchableOpacity
            onPress={showInterest}
            style={{
              width: width - 40,
              backgroundColor: PRIMARY_COLOR,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
              marginBottom: 10,
              borderRadius: 12,
              height: 42,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
                color: 'white',
              }}>
              Show Interest
            </Text>
          </TouchableOpacity>
          {/* )} */}
          {/* {!show && ( */}
          <Text
            style={{
              marginHorizontal: 13,
              fontFamily: 'Poppins-Regular',
              color: '#101010',
              fontSize: 11,
              marginTop: 3,
              marginBottom: 30,
            }}>
            *Note: You have to show interest, to get Owner details
          </Text>
          {/* )} */}
        </View>
      )}

      {/* // )} */}
      {/* <Pressable onPress={() => navigation.navigate('MapScreen', {data: data})}>
        {/* <Pressable onPress={() => console.log(data.lat.$numberDecimal)}> */}
      {/* <Text style={{color: 'black'}}>View on map</Text> */}
      {/* </Pressable> */}
      {/* <Text style={{}}>Rooms available</Text> */}

      {/* <View
        style={{
          backgroundColor: '#e0e0ed',
          height: 1,
          marginHorizontal: 30,
          marginTop: 10,
          marginBottom: 10,
        }}></View> */}
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '#191919',
          fontSize: 15,
          marginTop: 3,
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
                i < Math.floor(data?.ratings?.$numberDecimal)
                  ? 'star'
                  : 'star-o'
              }
              size={22}
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
            {data?.ratings?.$numberDecimal}
          </Text>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
            {data?.noofraters} ratings
          </Text>
          {/* </View> */}
        </View>
      </View>
      <View style={{marginHorizontal: 15}}>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 13}}>
          {reviews[0]?.review}
        </Text>
        <Pressable
          onPress={() => {
            if (show) {
              setShow(false);
            } else {
              setShow(true);
            }
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: PRIMARY_COLOR,
              fontSize: 13,
            }}>
            {show ? `Show less` : `Show all Comments`}
          </Text>
        </Pressable>
        {show && (
          <View>
            <FlatList
              data={reviews}
              style={{
                marginBottom: 8,
                marginHorizontal: 5,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={{marginVertical: 4}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 13,
                      marginTop: 3,
                      color: 'black',
                    }}>
                    {item.username}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    {[0, 0, 0, 0, 0].map((el, i) => (
                      <FontAwesome
                        style={{marginRight: 3}}
                        name={
                          i < Math.floor(item?.rating?.$numberDecimal)
                            ? 'star'
                            : 'star-o'
                        }
                        size={15}
                        color={'#fabe1b'}
                      />
                    ))}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                      marginTop: 3,
                    }}>
                    {item.review}
                  </Text>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </View>
        )}
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
        data={
          check ? data.famousplacedistance : pgDetails?.pg?.famousplacedistance
        }
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
        {check ? data.About : pgDetails?.pg?.About}
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
        data={check ? data.Rules : pgDetails?.pg?.Rules}
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
                {data.photos.length > 0
                  ? `${data.photos.length} Images`
                  : '1 Image'}
              </Text>
              <FlatList
                data={data.photos}
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
                latitude: data?.lat?.$numberDecimal,
                longitude: data?.lng?.$numberDecimal,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}>
              <Marker
                title={data?.propertytitle}
                coordinate={{
                  latitude: data?.lat?.$numberDecimal,
                  longitude: data?.lng?.$numberDecimal,
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

export default PgDetailScreen;
