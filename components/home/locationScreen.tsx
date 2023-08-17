import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";



export default function LocationScreen() {
  return (

      <View className="rounded-md bg-white flex flex-row p-3 m-4" >
            <View className="flex-1  gap-2 p-4">
                <Text style={styles.locationTitle}>Find assets around you</Text>
                <View className="px-4 py-2 font-sm rounded-md font-bold bg-green-300">
                    <Link href="/(tabs)/maps" >
                    Explore
                    </Link>
                    
                </View>
            </View>
            <View className="flex-1">
                <Text>Here will be an image placed</Text>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({

  
  
  locationBox: {
    backgroundColor: "white",
    height: 100,  
    borderRadius: 8,
    padding: 12,
    display: "flex",
    flexDirection: "row",
  },
  exploreButton: {
    borderRadius: 12, 
    fontSize: 12, 
  }, 
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    },
    
    rowItem: {
        flex: 1, 
        padding: 1, 
    },
   

});
