import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
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
      }
    }
    requestLocation();
  }, []);

  useEffect(() => {
    async function fetchBillboards() {
      try {
        const result = await fetch("https://api.dataponte.com/billboard/all");
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
    addDistanceToMe(billboards);
  }, [location]);

  const addDistanceToMe = (billies: any[]) => {
    const updateBillboards = billies.map((billboard) => {
      const distanceInKm = distance(
        location.latitude,
        location.longitude,
        billboard.latitude,
        billboard.longitude
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
          bottom: 50,
          left: "25%",
          width: "50%",
          zIndex: 2,
        }}
      >
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() =>
            setViewMode((prevMode) => (prevMode === "map" ? "list" : "map"))
          }
        >
          <Text>{viewMode === "map" ? "List" : "Map"}</Text>
        </TouchableOpacity>
      </View>

      {viewMode === "map" ? (
        <MapView initialRegion={initRegion} style={{ flex: 1 }}>
          {billboards.map((billboard) => (
            <Marker
              key="1"
              coordinate={{
                latitude: billboard.latitude / 10000,
                longitude: billboard.longitude / 10000, // Corrected here
              }}
              title={billboard.city}
              description={billboard.full_address}
            />
          ))}
        </MapView>
      ) : (
        <SafeAreaView style={{ flex: 1, margin: 20, gap: 10 }}>
          {billboards.map((billboard) => (
            <TouchableOpacity
              onPress={() => router.replace(`/locations/${billboard.id}`)}
            >
              <View style={styles.item}>
                <View>
                  <Text style={styles.locationName}>{billboard.id}</Text>
                  <Text style={styles.locationDetails}>
                    Lat: {billboard.longitude}, Lng:{" "}
                    {billboard.latitude}
                  </Text>
                </View>
                <Text style={styles.locationDistance}>
                  {billboard.distance} km
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
