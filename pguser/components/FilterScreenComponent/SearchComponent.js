import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../src/Context/AuthContext';
const SearchComponent = ({searchResult}) => {
  const navigation = useNavigation();
  const {setCity} = useAuthContext();
  const onPress = () => {
    // console.log(searchResult.name);
    // navigation.navigate('PgDetailScreen', {data: searchResult});
    setCity(searchResult.name);
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
        padding: 15,
      }}>
      <View>
        <Image
          source={{uri: searchResult.image}}
          style={{height: 45, width: 45, borderRadius: 22.5}}
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
          {searchResult.name}
        </Text>
        {/* <Text
          numberOfLines={1}
          style={{
            color: 'grey',
            fontFamily: 'Poppins-Regular',
            fontSize: 11,
            marginHorizontal: 8,
            maxWidth: 250,
          }}>
          {searchResult.address}
        </Text> */}
      </View>
      {/* <Image
        source={{uri: dish.imageUrl}}
        style={{width: 40, height: 40, borderRadius: 20}}
      /> */}
    </Pressable>
  );
};

export default SearchComponent;
