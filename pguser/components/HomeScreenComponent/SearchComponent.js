import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SearchComponent = ({searchResult}) => {
  const navigation = useNavigation();
  const onPress = () => {
    // console.log(searchResult);
    // navigation.navigate('PgDetailScreen', {data: searchResult});
    if (searchResult.typeofpg == 'MESS') {
      navigation.navigate('PgDetailScreen', {
        data: searchResult,
        mess: true,
      });
    } else {
      navigation.navigate('PgDetailScreen', {data: searchResult});
    }
  };
  // console.log(searchResult);
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 4,
        padding: 10,
        paddingHorizontal: 15,
      }}>
      <View>
        <Image
          source={{uri: searchResult.photos[0].uri}}
          style={{height: 48, width: 48, borderRadius: 22.5}}
        />
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            marginHorizontal: 8,
          }}>
          {searchResult.propertytitle}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: 'grey',
            fontFamily: 'Poppins-Regular',
            fontSize: 11,
            marginHorizontal: 8,
            maxWidth: 250,
          }}>
          {searchResult.address}
        </Text>
        <Text
          style={{
            color: 'grey',
            fontFamily: 'Poppins-Regular',
            fontSize: 11,
            marginHorizontal: 8,
            maxWidth: 250,
          }}>
          {searchResult.typeofpg}
        </Text>
      </View>
      {/* <Image
        source={{uri: dish.imageUrl}}
        style={{width: 40, height: 40, borderRadius: 20}}
      /> */}
    </Pressable>
  );
};

export default SearchComponent;
