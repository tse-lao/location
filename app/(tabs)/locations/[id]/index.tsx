
import { useLocalSearchParams } from 'expo-router';

import { Text } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams();

  return <Text>Billboard ID: {id}</Text>;
}
