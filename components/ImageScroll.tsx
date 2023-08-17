import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ImageScroll({ images, onAddImage, deleteImage }: { images: string[], onAddImage: () => void, deleteImage: (index: number) => void }){
    const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <ScrollView horizontal  style={isFullscreen ? styles.fullscreenContainer : styles.container}  contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.addButton} onPress={onAddImage}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      {images.map((image, index) => (
        <View style={styles.imageContainer} key={index}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(index)}>
                <Ionicons name="ios-trash" size={24} color="white" />
            </TouchableOpacity>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 5,

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


