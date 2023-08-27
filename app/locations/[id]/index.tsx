import { router, useLocalSearchParams } from "expo-router";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { IconButton, List, SegmentedButtons } from "react-native-paper";
import Timebar from "../../../components/billboard/timeBar";
import ImageDisplay from "../../../components/images/ImageDisplay";
import LoadingScreen from "../../../components/loading/LoadingScreen";

export default function DetailBoard() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [value, setValue] = React.useState('ads');
  const [loading, setLoading] = React.useState(true);
  const [billboard, setBillboard] = React.useState<any>({});
  console.log(id);

  useEffect(() => {
    async function fetchBillboardDetail() {
      setLoading(true);
      const contract = "0xde7CE46b24936dfE294bBE4c6E3596Bc8Ee9dA81";
      try {
        const result = await fetch(`https://api.dataponte.com/billboard/details/${id}`);
        const response = await result.json();

        console.log("response", response);

          setBillboard(response);
          setLoading(false);
          

      } catch (error) {
        console.error("Error fetching billboards:", error);
      }
    }

    
   if(id){
    fetchBillboardDetail();
   }
  }, [id])
  
  //get ther start date as today at 0:00:000
  // and day tomorrowe at 0:00:000
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date().setHours(24, 0, 0, 0);
  

  const startDate = new Date("2023-08-26T00:00:00");
  const endDate = new Date("2023-08-27T00:00:00");

  //implement the ads logic in here aswel..
  
  
  let images = [
    "https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  ];

  if (loading) return <LoadingScreen />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingSection}>

          <IconButton icon="backburger" size={20} onPress={() => {router.replace("/maps")}} />

        <Text style={styles.itemTitle}>{billboard.name}</Text>
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
          latitude: billboard.location.lat,
          longitude: billboard.location.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: billboard.location.lat,
            longitude: billboard.location.long,
          }}
          title={billboard.name}
          description={billboard.name}
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
        <ScrollView>
        {images && <ImageDisplay images={images} />}
        <Timebar  />
      </ScrollView>
      )}
      
      {value === 'details' && (
        <View style={styles.details}>
        <Text style={styles.addressText}>{billboard.name}</Text>
        <Text style={styles.addressText}>{billboard.owner}</Text>
        <Text style={styles.addressText}>Total supply: {billboard.totalSupply}</Text>
        
        <Text style={styles.addressText}>
          Lat: {billboard.location.lat} | Long:{" "}
          {billboard.location.long}
        </Text>
      </View>
      )}
      {value === 'interaction' && (
        <ScrollView style={styles.details}>
         <List.Item 
         title="10 Oct 2023 16:00"
         description="0x2345 link ot image of add. "
         right={(props) => <Text> 0.0001 ETH</Text>}
       />
       <List.Item 
         title="10 Oct 2023 16:00"
         description="0x2345 link ot image of add. "
         right={(props) => <Text> 0.0001 ETH</Text>}
       />
       <List.Item 
         title="10 Oct 2023 16:00"
         description="0x2345 link ot image of add. "
         right={(props) => <Text> 0.0001 ETH</Text>}
       />
       <List.Item 
         title="10 Oct 2023 16:00"
         description="0x2345 link ot image of add. "
         right={(props) => <Text> 0.0001 ETH</Text>}
       />
       <List.Item 
         title="10 Oct 2023 16:00"
         description="0x2345 link ot image of add. "
         right={(props) => <Text> 0.0001 ETH</Text>}
       />
         
         <TouchableOpacity
         style={styles.interactionButton}
         onPress={() => alert("not uet implemented")}
       >
        
         <Text style={styles.interButtonText}>Show interactions</Text>
       </TouchableOpacity>
       </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
    padding: 16,
  },
  headingSection: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
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
    borderWidth: 1,
    borderColor: "#e0e0A0",
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
