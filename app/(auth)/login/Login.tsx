import { auth } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
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
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (email.trim() === "" && password.trim() === "") {
      Keyboard.dismiss();
    }
  }, [email, password]);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(stack)/home");
      setEmail("");
      setPassword("");
      console.log(auth.currentUser?.uid);
      
    } catch (error) {
      console.log(error, "Error login in");
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
            <Image
              source={require("../../../assets/images/logo-bookito.png")}
              className="w-full h-[200px] rounded-xl"
              resizeMode="contain"
            />
            <View className="w-80 mt-5 gap-4">
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
                onPress={login}
                className="w-full py-3 px-3 rounded-xl bg-highlight items-center "
              >
                <Text className="font-body text-lg text-expresso">Login</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(auth)/createAccount/CreateAccount")}
                className="flex-row gap-2 items-center justify-end"
              >
                <Text className="text-expresso font-body text-sm">
                  Create account
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
