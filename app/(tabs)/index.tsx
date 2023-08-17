import { StyleSheet, View } from "react-native";

import InteractionSection from "../../components/home/interactionSection";
import LocationScreen from "../../components/home/locationScreen";
import ProfileSection from "../../components/home/profileSection";
import WalletScreen from "../../components/home/walletScreen";
import WeatherScreen from "../../components/home/weatherScreen";
import { useAuth } from "../context/auth";


export default function TabOneScreen() {
  const { user } = useAuth() as any;
  return (
    <View style={styles.container}>
      <ProfileSection />

      <View style={styles.gridDisplay}>
        <InteractionSection />
        <View className="flex-1">
          <WalletScreen />
          <WeatherScreen />
        </View>
        
       
      </View>
      <LocationScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    gap: 10,
  },
  headerTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
  },
  gridDisplay: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 8,
    gap: 24,
    marginHorizontal: 16,
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  
  
  locationBox: {
    backgroundColor: "white",
    height: 100,  
    borderRadius: 8,
    padding: 12,
  },
   
  columnDisplay: {
    display: "flex",
    flex: 1, 
    flexDirection: "column",
    backgroundColor: "transparent",
    gap: 8, 
  }, 
  subText: {
    fontSize: 12,
    color: "grey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemBox: {
    backgroundColor: "white",
    flex: 1, 
    padding: 12,
    borderRadius: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
