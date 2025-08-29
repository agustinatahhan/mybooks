import { TextInputCreateReview } from "@/components/inputs/TextInputCreateReview";
import { createReview } from "@/services/createReview";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [pages, setPages] = useState("");
  const [review, setReview] = useState("");
  const [quotes, setQuotes] = useState("");
  const [favCharacter, setFavCharacter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [recommend, setRecommend] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      await createReview({
        title,
        author,
        image,
        pages: pages ? Number(pages) : undefined,
        review,
        quotes: quotes
          .split(",")
          .map((q) => q.trim())
          .filter((q) => q.length > 0),
        favCharacter,
        startDate,
        endDate,
        genre,
        rating,
        recommend,
      });

      console.log("Review created!");
      resetForm();
      router.back();
    } catch (error) {
      console.error("Error creating review", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setImage("");
    setPages("");
    setReview("");
    setQuotes("");
    setFavCharacter("");
    setStartDate("");
    setEndDate("");
    setGenre("");
    setRating(0);
    setRecommend(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mx-5 mt-5 items-center justify-center">
            <Text className="font-bold text-3xl font-title text-expresso mb-4">
              Create a Review
            </Text>
            <TextInputCreateReview
              placeholder="Image"
              value={image}
              onChangeText={setImage}
            />
            <TextInputCreateReview
              value={rating.toString()}
              onChangeText={(text) =>
                setRating(Number(text) as 0 | 1 | 2 | 3 | 4 | 5)
              }
              placeholder="Rating (0-5)"
              keyboardType="numeric"
            />
            <TextInputCreateReview
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInputCreateReview
              placeholder="Author"
              value={author}
              onChangeText={setAuthor}
            />
            <TextInputCreateReview
              value={genre}
              onChangeText={setGenre}
              placeholder="Genre"
            />

            <TextInputCreateReview
              placeholder="Pages"
              value={pages}
              onChangeText={setPages}
            />
            <TextInputCreateReview
              value={startDate}
              onChangeText={setStartDate}
              placeholder="Start date (YYYY-MM-DD)"
            />
            <TextInputCreateReview
              value={endDate}
              onChangeText={setEndDate}
              placeholder="End date (YYYY-MM-DD)"
            />
            <TextInputCreateReview
              value={review}
              onChangeText={setReview}
              placeholder="Write your review..."
              multiline
              className="h-40"
            />
            <TextInputCreateReview
              value={quotes}
              onChangeText={setQuotes}
              placeholder="Favorite quotes (comma separated)"
            />
            <TextInputCreateReview
              value={favCharacter}
              onChangeText={setFavCharacter}
              placeholder="Favorite character"
            />
            <Pressable onPress={() => setRecommend(!recommend)}>
              <Text>
                {recommend ? "✅ I recommend this book" : "❌ Not recommended"}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="bg-green-500 p-4 rounded-lg items-center"
            >
              <Text className="text-white font-bold">Save Review</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateReview;
