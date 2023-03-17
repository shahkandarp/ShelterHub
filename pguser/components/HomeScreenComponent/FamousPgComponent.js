import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const FamousPgComponent = ({famous}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('PgDetailScreen', {data: famous});
  };
  return (
    <Pressable style={{marginLeft: 20, marginTop: 10}} onPress={onPress}>
      <View>
        <Image
          source={{uri: famous.photos[0]?.uri}}
          style={{height: 125, width: 170, borderRadius: 7}}
        />
      </View>
      <View
        style={{
          backgroundColor: '#0bc908',
          paddingHorizontal: 4,
          paddingTop: 2,
          position: 'absolute',
          borderRadius: 3,
          top: '4%',
          right: '47.5%',
          alignItems: 'center',
          opacity: famous.isAC ? 1 : 0,
          // opacity: 0,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Medium',
            fontSize: 9,
          }}>
          AC Rooms Available
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <FontAwesome
              style={{marginHorizontal: 0.5}}
              name={
                i < Math.floor(famous.ratings.$numberDecimal)
                  ? 'star'
                  : 'star-o'
              }
              size={11}
              // color={dish.isAvailable ? '#fabe1b' : 'grey'}
              color={'#fabe1b'}
            />
          ))}
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 2}}>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
            {famous.ratings.$numberDecimal}
          </Text>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
            ({famous.noofraters})
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#191919',
          fontSize: 12,
          maxWidth: 160,
        }}>
        {famous.propertytitle}
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
            maxWidth: 160,
            fontFamily: 'Poppins-Regular',
            color: 'gray',
            fontSize: 11,
          }}>
          {famous.cityname}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'grey',
            fontSize: 11,
            marginLeft: 15,
          }}>
          {famous?.views} views
        </Text>
      </View>
    </Pressable>
  );
};

export default FamousPgComponent;
