import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable
} from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '@/features/auth/services/auth.service';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);

  // States
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleLogin = async () => {
    // Basic Validation

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setStatusMsg({ type: 'error', text: 'Please enter your credentials' });
      return;
    }

    try {
      setLoading(true);
      setStatusMsg(null);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const { data, error } = await authService.signIn(normalizedEmail, password);

      if (error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setStatusMsg({ type: 'error', text: error.message });
        return;
      }

      if (data.user) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setStatusMsg({ type: 'success', text: 'Welcome back. Redirecting...' });
        router.replace("/(main)/Home");
      }

    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setStatusMsg({ type: 'error', text: 'An unexpected error occurred' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Info', `${provider} login is coming soon.`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-8"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Section */}
          <View className="mt-10 mb-12 items-center">
            <View className="w-52 h-8 mb-6 items-center justify-center">
              <Image
                source={require('@/assets/images/branding/logo.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                transition={500}
              />
            </View>

            <Text className="text-5xl font-bold text-zinc-900 tracking-[-3px] leading-[0.9] text-center">
              Welcome Back.
            </Text>

            <Text className="text-zinc-400 text-lg mt-4 leading-7 font-medium text-center max-w-[240px]">
              Stay focused.{"\n"}Finish what matters.
            </Text>
          </View>

          {/* Inline Message Banner */}
          {statusMsg && (
            <View className={`mb-6 p-4 rounded-2xl border ${statusMsg.type === 'success' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <Text className={`text-center font-bold text-sm ${statusMsg.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                {statusMsg.text}
              </Text>
            </View>
          )}

          {/* Form Section */}
          <View className="gap-4">
            <TextInput
              value={email}
              onChangeText={(text) => { setEmail(text); setStatusMsg(null); }}
              onFocus={() => setIsFocused('email')}
              onBlur={() => setIsFocused(null)}
              placeholder="Email Address"
              placeholderTextColor="#A1A1AA"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              className="bg-zinc-50 border rounded-[22px] px-6 py-5 text-zinc-900 text-base"
              style={[
                isFocused === 'email' ? styles.focusedBorder : styles.defaultBorder,
                loading && styles.loadingOpacity
              ]}
            />

            <Pressable
              onPress={() => passwordRef.current?.focus()}
              className="flex-row items-center bg-zinc-50 border rounded-[22px] px-6"
              style={[
                isFocused === 'password' ? styles.focusedBorder : styles.defaultBorder,
                loading && styles.loadingOpacity
              ]}
            >
              <TextInput
                ref={passwordRef}
                value={password}
                onChangeText={(text) => { setPassword(text); setStatusMsg(null); }}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                placeholder="Password"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={!showPassword}
                editable={!loading}
                className="flex-1 py-5 text-zinc-900 text-base"
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                className="ml-2"
                disabled={loading}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#A1A1AA"
                />
              </TouchableOpacity>
            </Pressable>

            <TouchableOpacity
              className="mt-4 self-center"
              activeOpacity={0.5}
              onPress={() => Haptics.selectionAsync()}
              disabled={loading}
            >
              <Text className="text-zinc-400 text-sm font-semibold tracking-tight">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Primary Action */}
          <View className="mt-8">
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              className={`w-full py-5 rounded-[24px] items-center justify-center overflow-hidden ${loading ? 'bg-zinc-800' : 'bg-zinc-900 shadow-2xl shadow-black/40'
                }`}
            >
              {loading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-bold text-lg tracking-tight ml-3">Authenticating...</Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center">
                  <Text className="text-white font-bold text-lg tracking-tight mr-2">Sign In to Continue</Text>
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mt-10 mb-8">
              <View className="flex-1 h-[0.5px] bg-zinc-200" />
              <Text className="mx-6 text-zinc-300 font-bold text-[9px] tracking-[2px] uppercase">Secure Login</Text>
              <View className="flex-1 h-[0.5px] bg-zinc-200" />
            </View>

            {/* Social Login Row */}
            <View className="flex-row gap-4">
              {['Google', 'Apple'].map((provider) => (
                <TouchableOpacity
                  key={provider}
                  onPress={() => handleSocialLogin(provider)}
                  disabled={loading}
                  activeOpacity={0.7}
                  className="flex-1 py-4 rounded-[20px] bg-zinc-50 border border-zinc-100 flex-row items-center justify-center"
                >
                  <Image
                    source={
                      provider === 'Google'
                        ? require('@/assets/images/google-logo.png')
                        : require('@/assets/images/apple-logo.png')
                    }
                    style={{ width: 24, height: 24, marginRight: 10 }}
                    contentFit="contain"
                  />
                  <Text className="text-zinc-900 font-bold text-sm tracking-tight">{provider}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View className="my-auto py-8 items-center">
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={loading}
              onPress={() => {
                Haptics.selectionAsync();
                router.replace("/(auth)/Signup");
              }}
            >
              <Text className="text-zinc-400 text-sm font-medium tracking-tight">
                New to SOLO? <Text className="text-zinc-900 font-bold">Join the list</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  focusedBorder: {
    borderColor: '#18181b', // zinc-900
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  defaultBorder: {
    borderColor: '#f4f4f5', // zinc-100
  },
  loadingOpacity: {
    opacity: 0.5,
  }
});

export default LoginPage;