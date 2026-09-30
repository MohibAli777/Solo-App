import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { authService } from "@/features/auth/services/auth.service";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authService.signUp(
        email.trim(),
        password
      );

      if (error) {
        Alert.alert("Signup failed", error.message);
        return;
      }

      Alert.alert(
        "Account created",
        "Your account has been created."
      );

      router.replace("/(auth)/Login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>Create your account</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={isLoading ? "Creating..." : "Create account"}
        onPress={handleSignup}
        disabled={isLoading}
      />
    </View>
  );
}