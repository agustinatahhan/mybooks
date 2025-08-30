import { Review } from "@/types/review";
import React from "react";
import { Image, Pressable, View } from "react-native";
import RatingStars from "../rating/RatingStars";
type Props = {
  review: Review;
  onPress?: () => void;
};

export const ReviewCardHome = ({ review, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} className="w-full">
      <View>
        <Image
          source={{uri: review.image}}
          className="w-full h-[250px] rounded-xl"
          resizeMode="cover"
        />
        <View className="items-center">
          <RatingStars rating={review.rating} />
        </View>
      </View>
    </Pressable>
  );
};
