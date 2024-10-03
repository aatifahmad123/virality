import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import { useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-[#1C040C] h-full ">
      <FlatList
        // data={[]}
        data={posts}
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="justify-between items-start flex-row mb-4 px-4 mt-4">
            <View className=" w-full">
              <Text className="font-pmedium text-sm text-gray-100">
                {`You're searching for`}
              </Text>
              <Text className="text-xl font-psemibold text-white">{query}</Text>
              <View className=" w-full items-center px-4 mt-3">
                <SearchInput initialQuery={query}></SearchInput>
              </View>
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
export default Search;
