import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link, router } from "expo-router";

import { images } from "../../constants/images";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "One or more fields are missing!");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      // set it to global state
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "An error occurred while SignUp");
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
              Sign Up to Virality
            </Text>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            placeholder="blueninja"
          ></FormField>

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
            title="Sign-Up"
            handlePress={submit}
            containerStyles="mt-4"
            isLoading={isSubmitting}
          ></CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-md text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-md font-psemibold text-[#DB1A5A]"
            >
              Sign-in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
