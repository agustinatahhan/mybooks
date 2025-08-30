import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
};
const RatingStars = ({ rating }: Props) => {
  if (rating === undefined) {
    return <Text className="text-md mt-1">No rating</Text>;
  }

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <View className="flex-row items-center gap-3 mt-3 ">
      {Array.from({ length: totalStars }, (_, i) => {
        if (i < fullStars) {
          return <Ionicons key={i} name="star" size={23} color="#FFD700" />;
        } else if (i === fullStars && halfStar) {
          return (
            <Ionicons key={i} name="star-half" size={23} color="#FFD700" />
          );
        } else {
          return (
            <Ionicons key={i} name="star-outline" size={23} color="#FFD700" />
          );
        }
      })}
    </View>
  );
};

export default RatingStars;
