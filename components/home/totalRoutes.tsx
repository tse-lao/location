import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function RoutesScreen() {

  return (
    <View style={styles.container}>
        <IconButton icon="map" size={32} iconColor='#87eeab' onPress={() => {router.push("/routes")}} />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        gap: 10,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 12, 
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'column',
    },
  });
  
  