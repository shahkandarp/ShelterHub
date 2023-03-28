import React, {useRef, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
// import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {USER_IP} from '@env';
import ImageCarouselComponent from '../../components/HomeScreenComponent/ImageCarouselComponent';
// import ImageCarouselData from '../../data/ImageCarouselData';
// import {ScrollView} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel = ({featured}) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  // console.log(featured);
  return (
    <View style={{height: 210, marginTop: 3}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
          }}>
          Popular areas, we're present in...
        </Text>
      </View>
      {/* <View style={styles.container}>
        <ScrollView
          style={{paddingHorizontal: 7}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          <View style={{}}>
            <Image
              source={require('../../data/hotel4.jpg')}
              style={{
                width: 228,
                height: 131,
                borderRadius: 10,
                marginHorizontal: 6,
                borderWidth: 1,
                // borderColor: '#c2c2c2',
              }}
            />
          </View>
          <Image
            source={require('../../data/hotel5.jpg')}
            style={{
              width: 228,
              height: 131,
              borderRadius: 10,
              marginHorizontal: 6,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
          <Image
            source={require('../../data/hotel3.jpg')}
            style={{
              width: 228,
              height: 131,
              borderRadius: 10,
              marginHorizontal: 6,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
          <Image
            source={require('../../data/hotel1.jpg')}
            style={{
              width: 228,
              height: 131,
              borderRadius: 10,
              marginHorizontal: 6,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
          <Image
            source={require('../../data/oyo3.jpg')}
            style={{
              width: 228,
              height: 131,
              borderRadius: 10,
              marginHorizontal: 6,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
        </ScrollView>
      </View> */}
      {/* <FlatList
        data={featured}
        horizontal
        style={{marginBottom: 20, marginTop: 5}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ImageCarouselComponent famous={item} />}
        keyExtractor={item => item.name}
      /> */}
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={featured}
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={Math.ceil(5)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 3}}
          renderItem={({item}) => <ImageCarouselComponent famous={item} />}
          keyExtractor={item => item.name}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 160,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
