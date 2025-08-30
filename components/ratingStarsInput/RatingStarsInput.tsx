import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  onChange: (n: 0 | 1 | 2 | 3 | 4 | 5) => void;
};

export const RatingStarsInput = ({ value, onChange }: Props) => {
  return (
    <View className="flex-row items-center gap-3 my-5">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = (i + 1) as 1 | 2 | 3 | 4 | 5;
        const filled = idx <= value;
        return (
          <Pressable
            key={idx}
            onPress={() => onChange(idx === value ? 0 : idx)} 
            hitSlop={10}
          >
            <Ionicons
              name={filled ? "star" : "star-outline"}
              size={26}
              color={filled ? "#f4c9d6" : "#3e2723"}
            />
          </Pressable>
        );
      })}
      <Text className="ml-2 text-espresso">{value}/5</Text>
    </View>
  );
};
