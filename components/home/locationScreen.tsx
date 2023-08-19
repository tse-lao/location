import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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
      <View style={styles.rowItem}>
        <Text>Here will be an image placed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    margin: 4,
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
    backgroundColor: "#4CAF50", // Rough equivalent for bg-green-300 from TailwindCSS
    borderRadius: 8,
  },
  exploreButton: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center", // To center the text inside the Link
  },
});
