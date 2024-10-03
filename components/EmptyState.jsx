import { View, Text, Image } from "react-native";
import { images } from "../constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { Alert } from "react-native";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justif-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[220px] h-[185px]"
        resizeMode="contain"
      ></Image>
      <Text className="text-md text-center font-psemibold text-white">
        {title}
      </Text>

      <Text className="font-pmedium text-sm text-gray-100 text-center">
        {subtitle}
      </Text>

      <CustomButton
        title="Create a video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-6"
      ></CustomButton>
    </View>
  );
};
export default EmptyState;
