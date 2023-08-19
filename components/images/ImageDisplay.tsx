import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ImageDisplay({ images }: { images: string[] }){
    const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <ScrollView horizontal style={isFullscreen ? styles.fullscreenContainer : styles.fullscreenContainer}  contentContainerStyle={isFullscreen ? styles.fullscreenContainer : styles.contentContainer}>
      {images.map((image, index) => (
        <TouchableOpacity 
        style={styles.imageContainer}

        
        key={index} onPress={() => setIsFullscreen(!isFullscreen)}>
          <Image source={{ uri: image }} style={isFullscreen ? styles.fullscreenImage : styles.image} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullscreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#000',
    zIndex: 10000,
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    margin: 5,
    width: 100,
    height: 100,
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});


