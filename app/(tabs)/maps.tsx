import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';





export default function BillBoardMap() {
    const [billboards, setBillboards] = useState<any[]>([]);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [initRegion, setInitRegion] = useState({
        latitude: 52.5,
        longitude: 19.2,
        latitudeDelta: 20.5,
        longitudeDelta: 20.5,
    });

    useEffect(() => {
       
        
        async function fetchBillboards() {
            const result = await fetch('https://random-data-api.com/api/v2/addresses', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
              /*   body: JSON.stringify({
                    "query": "query Location { adspaces {name, width, height, location {address lat lon}}}"
                }) */
            })

            const response = await result.json()
            console.log(response)
            setBillboards([response])
        }
        
        fetchBillboards()
    }, []);


    if (billboards.length === 0) {
        return (
            <View>
                <Text>Nothing to be found</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <MapView initialRegion={initRegion} style={{ flex: 1 }}>
                {billboards.map((billboard) => (
                    <Marker
                        key="1"
                        coordinate={{
                            latitude: billboard.latitude,
                            longitude: billboard.longtitude,
                        }}
                        title={billboard.city}
                        description={billboard.full_address}
                    />
                ))}
            </MapView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    clusterContainer: {
        backgroundColor: '#6200EE',
        borderRadius: 16,
        padding: 8,
    },
    clusterText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});
