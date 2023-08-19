import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function InteractionSection() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Connects</Text>
        <Text style={styles.subHeader}>Last 2w ago</Text>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.listText}>
                Here will be a list of connects
            </Text>
            <Text style={styles.listText}>
                Here will be a list of connects
            </Text>
            <Text style={styles.listText}>
                Here will be a list of connects
            </Text>
            <Text style={styles.listText}>
                Here will be a list of connects
            </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 4, // adjusted value to be more suitable for React Native
    padding: 3,
    flex: 2
  },
  header: {
    fontWeight: '500',  // medium font weight
    fontSize: 16        // large text size
  },
  subHeader: {
    fontSize: 14,       // small text size
    color: 'gray'       // gray text color
  },
  scrollView: {
    height: 200,
    marginTop: 4
  },
  listText: {
    // styles for the list of connects
    // Note: divide-y-8 (from TailwindCSS) isn't directly translatable to React Native. 
    // You would typically use borderBottomWidth or a separate View to create divisions.
    borderBottomWidth: 1,  // example of how you might translate divide-y
    borderColor: 'gray'    // using gray as the border color
  }
});
