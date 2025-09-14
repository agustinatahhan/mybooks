import { auth } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (email.trim() === "" && password.trim() === "") {
      Keyboard.dismiss();
    }
  }, [email, password]);
  const createAccount = async () => {
    Keyboard.dismiss();
    try {
      const created = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (created) router.replace("/(auth)/login/Login");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error, "Error creating account");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }, [])
  );

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
          <View className="flex-1 flex-col justify-center items-center">
            <View className="w-80 mt-5 gap-4">
              <Text className="font-body text-expresso text-xl text-center mb-4">
                Create a new account
              </Text>
              <TextInput
                className="w-full py-5 px-3 rounded-xl bg-highlight/60 font-body text-lg"
                placeholder="Email"
                placeholderTextColor="#3e2723"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={setEmail}
              />
              <View className="relative">
                <TextInput
                  className="w-full py-5 px-3 pr-12 rounded-xl bg-highlight/60 font-body text-lg"
                  placeholder="Password"
                  placeholderTextColor="#3e2723"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-5"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#3e2723"
                  />
                </Pressable>
              </View>
              <Pressable
                onPress={createAccount}
                className="w-full py-3 px-3 rounded-xl bg-highlight items-center "
              >
                <Text className="font-body text-lg text-expresso">Create</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;
