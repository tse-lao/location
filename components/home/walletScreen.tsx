import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../../app/context/auth';

export default function WalletScreen() {
    const {user} = useAuth() as any;

  return (
    <View style={styles.container}>
      <IconButton icon="wallet" size={32} iconColor='#87eeab' onPress={() => {router.push('/profile/transactions')}} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        gap: 4,
        borderRadius: 8,
        paddingHorizontal:12,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'column',
    },
  });
  
  