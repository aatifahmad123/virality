import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#1C040C" style="light"></StatusBar>
    </>
  );
};
export default AuthLayout;
