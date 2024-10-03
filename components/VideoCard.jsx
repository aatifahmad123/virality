import { View, Text, Image } from "react-native";
import { icons } from "../constants/icons";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-[#DB1A5A] justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            ></Image>
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          className="w-full h-60 rounded-lg mt-3"
          resizeMode={ResizeMode.CONTAIN}
          source={{
            uri: video,
          }}
          useNativeControls
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        ></Video>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-lg relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="rounded-xl mt-3 w-full h-full"
            resizeMode="cover"
          ></Image>
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoCard;
