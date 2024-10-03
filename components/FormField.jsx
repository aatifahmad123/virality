import { View, Text } from "react-native";
import { TextInput } from "react-native";
const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 rounded-2xl w-full h-14 px-4 bg-black-100 focus:border-[#DB1A5A] justify-center">
        <TextInput
          className="text-white font-psemibold flex-1 text-sm"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        ></TextInput>
      </View>
    </View>
  );
};
export default FormField;
