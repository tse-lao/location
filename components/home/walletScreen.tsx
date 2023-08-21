import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../../app/context/auth';

export default function WalletScreen() {
    const {user} = useAuth() as any;

  return (
    <View style={styles.container}>
      <IconButton icon="wallet" size={32} onPress={() => {router.push('/profile/transactions')}} />

        <Text>
            {user?.balance}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        gap: 10,
        borderRadius: 8,
        paddingHorizontal: 24,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'column',
    },
  });
  
  