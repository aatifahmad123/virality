import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants/icons";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-[#1C040C] h-full ">
      <FlatList
        // data={[]}
        data={posts}
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              ></Image>
            </TouchableOpacity>

            <View className="w-16 h-16 border border-[#DB1A5A] rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              ></Image>
            </View>

            <View className="mt-5 justify-center items-center">
              <InfoBox
                title={user?.username}
                containerStyles="mb-4"
                textStyles="text-lg font-psemibold text-white"
              ></InfoBox>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles=""
                textStyles="text-lg font-pregular text-gray-100"
              ></InfoBox>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Oops! This search does not have any videos!"
          ></EmptyState>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};
export default Profile;
