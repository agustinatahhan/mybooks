import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  description: any;
  className?: string;
};
export const HeaderComponent = ({ title, description, className }: Props) => {
  return (
    <View className="flex-row items-end gap-2">
      <Text className="font-normal text-lg  font-title text-expresso">{title}</Text>
      <Text className="font-semibold text-xl font-body text-expresso">{description}</Text>
    </View>
  );
};

export const DescriptionComponent = ({ title, description, className }: Props) => {
  return (
    <View className={`${className} flex-col gap-2 py-3 px-3 rounded-xl`}>
      <Text className="text-lg  font-title text-expresso">{title}</Text>
      <Text className="text-xl font-body text-expresso">{description}</Text>
    </View>
  );
};
