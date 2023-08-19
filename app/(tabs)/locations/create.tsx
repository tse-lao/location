
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  Button,
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

import { RlyMumbaiNetwork, getAccountPhrase } from '@rly-network/mobile-sdk';
import { GsnTransactionDetails } from "@rly-network/mobile-sdk/lib/typescript/gsnClient/utils";
import { Contract, Wallet, ethers, toBeHex } from "ethers";
import contractAbi from '../../../assets/abi/billboard.json';
import ImageScroll from "../../../components/ImageScroll";
import { useAuth } from '../../context/auth';

export default function CreateBillboard() {
  const [address, setAddress] = useState<any>("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {address: account} = useAuth();
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
  
  //adding in the ethers expect of calling and interacting with the contract
  const registerBillboardOnChain =  async () => {
    setLoading(true)
    const providerUrl = `https://polygon-mumbai.infura.io/v3/b382bdce42b544aeafc6fee8c036510f`;
    //get web3 provider
    
    const provider = new ethers.JsonRpcProvider(providerUrl)


    const blocknumber = await provider.getBlockNumber()
    console.log("blocknumber:" + blocknumber)
    console.log("provider fiund")
    //get instance of your contract 
    const CONTRACT = "0x5fFe83913BAB6e69cc48558BF1f68d720a4eDCe4"
    
    //
    //@ts-ignore
    const mnemonic = await getAccountPhrase() as any;


      const wallet = Wallet.fromPhrase(mnemonic) as any;
      
    console.log(wallet);
    
    const signer = wallet.connect(provider)
    console.log(signer)
    
    //get the signer direct;y 

    const myContract =  new Contract(CONTRACT, contractAbi, signer);
    

    
    console.log("contract found")
    
    //populate raw transaction object
    
    const longtitude = 0;
    const latitude = 0;
    const ipfsHash = "";
    
    //@ts-ignore

    const tx = await myContract.registerBillboard.populateTransaction(
      longtitude,
      latitude, 
        ipfsHash
      );
      
      console.log(tx)
      

      
      //@ts-ignore
      const gas = await myContract.registerBillboard.estimateGas(
        longtitude,
        latitude, 
        ipfsHash);

        console.log(gas)
    // get current network fee data
      const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();
      
      console.log(maxFeePerGas)
      console.log(maxPriorityFeePerGas)
      console.log(gas)
      
      console.log("fee data found")
    
    //create relay tx object
    
    //singer 
    


      const gsnTx = {
        from: signer.address,
        data: tx.data,
        to: tx.to,
        gas: toBeHex(gas),
        //@ts-ignore
        maxFeePerGas: toBeHex(maxFeePerGas), 
        //@ts-ignore
        maxPriorityFeePerGas: toBeHex(maxPriorityFeePerGas),
      } as GsnTransactionDetails;
    
      console.log(gsnTx)
    // relay transaction 
    console.log("relay transaction")
    try{
      //@ts-ignore
      
      const rlyNetwork: Network = RlyMumbaiNetwork;

      rlyNetwork.setApiKey("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjEwMX0.h1avIemeKU-1Xbjp7nkdhF1-59C6jY4Im3GBiQa6OP0F3v3j-8fVQI2Fbu703H5mSYX52sGCAg8VcpCfjY5zLg")
      await rlyNetwork.relay(gsnTx);

    }catch(e){
      console.log(e)
    }
    
    
    console.log("finished transaction")
    setLoading(false)
    
  }
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
        
        <Marker coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                            draggable
                            onDragEnd={(e) => { changeLocation(e.nativeEvent.coordinate) }}
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
            
            <Button 
          title={loading ? "loading..." : "Register Billboard"}
          onPress={registerBillboardOnChain}
          disabled={loading}
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
