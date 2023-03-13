import {View, Text, Image} from 'react-native';
import React from 'react';

const ImageCarouselComponent = ({famous}) => {
  return (
    <View style={{marginLeft: 16, alignItems: 'center'}}>
      <Image
        source={{uri: famous.photos[0].url}}
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
        {famous.propertytitle}
      </Text>
    </View>
  );
};

export default ImageCarouselComponent;
