import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ImageCarouselComponent = ({famous}) => {
  // console.log('famous:', famous);
  const navigation = useNavigation();
  const onPress = () => {
    // console.log(famous.name);
    navigation.navigate('FilteredPgScreen', {city: famous.name});
  };
  return (
    <Pressable style={{marginLeft: 16, alignItems: 'center'}} onPress={onPress}>
      <Image
        source={{uri: famous?.image}}
        style={{height: 60, width: 60, borderRadius: 30, marginTop: 8}}
      />
      <Text
        numberOfLines={1}
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 11,
          color: '#191919',
          // marginTop: 8,
          marginTop: 3,
          width: 69,
          textAlign: 'center',
        }}>
        {famous.name}
      </Text>
    </Pressable>
  );
};

export default ImageCarouselComponent;
