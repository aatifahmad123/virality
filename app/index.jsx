import { Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants/images";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-[#1C040C] h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 mb-6">
          <Image
            source={images.logo}
            className="w-[230px] h-[284px] border border-red-500"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[320px] w-full h-[250px] rounded-3xl border border-red-500"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-3">
            <Text className=" text-white font-bold text-center text-xl">
              Fuel your tech curiosity with{" "}
              <Text className="text-[#DB1A5A]">Virality</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-4 text-center">
            The Ultimate Hub to Discover, Share, and Stay Ahead with the Latest
            Viral Tech Videos Shaping the Future
          </Text>

          <CustomButton
            title="Explore Virality"
            handlePress={() => router.push("/sign-in")}
            styles={{}}
            containerStyles="w-full mt-5"
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1C040C" style="light"></StatusBar>
    </SafeAreaView>
  );
}
