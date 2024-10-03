import { Alert, TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { TextInput } from "react-native";
import { icons } from "../constants/icons";
import { usePathname, router } from "expo-router";
import { useState } from "react";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-black-200 rounded-2xl w-full h-14 px-4 bg-black-100 focus:border-[#DB1A5A] items-center flex-row">
      <TextInput
        className="text-sm mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Error",
              "Please input something to continue search"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};
export default SearchInput;
