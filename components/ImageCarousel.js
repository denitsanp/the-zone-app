import React, { useState, useEffect, useRef } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { styles } from '../styles/styles';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';


const Pagination = ({ index, total }) => {
  let dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      <View
        key={i}
        style={{
          height: 8,
          width: 8,
          borderRadius: 4,
          backgroundColor: i === index ? 'indigo' : 'lavender',
          margin: 4,
        }}
      />
    );
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {dots}
    </View>
  );
};


const ImageCarousel = ({ images, autoPlay }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.9;
  const scrollX = useSharedValue(0);
  const isAutoPlay = useRef(autoPlay);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onEndDrag: () => {
      runOnJS(setAutoPlay)(true);
    },
  });

  const setAutoPlay = (value) => {
    isAutoPlay.current = value;
  };

  useEffect(() => {
    if (isAutoPlay.current) {
      const timer = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        setCurrentIndex(nextIndex);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [currentIndex, images.length, width]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.9, 1, 0.9],
              'clamp'
            );
            
            return {
              transform: [
            { scale },
            {translateY: -30}, 
            ],
            };
          });

          return (
            <View key={index} style={{ width: width, height: SIZE }}>
              <Animated.View style={[styles.imageContainer, animatedStyle, styles.shadowStyles]}>
              <Image 
                source={item.image} 
                style={styles.image}
              />
            </Animated.View>
            <Pagination index={currentIndex} total={images.length} />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ImageCarousel;

