import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import NearByPgComponents from './NearByPgComponents';
const NearByPgComponent = ({data, check}) => {
  // console.log('h:', data, check);
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
      {data.length > 0 && (
        <FlatList
          data={data}
          style={{marginBottom: 60, marginTop: 5}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <NearByPgComponents data={item} />}
          keyExtractor={item => item.name}
        />
      )}
      {data.length == 0 && (
        <View style={{marginTop: 10, marginBottom: 100}}>
          <Image
            source={require('../../data/cartEmpty.jpg')}
            style={{height: 230, width: 230, alignSelf: 'center'}}
            resizeMode={'contain'}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              color: '#191919',
              fontSize: 15,
              // marginTop: 12,
            }}>
            Sorry, No PGs/Hostels in your area...
          </Text>
        </View>
      )}
    </View>
  );
};

export default NearByPgComponent;
