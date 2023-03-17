import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';

const ImageComponent = ({image, modal}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <Image
        source={{uri: image?.uri}}
        style={{
          width: modal ? width - 30 : 65,
          height: modal ? 190 : 45,
          borderRadius: 5,
          marginRight: 20,
          marginVertical: modal ? 10 : 0,
        }}
      />
      {/* <Text>{image.name}</Text> */}
    </View>
  );
};

export default ImageComponent;
