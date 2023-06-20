import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, StatusBar, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [request, response, promptAsync] =  Google.useAuthRequest({
    androidClientId:
      "163986923738-bn7h85ub9ohirmule1bj58jk9qveo3ve.apps.googleusercontent.com",
    iosClientId:
      "163986923738-jh0969a71gf3dhti4ie73u8bgm7u1mc5.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    setIsError(false);
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        setIsLoggedIn(true);
        await getUserInfo(response.authentication.accessToken);
      } else if (response?.type === "error") {
        setIsError(true);
      }
    } else {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
        setIsError(true);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
    setIsLoggedIn(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {!isLoggedIn && !isError && (
          <Button title="Sign in with Google" onPress={() => promptAsync()} />
        )}
        {isLoggedIn && (
          <Button title="Sign out" onPress={handleSignOut} />
        )}
      </View>
      {isLoggedIn ? (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image
              source={
                {uri: "https://www.arthmate.com/storage/blogs/2023-01-05-63b665ec05b1d.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Card 1</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={
                {uri: "https://www.arthmate.com/storage/blogs/2023-01-06-63b7c08ea86e2.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Card 2</Text>
          </View>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
          <Image
              source={
                {uri: "https://www.arthmate.com/storage/blogs/2022-12-30-63ae7a3c62317.png",
              }}
              style={styles.cardImage}
            />
            {isError ? (
              <Text style={styles.errorMessage}>Sign-in failed. Please try again.</Text>
            ) : (
              <Text style={styles.cardText}>Please sign in to view content.</Text>
            )}
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  cardImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});
