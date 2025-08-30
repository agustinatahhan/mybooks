import { ReviewCardHome } from "@/components/reviewsCards/ReviewCardHome";
import { getReviews } from "@/services/getReviews";
import { Review } from "@/types/review";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

const Home = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchData = async () => {
    try {
      const data = await getReviews();
      if (data) {
        setReviews(data);
      }
    } catch (error) {
      console.error(error, "Error fetching data");
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        className="mx-5 mt-5"
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mx-2 mb-8">
            <Text className="font-bold text-3xl font-title text-expresso">
              My Reviews
            </Text>
            <Pressable
              onPress={() => router.push("/(stack)/createReview/CreateReview")}
            >
              <Ionicons size={35} name="add-circle-outline" color={"#f4c9d6"} />
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <View className="mt-16 items-center">
            <Text className="text-espresso/70">
              You don’t have reviews yet.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-1 mb-5 mx-2">
            <ReviewCardHome review={item} onPress={() => router.push("/")} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
