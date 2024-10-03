import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[#DB1A5A] rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-[#1C040C] font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
