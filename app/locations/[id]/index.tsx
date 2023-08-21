import { router, useLocalSearchParams } from "expo-router";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { IconButton, SegmentedButtons } from "react-native-paper";
import Timebar from "../../../components/billboard/timeBar";
import ImageDisplay from "../../../components/images/ImageDisplay";

export default function DetailBoard() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [value, setValue] = React.useState('ads');


  const startDate = new Date("2023-08-20T00:00:00");
  const endDate = new Date("2023-08-25T00:00:00");

  //implement the ads logic in here aswel..

  const item = {
    id: 1,
    distance: 0.5,
    name: "Billboard 1",
    location: {
      address: "ul. Kolejowa 5, 00-001 Warszawa",
      lat: 52.232222,
      lon: 21.008333,
    },
  };

  let images = [
    "https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1636287304505-6b5acba3fd28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingSection}>

          <IconButton icon="backburger" size={20} onPress={() => {router.replace("../maps")}} />

        <Text style={styles.itemTitle}>{item.name}</Text>
        <IconButton
          icon="alert-octagon-outline"
          iconColor="red"
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.location.lat,
          longitude: item.location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: item.location.lat,
            longitude: item.location.lon,
          }}
          title={item.name}
          description={item.location.address}
        />
      </MapView>
      
      <SegmentedButtons
      style={{marginHorizontal: 16, marginVertical: 8}}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'details',
            label: 'Details',
          },
          {
            value: 'ads',
            label: 'Ads',
          },
          { value: 'interaction', label: 'Interactions' },
        ]}
      />
      
      {value === 'ads' && (
        <View>
        {images && <ImageDisplay images={images} />}
        <Timebar startDate={startDate} endDate={endDate} />
      </View>
      )}
      
      {value === 'details' && (
        <View style={styles.details}>
        <Text style={styles.addressText}>{item.location.address}</Text>
        <Text style={styles.addressText}>
          Lat: {item.location.lat.toFixed(6)} | Long:{" "}
          {item.location.lon.toFixed(6)}
        </Text>
      </View>
      )}
      {value === 'interaction' && (
         <TouchableOpacity
         style={styles.interactionButton}
         onPress={() => alert("not uet implemented")}
       >
         <Text style={styles.interButtonText}>Show interactions</Text>
       </TouchableOpacity>
      )}
      
      

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headingSection: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 16,
  },
  distanceText: {
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 6,
    fontWeight: "700",
    color: "#4eb36d",
  },
  map: {
    width: "90%",
    height: 300,
    margin: 16,
    borderRadius: 16,
    border: "1px solid #e0e0e0",
  },
  interactionButton: {
    marginTop: 16,
    backgroundColor: "#4eb36d",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 24,
  },
  interButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
