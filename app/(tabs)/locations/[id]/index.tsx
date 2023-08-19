
import { useLocalSearchParams } from 'expo-router';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import ImageDisplay from '../../../../components/images/ImageDisplay';


export default function DetailBoard() {
  
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  
  const startDate = new Date('2023-04-20T00:00:00');
  const endDate = new Date('2023-04-25T00:00:00');
  
const item = {
  id: 1,
  distance: 0.5,
  name: 'Billboard 1',
  location: {
    address: 'ul. Kolejowa 5, 00-001 Warszawa',
    lat: 52.232222,
    lon: 21.008333,
  },
  
}


  let images =
    [
      'https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1636287304505-6b5acba3fd28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
    ]


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.distanceText}>{item.distance.toFixed(2)} km</Text>
      <MapView style={styles.map}
        initialRegion={{
          latitude: item.location.lat,
          longitude: item.location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: item.location.lat, longitude: item.location.lon }}
          title={item.name}
          description={item.location.address}
        />
      </MapView>
      <View style={styles.details}>
        <Text style={styles.addressText}>{item.location.address}</Text>
        <Text style={styles.addressText}>Lat: {item.location.lat.toFixed(6)} | Long: {item.location.lon.toFixed(6)}</Text>
      </View>
      <View>
       
        {images && <ImageDisplay images={images} />}
      </View>

      <TouchableOpacity style={styles.interactionButton}  onPress={() => alert("not uet implemented")} >
        <Text style={styles.interButtonText}>Show interactions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 80,
  },
  details: {
    padding: 16,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  distanceText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 6,
    fontWeight: '700',
    color: '#4eb36d',
  },
  map: {
    width: '100%',
    height: 300,
  },
  interactionButton: {
    marginTop: 16,
    backgroundColor: "#4eb36d",
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  interButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  }

});

