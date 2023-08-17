import { Cloud } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export default function WeatherScreen() {
  return (
    <View className="bg-white rounded-md p-3 gap-1 hover:bg-slate-300">
        <Cloud size={32} color='black' />
        <Text>
            24°C
        </Text>
    </View>
  )
}
