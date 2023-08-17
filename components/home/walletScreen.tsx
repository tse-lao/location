import { Wallet } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../app/context/auth';

export default function WalletScreen() {
    const {user} = useAuth() as any;

  return (
    <View className="bg-white rounded-md p-3 flex flex-col gap-1 mb-4">
        <Wallet size={32} color='black' />
        <Text className="text-xl font-semibold">
            {user?.balance}
        </Text>
    </View>
  )
}
