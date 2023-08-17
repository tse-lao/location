import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageScroll from "../../../components/ImageScroll";

export default function CreateBillboard() {
  const [address, setAddress] = useState<any>("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [location, setLocation] = useState<any>({
    latitude: 0,
    longitude: 0,
    timestamp: 0,
  });

  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1636287304505-6b5acba3fd28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
  ]);

  const handleAddImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };
  const requestLocation = async () => {
    console.log("requesting permission");
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();

    console.log(foregroundStatus);
    if (foregroundStatus === "granted") {
      const getLoc: any = await Location.getLastKnownPositionAsync();

      console.log(getLoc);
      setLocation({
        latitude: getLoc.coords.latitude,
        longitude: getLoc.coords.longitude,
        timestamp: getLoc.timestamp,
      });
    }
  };
  const deleteImage = (index: number) => {
    const newImages = images.filter((image, i) => i !== index);
    setImages(newImages);
  };

  const findLocation = async (address: any) => {
    let locations: any[] = await Location.geocodeAsync(address);

    if (locations[0].accuracy > 50) {
      setLocation({
        latitude: locations[0].latitude,
        longitude: locations[0].longitude,
      });
    }
    console.log(locations);
  };

  const changeLocation = (newLocation: any) => {
    console.log(newLocation);

    //get current timestamp
    const timestamp = new Date().getTime();
    setLocation({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      timestamp: timestamp,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          draggable
          onDragEnd={(e) => {
            changeLocation(e.nativeEvent.coordinate);
          }}
        />
      </MapView>

      <View style={styles.searchBar}>
        <TouchableOpacity onPress={requestLocation}>
          <Text style={{ fontSize: 20 }}> + </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Search address.."
          style={styles.searchInput}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            findLocation(address);
          }}
        >
          <Text> → </Text>
        </TouchableOpacity>
      </View>

      {!modalVisible && (
        <View
          style={{
            position: "absolute",
            bottom: 50,
            left: "25%",
            width: "50%",
            zIndex: 2,
          }}
        >
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              {/* Add your fields here */}
              <TextInput placeholder="Field 1" style={styles.modalInput} />
              <TextInput placeholder="Field 2" style={styles.modalInput} />
              {/* Add more fields as required */}
            </ScrollView>
            <ImageScroll
              images={images}
              onAddImage={handleAddImage}
              deleteImage={deleteImage}
            />

            <TouchableOpacity
              style={{ ...styles.modalButton, backgroundColor: "#2196F3" }}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  preview: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  searchBar: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
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
  searchInput: {
    width: "80%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "50%",
  },
  modalView: {
    width: "80%",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
