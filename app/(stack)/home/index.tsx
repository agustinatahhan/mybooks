import { ReviewCardHome } from "@/components/reviewsCards/ReviewCardHome";
import { getReviews } from "@/services/getReviews";
import { Review } from "@/types/review";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const Home = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviews();
        console.log(data);
        
        if (data) {
          setReviews(data);
        }
      } catch (error) {
        console.error(error, "Error fetching data");
      }
    };
    fetchData();    
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-col justify-center items-start mx-5 mt-8">
        <Text className="font-title text-3xl">My Reviews</Text>
        <FlatList 
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ReviewCardHome review={item} onPress={() => router.push("/(stack)/home")}/>
        )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
