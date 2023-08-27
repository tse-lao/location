import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function WeatherScreen() {

  return (

    <View style={styles.container}>
        <IconButton icon="face-man-profile" iconColor='#87eeab' onPress={() => {router.push("/profile")}} size={24}  />
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        gap: 10,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 12, 
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'column',
    },
  });
  
  