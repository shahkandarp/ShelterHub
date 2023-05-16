import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ImageCarousel from './ImageCarousel';
import {PRIMARY_COLOR, USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import axios from 'axios';
const RoomComponent = ({datas, data2, check}) => {
  const width = Dimensions.get('window').width;
  const {tokens, users} = useAuthContext();
  const [show, setShow] = useState(false);
  // console.log(data2);
  const navigation = useNavigation();
  const onPress = () => {
    setModal(true);
  };
  const showInterest = async () => {
    const response = await axios.post(
      `http://${USER_IP}/api/v1/user/${users}/interest`,
      {room: datas._id},
      {
        headers: {Authorization: `Bearer ${tokens}`},
      },
    );
    // console.log(response.data.data);
    setShow(true);
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
  const [modal, setModal] = useState(false);
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color: '#191919',
            }}>
            {datas.title}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              color: '#454545',
              marginTop: 4,
            }}>
            Rs. {datas?.price?.$numberDecimal}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 3,
            }}>
            {datas?.isAttatched && <FontAwesome5 name="toilet" size={9} />}
            {datas?.isAC && (
              <MaterialCommunityIcons
                name="air-conditioner"
                size={10}
                style={{marginLeft: datas.isAttatched ? 12 : 0}}
              />
            )}
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-Regular',
                marginTop: 3,
                marginLeft: datas.isAC ? 12 : 0,
              }}>
              {datas.occupancy}
            </Text>
            <Ionicons name="person" size={11} style={{marginLeft: 2}} />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
          <Image
            source={{uri: datas?.photos[0]?.uri}}
            style={{height: 70, width: 70, borderRadius: 10}}
          />
        </View>
      </Pressable>
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{flex: 1, backgroundColor: '#000000aa'}}>
          <View style={{height: check ? 150 : 100, alignItems: 'center'}}>
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
                marginTop: check ? 50 : 30,
              }}>
              <Entypo name="cross" size={21} color={'#000000'} />
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: '#ffffff',
              height: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#101010',
                fontSize: 16,
                marginHorizontal: 13,
                marginTop: 13,
              }}>
              Room Details
            </Text>
            <View>
              <FlatList
                data={datas?.photos}
                horizontal
                style={{marginTop: 2, marginBottom: 8}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <ImageCarousel data={item} />}
                keyExtractor={item => item.url}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <View style={{flex: 3}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#101010',
                    fontSize: 16,
                    marginHorizontal: 13,
                  }}>
                  {datas?.title}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    // marginHorizontal: 24,
                    fontFamily: 'Poppins-Medium',
                    color: PRIMARY_COLOR,
                    fontSize: 13,
                  }}>
                  Rs.{datas?.price?.$numberDecimal}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginHorizontal: 13,
                fontFamily: 'Poppins-Medium',
                color: '#101010',
                fontSize: 14,
                marginTop: 5,
              }}>
              About
            </Text>
            <Text
              style={{
                marginHorizontal: 12,
                fontFamily: 'Poppins-Regular',
                color: 'grey',
                fontSize: 12,
              }}>
              {datas?.About}
            </Text>
            <Text
              style={{
                marginHorizontal: 13,
                fontFamily: 'Poppins-Medium',
                color: '#101010',
                fontSize: 14,
                marginTop: 10,
              }}>
              Amenities
            </Text>
            {datas?.isAttatched && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <FontAwesome5
                  name="toilet"
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
                  Attached Bathroom
                </Text>
              </View>
            )}
            {datas?.isAC && (
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
                  AC Room
                </Text>
              </View>
            )}
            {data2.isWIFI && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Ionicons
                name="person"
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
                {datas.occupancy} Person
              </Text>
            </View>
            {data2.isHotWater && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
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
            {data2.isCooler && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
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
            {show && (
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
                  Name: {data2.name}
                </Text>
                <Text
                  style={{
                    marginHorizontal: 13,
                    fontFamily: 'Poppins-Regular',
                    color: '#101010',
                    fontSize: 11,
                    marginTop: 3,
                  }}>
                  Email: {data2.email}
                </Text>
                <Text
                  style={{
                    marginHorizontal: 13,
                    fontFamily: 'Poppins-Regular',
                    color: '#101010',
                    fontSize: 11,
                    marginTop: 3,
                  }}>
                  Phone No: {data2.phoneno}
                </Text>
              </View>
            )}
            {!check && !show && (
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
            )}
            {!show && (
              <Text
                style={{
                  marginHorizontal: 13,
                  fontFamily: 'Poppins-Regular',
                  color: '#101010',
                  fontSize: 11,
                  marginTop: 3,
                  marginBottom: 30,
                }}>
                *Note: You have to Show Interest, to get Owner details
              </Text>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default RoomComponent;
