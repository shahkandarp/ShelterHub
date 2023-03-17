import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryDetailScreen from '../../screens/HistoryScreen/HistoryDetailScreen';
import {useNavigation} from '@react-navigation/native';
const HistoryComponent = ({data}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('HistoryDetailScreen', {data: data});
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
    </TouchableOpacity>
  );
};

export default HistoryComponent;
