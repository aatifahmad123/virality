import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { Alert } from "react-native";
import { images } from "../../constants/images";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.email === "" || form.password === "") {
      Alert.alert("Error", "One or more fields are missing!");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      // set it to global state

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "An error occurred while SignIn");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#1C040C] h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-6 my-6">
          <View className="items-center">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />

            <Text className="text-2xl text-white font-psemibold mt-10">
              Log in to Virality
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="test123@rediffmail.com"
          ></FormField>

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="123#@$"
          ></FormField>

          <CustomButton
            title="Sign-In"
            handlePress={submit}
            containerStyles="mt-4"
            isLoading={isSubmitting}
          ></CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-md text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-md font-psemibold text-[#DB1A5A]"
            >
              Sign-up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
