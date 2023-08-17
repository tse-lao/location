import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function InteractionSection() {
  return (
    <View className="bg-white rounded-md p-3  flex-2 ">
      <View>
        <Text className="font-medium text-lg">Connects</Text>
        <Text className="text-sm text-gray-500">Last 2w ago</Text>
        <ScrollView className="h-[200] mt-4 divide-y-8">
            <Text>
                Here will be a list of connects
            </Text>
            <Text>
                Here will be a list of connects
            </Text>
            <Text>
                Here will be a list of connects
            </Text>
            <Text>
                Here will be a list of connects
            </Text>
        </ScrollView>
      </View>
    </View>
  );
}
