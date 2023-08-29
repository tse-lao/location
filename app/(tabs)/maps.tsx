import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { List, SegmentedButtons, Text } from "react-native-paper";
import LoadingScreen from "../../components/loading/LoadingScreen";

export default function BillBoardMap() {
  const [billboards, setBillboards] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("map");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [initRegion, setInitRegion] = useState({
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 20.5,
    longitudeDelta: 20.5,
  });

  useEffect(() => {
    async function requestLocation() {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundStatus === "granted") {
        const getLoc = (await Location.getLastKnownPositionAsync()) as any;

        setLocation({
          latitude: getLoc.coords.latitude,
          longitude: getLoc.coords.longitude,
        });

        //NOTE: added this to position to location of initRegion in with the current location centered...
        setInitRegion({
          ...initRegion,
          longitude: getLoc.coords.longtitude,
          latitude: getLoc.coords.latitude,
        });
      }
    }
    requestLocation();
  }, []);

  useEffect(() => {
    async function fetchBillboards() {
      const contract = "0xde7CE46b24936dfE294bBE4c6E3596Bc8Ee9dA81";
      try {
        const result = await fetch(
          `https://api.dataponte.com/billboard/pending/${contract}`
        );
        const response = await result.json();

        console.log("response", response);
        if (Array.isArray(response) && response.length > 0) {
          setBillboards(response);

          //now we want the disttance here aswel
        }
      } catch (error) {
        console.error("Error fetching billboards:", error);
      }
    }

    fetchBillboards();
  }, []);

  useEffect(() => {
    if (location && billboards.length > 0) {
      addDistanceToMe(billboards);
    }
  }, [location, billboards]);

  const addDistanceToMe = (billies: any[]) => {
    const updateBillboards = billies.map((billboard) => {
      const distanceInKm = distance(
        location.latitude,
        location.longitude,
        billboard.coordinates.lat,
        billboard.coordinates.long
      );
      return {
        ...billboard,
        distance: distanceInKm,
      };
    });

    //@ts-ignore
    const sortedData = updateBillboards.sort((a, b) => a.distance - b.distance);
    setBillboards(sortedData);
  };

  //@ts-ignore
  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Distance in kilometers
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  if (billboards.length === 0) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 45,
          left: "25%",
          width: "50%",
          zIndex: 2,
        }}
      >
        <SegmentedButtons
          value={viewMode}
          onValueChange={setViewMode}
          buttons={[
            {
              value: "map",
              label: "Map",
            },
            {
              value: "list",
              label: "List",
            },
          ]}
        />
      </View>

      {viewMode === "map" ? (
        <MapView initialRegion={initRegion} style={{ flex: 1 }}>
          {billboards.map((billboard) => (
            <Marker
              key="1"
              coordinate={{
                latitude: billboard.coordinates.lat,
                longitude: billboard.coordinates.long, // Corrected here
              }}
              title={billboard.city}
              description={billboard.full_address}
            />
          ))}
        </MapView>
      ) : (
        <SafeAreaView style={{ flex: 1, margin: 20, gap: 10 }}>
          <ScrollView>
            {billboards.map((billboard: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.replace(`/locations/${billboard.billboardAddress}`)
                }
              >
                <List.Item
                  title={billboard.name}
                  style={styles.item}
                  description={`${billboard.owner}`}
                  left={(props) => (
                    <Image
                      source={{
                        uri:
                          "https://ipfs.io/ipfs/" +
                          billboard.adDetails.adContent
                            ? billboard.adDetails.adContent
                            : "bafkreihvqgz6vt5pqajpdi4pdguhfu4pf7owpy65c6kdfvck2pfbgi7vqm",
                      }}
                      style={styles.image}
                    />
                  )}
                  right={(props) => (
                    <Text {...props}> {billboard?.distance} km</Text>
                  )}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  clusterContainer: {
    backgroundColor: "#6200EE",
    borderRadius: 16,
    padding: 8,
  },
  clusterText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 8,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for shadow on iOS
    shadowRadius: 4, // for shadow on iOS
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  value: {
    fontWeight: "normal",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  itemInfo: {},
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 4,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  locationDetails: {
    fontSize: 12,
    color: "#888",
  },
  locationDistance: {
    fontSize: 16,
    color: "#1E90FF",
  },
});

{
  /* billboards.map((billboard) => (
            <View>
              <Text>{billboard.id}</Text>
              <Text>{billboard.creator}</Text>
              </View>
          )))} */
}
