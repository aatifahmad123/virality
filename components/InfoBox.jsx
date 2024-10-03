import { View, Text } from "react-native";
const InfoBox = ({ title, subtitle, containerStyles, textStyles }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-center  ${textStyles}`}>
        {title} {subtitle}
      </Text>
    </View>
  );
};
export default InfoBox;
