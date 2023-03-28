import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryDetailScreen from '../../screens/HistoryScreen/HistoryDetailScreen';
import {useNavigation} from '@react-navigation/native';
import {PRIMARY_COLOR, USER_IP} from '@env';
import {useAuthContext} from '../../src/Context/AuthContext';
import axios from 'axios';
const HistoryComponent = ({data}) => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const {users, tokens} = useAuthContext();
  const onPress = () => {
    navigation.navigate('HistoryDetailScreen', {data: data});
  };
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [comment, setComment] = useState('');

  const star1Pressed = () => {
    setStar1(true);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const star2Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const star3Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(false);
    setStar5(false);
  };
  const star4Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(false);
  };
  const star5Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(true);
  };
  const onClick = async () => {
    let star;
    if (star5) {
      star = 5;
    } else if (star4) {
      star = 4;
    } else if (star3) {
      star = 3;
    } else if (star2) {
      star = 2;
    } else if (star1) {
      star = 1;
    }
    if (star >= 1) {
      // console.log(users);
      const response = await axios.post(
        `http://${USER_IP}/api/v1/user/${users}/pg/${data.pg._id}/rating`,
        {rating: star, review: comment},
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      // console.log(response.data.res);
      if (response.data.res == 'failed') {
        Alert.alert('User has already rated in this Property.');
        setModal(!modal);
      }
      setModal(!modal);
      showToastWithGravityAndOffset();
    }
    setModal(!modal);
    setStar1(false);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Rating and Review submitted successfully!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          source={{uri: data.pg?.photos[0]?.uri}}
          style={{height: 66, width: 66, borderRadius: 13}}
        />
      </View>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 10,
          //   paddingTop: 5,
          //   backgroundColor: 'green',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#191919',
            fontSize: 12,
          }}>
          {data.pg.propertytitle}
        </Text>
        <View
          style={{
            //   justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              //   maxWidth: 160,
              fontFamily: 'Poppins-Regular',
              color: 'gray',
              fontSize: 10,
            }}>
            {data.pg.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <FontAwesome
              style={{marginHorizontal: 0.5}}
              name={
                i < Math.floor(data.pg.ratings.$numberDecimal)
                  ? 'star'
                  : 'star-o'
              }
              size={11}
              color={'#fabe1b'}
            />
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 2,
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
                {data.pg.ratings.$numberDecimal}
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
                ({data.pg.noofraters})
              </Text>
            </View>
          </View>
        </View>
        {/* </View> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'grey',
              fontSize: 10,
            }}>
            {data.pg?.views} views
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            {data.pg.isWIFI && <FontAwesome5 name="wifi" size={9} />}
            {data.pg.isAC && (
              <MaterialCommunityIcons
                name="air-conditioner"
                size={10}
                style={{marginLeft: 10}}
              />
            )}
            {data.pg.isHotWater && (
              <FontAwesome5 name="hot-tub" size={10} style={{marginLeft: 10}} />
            )}
          </View>
        </View>
      </View>
      <Pressable
        style={{alignItems: 'center', flex: 1}}
        onPress={() => setModal(true)}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 11,
            color: PRIMARY_COLOR,
          }}>
          Rate
        </Text>
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}>
        <View style={{flex: 1}}>
          <Pressable
            style={{
              flex: 1,
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
          <View
            style={{
              height: '70%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <View
              style={{
                margin: 20,
                height: '90%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                }}>
                Rate
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Pressable onPress={star1Pressed}>
                  <FontAwesome
                    name={star1 ? 'star' : 'star-o'}
                    size={30}
                    color={star1 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star2Pressed}>
                  <FontAwesome
                    name={star2 ? 'star' : 'star-o'}
                    size={30}
                    color={star2 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star3Pressed}>
                  <FontAwesome
                    name={star3 ? 'star' : 'star-o'}
                    size={30}
                    color={star3 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star4Pressed}>
                  <FontAwesome
                    name={star4 ? 'star' : 'star-o'}
                    size={30}
                    color={star4 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star5Pressed}>
                  <FontAwesome
                    name={star5 ? 'star' : 'star-o'}
                    size={30}
                    color={star5 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
              </View>
              <TextInput
                onChangeText={setComment}
                placeholderTextColor="grey"
                placeholder="Comment"
                value={comment}
                style={{
                  height: 40,
                  width: 260,
                  marginLeft: 4,
                  // flex: 1,
                  borderBottomWidth: 1,
                  borderColor: '#d1cfcf',
                  marginTop: 10,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingBottom: 9,
                  fontSize: 13,
                  fontFamily: 'Poppins-Medium',
                  color: '#212121',
                  marginBottom: 10,
                }}
              />
              <Pressable
                onPress={onClick}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  padding: 10,
                  borderRadius: 6,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Fredoka-Regular',
                    fontSize: 16,
                  }}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{
              flex: 1,
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default HistoryComponent;
