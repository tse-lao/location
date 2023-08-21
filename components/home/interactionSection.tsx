import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

export default function InteractionSection() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="titleMedium">Interactions</Text>
        <ScrollView style={styles.scrollView}>
        <List.Item
          title="First Item"
          description="Item description"
          left={props => <List.Icon {...props} icon="billboard" />}
        />
        <List.Item
          title="First Item"
          description="Item description"
          left={props => <List.Icon {...props} icon="shopping" />}
        />
        <List.Item
          title="First Item"
          description="Item description"
          left={props => <List.Icon {...props} icon="party-popper" />}
        />
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
    flex: 2,
  },
  content: {
    padding: 8
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
    height: 300,
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
