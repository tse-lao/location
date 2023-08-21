import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SelectRoute = ({ onRouteSelect }: { onRouteSelect: any }) => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const routes = [
    { name: "Route 1", value: 0 },
    { name: "Route 2", value: 1 },
    { name: "Route 3", value: 2 },
  ];

  const handleRouteSelect = (routeName: any) => {
    setSelectedRoute(routeName);
    onRouteSelect(routeName);
    setDropDown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDropDown(!dropDown)}>
        <Text style={styles.title}>Route {selectedRoute}</Text>
      </TouchableOpacity>
      {dropDown && (
        <ScrollView style={styles.dropdown}>
          {routes.map((route, index) => (
            <Text
              key={index}
              style={[
                styles.routeItem,
                selectedRoute === route.name && styles.selectedRouteItem,
              ]}
              onPress={() => handleRouteSelect(route.value)}
            >
              {route.name}
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: "35%",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    height: 150,
    paddingVertical: 8,
  },
  routeItem: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedRouteItem: {
    backgroundColor: "#e6e6e6",
  },
  selectedRoute: {
    marginTop: 20,
  },
});

export default SelectRoute;
