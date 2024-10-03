import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { useEffect, useState } from "react";
import { images } from "../../constants/images";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // re call videos
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-[#1C040C] h-full">
      <FlatList
        // data={[]}
        data={posts}
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="my-6">
            <View className="justify-between items-start flex-row mb-4 px-4">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome!
                </Text>
                <Text className="text-xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>
            <View className=" w-full items-center px-4">
              <SearchInput></SearchInput>
            </View>

            <View className="w-full flex-1 pt-4 pb-8 ">
              <Text className="text-gray-100 text-md font-pregular mb-2 px-4">
                Viral Videos
              </Text>

              <Trending posts={latestPosts ?? []}></Trending>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No videos created yet"
          ></EmptyState>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
      ></FlatList>
    </SafeAreaView>
  );
};
export default Home;
