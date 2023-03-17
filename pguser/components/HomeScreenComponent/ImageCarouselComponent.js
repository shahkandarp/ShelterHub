import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ImageCarouselComponent = ({famous}) => {
  // console.log('famous:', famous);
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('FilteredPgScreen', {city: famous.name});
  };
  return (
    <Pressable style={{marginLeft: 16, alignItems: 'center'}} onPress={onPress}>
      <Image
        source={{uri: famous?.image}}
        style={{height: 55, width: 55, borderRadius: 27.5}}
      />
      <Text
        numberOfLines={1}
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 11,
          color: '#191919',
          marginTop: 8,
          maxWidth: 70,
        }}>
        {famous.name}
      </Text>
    </Pressable>
  );
};

export default ImageCarouselComponent;
