import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function LocationScreen() {
  return (
    <View style={styles.locationBox}>
      <View style={styles.rowItem}>
        <Text style={styles.locationTitle}>Find assets around you</Text>
        <View style={styles.exploreButtonContainer}>
          <Link style={styles.exploreButton} href="/(tabs)/maps">
            Explore
          </Link>
        </View>
      </View>

      <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1552259693-c7deaece354c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2544&q=80' }}
      style={{ flex: 1, width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  locationBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    margin: 24,
    gap: 24,
  },
  rowItem: {
    flex: 1,
    padding: 4,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8, // gap equivalent
  },
  exploreButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#57cc99", // Rough equivalent for bg-green-300 from TailwindCSS
    borderRadius: 8,
    marginVertical: 12,
  },
  exploreButton: {
    fontSize: 12,
    color: "white",
    textAlign: "center", // To center the text inside the Link
  },
});
