import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    // Implement your logout logic here
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
