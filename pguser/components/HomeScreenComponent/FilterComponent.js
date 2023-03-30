import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const FilterComponent = ({data}) => {
  // console.log(data);
  const navigation = useNavigation();
  const onPress = () => {
    // navigation.navigate('PgDetailScreen', {data: data.pg});
    if (data.pg.typeofpg == 'MESS') {
      navigation.navigate('PgDetailScreen', {
        data: data.pg,
        mess: true,
      });
    } else {
      navigation.navigate('PgDetailScreen', {data: data.pg});
    }
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
          source={{uri: data?.pg.photos[0]?.uri}}
          style={{height: 66, width: 66, borderRadius: 13}}
        />
      </View>
      {/* <View
        style={{
          backgroundColor: '#0bc908',
          paddingHorizontal: 4,
          paddingTop: 2,
          position: 'absolute',
          borderRadius: 3,
          top: '2%',
          left: '5%',
          alignItems: 'center',
          opacity: data.isWIFI ? 1 : 0,
          // opacity: 0,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Medium',
            fontSize: 9,
          }}>
          WIFI Rooms
        </Text>
      </View> */}
      <View
        style={{
          flex: 4,
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
          {/* <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'grey',
              fontSize: 11,
              marginLeft: 15,
            }}>
            {data?.views} views
          </Text> */}
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //   marginBottom: 3,
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
              // color={dish.isAvailable ? '#fabe1b' : 'grey'}
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
              // marginLeft: 25,
            }}>
            {data?.pg.views} views
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
    </TouchableOpacity>
  );
};

export default FilterComponent;
