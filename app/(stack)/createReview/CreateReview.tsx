import { DatePicker } from "@/components/datePicker/DatePicker";
import { TextInputCreateReview } from "@/components/inputs/TextInputCreateReview";
import { RatingStarsInput } from "@/components/ratingStarsInput/RatingStarsInput";
import { RecommendButton } from "@/components/recommendButton/RecommendButton";
import { createReview } from "@/services/createReview";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import React, { useState } from "react";
import {
  Image,
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
  const [quoteInput, setQuoteInput] = useState("");
  const [quotesArr, setQuotesArr] = useState<string[]>([]);
  const [favCharacter, setFavCharacter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [recommend, setRecommend] = useState<boolean | undefined>(undefined);

  const addQuote = () => {
    const q = quoteInput.trim();
    if (!q) return;
    setQuotesArr((prev) => (prev.includes(q) ? prev : [...prev, q]));
    setQuoteInput("");
  };

  const removeQuote = (idx: number) => {
    setQuotesArr((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleSubmit = async () => {
    try {
      await createReview({
        title,
        author,
        image,
        pages: pages ? Number(pages) : undefined,
        review,
        quotes: quotesArr,
        favCharacter,
        startDate,
        endDate,
        genre,
        rating,
        recommend: recommend ?? undefined,
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
    setQuoteInput("");
    setQuotesArr([]);
    setFavCharacter("");
    setStartDate("");
    setEndDate("");
    setGenre("");
    setRating(0);
    setRecommend(undefined);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const invalidDates =
    startDate && endDate ? new Date(endDate) < new Date(startDate) : false;

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
            <Pressable
              onPress={pickImage}
              className="w-full items-center justify-center"
            >
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../../../assets/images/portada.png")
                }
                className="w-80 h-80 rounded-xl"
                resizeMode="contain"
              />
            </Pressable>
            <RatingStarsInput value={rating} onChange={setRating} />
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
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStart={setStartDate}
              onChangeEnd={setEndDate}
            />

            {invalidDates && (
              <Text className="text-red-500 mt-1">
                La fecha de fin no puede ser anterior al inicio.
              </Text>
            )}
            <TextInputCreateReview
              value={review}
              onChangeText={setReview}
              placeholder="Write your review..."
              multiline
              className="h-40"
            />
            <TextInputCreateReview
              value={quoteInput}
              onChangeText={setQuoteInput}
              placeholder="Add a favorite quotes"
              multiline
              className="h-20"
            />
            <Pressable onPress={addQuote} className="w-full items-end mb-4">
              <Ionicons name="add-circle-outline" size={25} color={"#3e2723"} />
            </Pressable>

            {/* Chips de quotes agregadas */}
            {quotesArr.length > 0 && (
              <View className="flex-col gap-2 mb-4">
                {quotesArr.map((q, i) => (
                  <View
                    key={`${q}-${i}`}
                    className="flex-row items-center justify-between px-3 py-2 rounded-full bg-highlight/20 w-full"
                  >
                    <Text className="text-espresso mr-2">{q}</Text>
                    <Pressable onPress={() => removeQuote(i)}>
                      <Ionicons
                        name="close-circle-outline"
                        size={20}
                        color={"#3e2723"}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
            <TextInputCreateReview
              value={favCharacter}
              onChangeText={setFavCharacter}
              placeholder="Favorite character"
            />
            <View className="w-full py-5 px-3 rounded-xl bg-highlight/60 gap-2">
              <Text className="font-body text-lg text-expresso">
                Would you recommend it?
              </Text>
              <RecommendButton value={recommend} onChange={setRecommend} />
            </View>
            <Pressable
              onPress={handleSubmit}
              className="bg-expresso p-4 rounded-lg items-center w-full mt-5"
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
