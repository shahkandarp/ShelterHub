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
// import ImageCarouselData from '../../data/ImageCarouselData';
// import {ScrollView} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  return (
    <View style={{height: 200, marginTop: 8}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
          }}>
          Featured Hostels
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          style={{paddingHorizontal: 7}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          <View style={{}}>
            <Image
              source={require('../../data/carousel1.jpg')}
              style={{
                width: 250,
                height: 150,
                borderRadius: 10,
                marginHorizontal: 10,
                borderWidth: 1,
                // borderColor: '#c2c2c2',
              }}
            />
          </View>
          <Image
            source={require('../../data/carousel3.jpg')}
            style={{
              width: 250,
              height: 150,
              borderRadius: 10,
              marginHorizontal: 10,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
          <Image
            source={require('../../data/carousel2.png')}
            style={{
              width: 250,
              height: 150,
              borderRadius: 10,
              marginHorizontal: 10,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
          <Image
            source={require('../../data/carousel4.png')}
            style={{
              width: 250,
              height: 150,
              borderRadius: 10,
              marginHorizontal: 10,
              borderWidth: 1,
              // borderColor: '#c2c2c2',
            }}
          />
        </ScrollView>
      </View>
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
