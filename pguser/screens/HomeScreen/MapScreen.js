import {View, Text, useWindowDimensions} from 'react-native';
import React, {useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';

const MapScreen = () => {
  // const mapRef = useRef();
  const route = useRoute();
  const data = route?.params?.data;
  console.log(data);
  const {width, height} = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
      <MapView
        // ref={mapRef}
        provider={PROVIDER_GOOGLE}
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
  );
};

export default MapScreen;
