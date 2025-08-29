import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
  className?: string;
};

export const TextInputCreateReview = ({
  placeholder,
  value,
  onChangeText,
  multiline,
  keyboardType,
  className
}: Props) => {
  return (
    <View className="w-full mb-4">
        <TextInput 
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#3e2723"}
        className={`${className} py-3 px-3 rounded-xl bg-highlight/40 font-body text-lg`}
        keyboardType={keyboardType}
        multiline={multiline}
        />
    </View>
);
};
