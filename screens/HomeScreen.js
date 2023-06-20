import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={
          {uri: "https://www.arthmate.com/storage/blogs/2023-01-05-63b6ba7477587.png",
        }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text>Welcome!</Text>
      <Button
        title="Proceed"
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
}
