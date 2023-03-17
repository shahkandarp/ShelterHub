import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';

const ImageCarousel = ({data}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <Image
        source={{uri: data.uri}}
        style={{
          width: 230,
          height: 145,
          borderRadius: 15,
          marginTop: 5,
          marginLeft: 20,
        }}
      />
    </View>
  );
};

export default ImageCarousel;
