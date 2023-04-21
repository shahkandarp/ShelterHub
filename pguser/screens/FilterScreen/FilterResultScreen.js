import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import NearByPgComponents from '../../components/HomeScreenComponent/NearByPgComponents';
import FilterResultComponent from './FilterResultComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from '@env';
const FilterResultScreen = () => {
  const route = useRoute();
  const data = route?.params.data;
  // var arr = data.pg.address;
  // var arr1 = arr.split('/');
  //   console.log('data:', data['pg']);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {data.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          <FontAwesome5 name="filter" size={13} color={PRIMARY_COLOR} />
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Poppins-Medium',
              fontSize: 15,
              marginHorizontal: 5,
              marginTop: 3,
            }}>
            Filtered PGs/Hostels,
          </Text>
        </View>
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          style={{marginBottom: 60, marginTop: 5}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FilterResultComponent data={item} />}
          keyExtractor={item => item.name}
        />
      )}
      {data.length == 0 && (
        <View>
          <Image
            source={require('../../data/cartEmpty.jpg')}
            style={{
              height: 230,
              width: 230,
              alignSelf: 'center',
              marginTop: 100,
            }}
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
            No Such PGs/Hostel found
          </Text>
        </View>
      )}
    </View>
  );
};

export default FilterResultScreen;
