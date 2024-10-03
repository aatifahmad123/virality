import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants/icons";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUloading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "prompt",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Please enter all fields before submitting!");
    }

    setUloading(true);

    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Post uploaded successfully!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "error occurred while uploading");
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "prompt",
      });

      setUloading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#1C040C] h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give a title for your video"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 sapce-y-2">
          <Text className="text-base text-gray-100 font-pmedium mb-2">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              ></Video>
            ) : (
              <View className="w-full px-4 h-40 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 justify-center items-center border border-dashed border-[#DB1A5A]">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  ></Image>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              ></Image>
            ) : (
              <View className="w-full px-4 h-16 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                ></Image>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Pick an image for thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Upload Your Post"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
