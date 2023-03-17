import {View, Text} from 'react-native';
import React from 'react';

const RulesComponent = ({data}) => {
  return (
    <View>
      <Text
        style={{color: '#505050', fontFamily: 'Poppins-Regular', fontSize: 12}}>
        {data.text}
      </Text>
    </View>
  );
};

export default RulesComponent;
