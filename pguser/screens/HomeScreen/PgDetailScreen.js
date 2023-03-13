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
import React, {useState, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImageComponent from '../../components/HomeScreenComponent/ImageComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PgDetailScreen = () => {
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const {width, height} = useWindowDimensions();
  const route = useRoute();
  const data = route?.params?.data;
  const mapRef = useRef();
  const navigation = useNavigation();
  // console.log(data);
  const onPress = () => {
    setModal(true);
    // console.log('true');
  };
  const MapPressed = () => {
    setMapModal(true);
  };
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <ImageBackground
          source={{uri: data.photos[0].url}}
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
            style={{marginBottom: 20, marginTop: -20, alignSelf: 'center'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ImageComponent image={item} />}
            keyExtractor={item => item.url}
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
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: 'grey',
          fontSize: 11,
          marginHorizontal: 12,
        }}>
        {data.address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 12,
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
      <Pressable onPress={MapPressed}>
        <Text style={{color: 'black'}}>View on map</Text>
      </Pressable>
      <Text>Rooms available</Text>
      <Text>Rating bar</Text>
      <Text>What's nearby</Text>
      <Text>Amenities</Text>
      <Text>About us</Text>
      <Text>Rules</Text>
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
                latitude: data.lat.$numberDecimal,
                longitude: data.lng.$numberDecimal,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}>
              <Marker
                title={data.propertytitle}
                coordinate={{
                  latitude: data.lat.$numberDecimal,
                  longitude: data.lng.$numberDecimal,
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
