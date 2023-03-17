import {View, Text, FlatList} from 'react-native';
import React from 'react';
import NearByPgComponents from './NearByPgComponents';
const NearByPgComponent = ({data, check}) => {
  return (
    <View style={{}}>
      {!check && (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#191919',
            fontSize: 13,
            marginHorizontal: 15,
          }}>
          PGs/Hostels near by you...
        </Text>
      )}
      <FlatList
        data={data}
        style={{marginBottom: 60, marginTop: 5}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <NearByPgComponents data={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default NearByPgComponent;
