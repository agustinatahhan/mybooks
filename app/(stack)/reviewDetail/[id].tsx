import RatingStars from "@/components/rating/RatingStars";
import {
  DescriptionComponent,
  HeaderComponent,
} from "@/components/reviewDetailComponents/ReviewDetailComponent";
import { db } from "@/FirebaseConfig";
import { Review } from "@/types/review";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const ReviewDetail = () => {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, "reviews", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data() as Omit<Review, "id">;

          setReview({ id: snap.id, ...data });
        }
      } catch (error) {
        console.error(error, "Error fetching the review");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-8 mt-10 mx-5">
          {review ? (
            <View className="flex items-center">
              <Image
                source={{ uri: review.image }}
                className="w-[200px] h-[300px] rounded-xl mb-3"
              />
              <RatingStars rating={review?.rating} />
              <Text className="text-3xl font-title text-expresso text-center mt-5">
                {review?.title}
              </Text>
              <View className="mt-5 flex-col gap-1 bg-highlight/60 py-3 px-3 rounded-xl">
                <HeaderComponent title="Author:" description={review?.author} />
                <HeaderComponent title="Genre:" description={review?.genre} />
                <HeaderComponent title="Pages:" description={review?.pages} />
                <HeaderComponent
                  title="Start Date:"
                  description={review?.startDate ? String(review.startDate) : ""}
                />
                <HeaderComponent
                  title="End Date:"
                  description={review?.endDate ? String(review.endDate) : ""}
                />
              </View>

              <View className="flex-col gap-1 ">
                <DescriptionComponent
                  title="Review"
                  description={review?.review}
                  className="mt-5 bg-highlight/30 "
                />
                <DescriptionComponent
                  title="Quotes"
                  description={review?.quotes?.join("")}
                  className="mt-5 bg-highlight/50 "
                />

                <DescriptionComponent
                  title="Fav Character"
                  description={review?.favCharacter}
                  className="mt-5 bg-highlight/80 "
                />
                <DescriptionComponent
                  title="Would you recommend it?"
                  description={
                    review?.recommend ? (
                      <Ionicons size={26} name="happy-outline" />
                    ) : (
                      <Ionicons size={26} name="sad-outline" />
                    )
                  }
                  className="mt-5 bg-highlight/20  "
                />
              </View>
            </View>
          ) : (
            <Text> No review </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewDetail;
