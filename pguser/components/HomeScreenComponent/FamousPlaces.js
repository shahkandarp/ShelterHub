import {View, Text} from 'react-native';
import React from 'react';

const FamousPlaces = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 4,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{fontFamily: 'Poppins-Regular', fontSize: 12, color: '#191919'}}>
        {data?.name}
      </Text>
      <Text
        style={{fontFamily: 'Poppins-Regular', fontSize: 12, color: '#191919'}}>
        {data.distance.toFixed(2)} Km
      </Text>
    </View>
  );
};

export default FamousPlaces;
