import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { useAuth } from "../../app/context/auth";
import { getLighthouseKeys } from "../../service/lighthouse";

export default function InteractionSection() {
   const {user} = useAuth() as any;
   const [interactions, setInteractions] = useState<any[]>([]);

  useEffect(() => {
    if(user.address){
      //
      getInteractions();
    }
  }, [user.address]);
  
  const getInteractions = async () => {
    const { JWT, apiKey } = await getLighthouseKeys(user.address);

    if (!JWT || !apiKey) throw new Error("Failed to get Lighthouse keys");


    const contract ="0xde7CE46b24936dfE294bBE4c6E3596Bc8Ee9dA81"
    
    console.log(JWT);

    const baseUrl = "https://api.dataponte.com/interaction";
    //const url = `${baseUrl}/all/${user.address}/${CONTRACT}`;
    const url = `https://api.dataponte.com/interaction/all/${user.address}/${contract}`
    // Make the fetch request
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: JWT,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInteractions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="titleMedium">Interactions</Text>
        <ScrollView style={styles.scrollView}>
          { interactions.length > 0 &&
            interactions.map((interaction:any, index:number) => (
              <List.Item
              title={props => <Link href={`/locations/${interaction.billboard.billboardAddress}`}>{interaction.billboard.name}</Link>}
              description={`Total interactions at ${interaction.timestamp.length}`}
              left={props => <List.Icon {...props} icon="billboard" />}
            />
            ))}
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
    color: 'black',
  }
});
