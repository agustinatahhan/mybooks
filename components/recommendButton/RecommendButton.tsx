import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

type Props = {
  value: boolean | undefined;
  onChange: (v: boolean | undefined) => void;
};

export const RecommendButton = ({ value, onChange }: Props) => {
  const likeSelected = value === true;
  const dislikeSelected = value === false;

  const handleLike = () => onChange(likeSelected ? undefined : true);
  const handleDislike = () => onChange(dislikeSelected ? undefined : false);

  return (
    <View className="flex-row items-center gap-3">
      <Pressable onPress={handleLike} hitSlop={10} accessibilityRole="button" accessibilityLabel="Recommend">
        <Ionicons name={likeSelected ? "happy" : "happy-outline"} size={28} color={likeSelected ? "#f4c9d6" : "#3e2723"} />
      </Pressable>
      <Pressable onPress={handleDislike} hitSlop={10} accessibilityRole="button" accessibilityLabel="Not Recommend">
        <Ionicons name={dislikeSelected ? "sad" : "sad-outline"} size={28} color={dislikeSelected ? "#f4c9d6" : "#3e2723"} />
      </Pressable>
    </View>
  );
};
