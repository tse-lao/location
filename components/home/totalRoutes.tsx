import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function RoutesScreen() {

  return (
    <View style={styles.container}>
        <IconButton icon="map" size={32} onPress={() => {router.push("/routes")}} />
        <Text>
            23
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        gap: 10,
        borderRadius: 8,
        paddingHorizontal: 24,
        marginTop: 12, 
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'column',
    },
  });
  
  