import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'; // Ensure this is installed
// import { supabase } from '@/src/services/supabase';
import { Ionicons } from '@expo/vector-icons';

// Helper for human-readable errors
const getAuthErrorMessage = (message: string) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("already registered") || lowerMessage.includes("already exists")) {
    return "An account with this email already exists.";
  }
  if (lowerMessage.includes("password")) {
    return "Password does not meet security requirements.";
  }
  return "Something went wrong. Please try again.";
};

const SignUpPage: React.FC = () => {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // UI & Error States
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState<boolean>(false);

  // Auto-hide the banner after 4 seconds
  useEffect(() => {
    if (statusMsg) {
      const timer = setTimeout(() => setStatusMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const passwordCriteria = useMemo(() => {
    return [
      { label: 'Letters', met: /[a-zA-Z]/.test(password) },
      { label: 'Number', met: /\d/.test(password) },
      { label: 'Special Character', met: /[^a-zA-Z0-9\s]/.test(password) },
      { label: '8+ Characters', met: password.length >= 8 },
    ];
  }, [password]);

  const isPasswordValid = passwordCriteria.every(c => c.met);

  const handleSignup = async () => {
    setErrorField(null);
    setStatusMsg(null);

    if (!fullName.trim()) {
      setErrorField('name');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    if (!isValidEmail(email)) {
      setErrorField('email');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    if (!isPasswordValid) {
      setErrorField('password');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setLoading(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: { data: { full_name: fullName } },
      // });

      // if (error) {
      //   await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      //   setStatusMsg({ type: 'error', text: getAuthErrorMessage(error.message) });
      //   return;
      // }

      // if (data.user) {
      //   await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
      //   if (data.session) {
      //     setStatusMsg({ type: 'success', text: "Account created. Redirecting..." });
      //     // Global NavigationGuard will handle redirection
      //   } else {
      //     setNeedsConfirmation(true);
      //     setStatusMsg({ type: 'success', text: "Verification email sent." });
      //   }
      // }

    } catch (err) {
      setStatusMsg({ type: 'error', text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const getBorderStyle = (field: string) => {
    if (errorField === field) return 'border-red-500';
    if (isFocused === field) return 'border-zinc-900';
    return 'border-zinc-100';
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      
      {/* MODERN FLOATING BANNER */}
      {statusMsg && (
        <Animated.View 
          entering={FadeInUp.springify()} 
          exiting={FadeOutUp}
          className={`absolute top-12 left-8 right-8 z-50 border px-5 py-4 rounded-3xl flex-row items-center shadow-xl ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 shadow-emerald-900/10' 
              : 'bg-red-50 border-red-100 shadow-red-900/10'
          }`}
        >
          <View className={`w-2 h-2 rounded-full mr-3 ${statusMsg.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <Text className={`font-bold text-sm flex-1 leading-tight ${statusMsg.type === 'success' ? 'text-emerald-900' : 'text-red-900'}`}>
            {statusMsg.text}
          </Text>
        </Animated.View>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8" showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View className="mt-10 mb-10 items-center">
            <View className="w-52 h-8 mb-6">
              <Image source={require('@/assets/images/branding/logo.png')} style={{ width: '100%', height: '100%' }} contentFit="contain" />
            </View>
            <Text className="text-5xl font-bold text-zinc-900 tracking-[-2.5px] leading-tight text-center">
              {needsConfirmation ? "Check Email" : "Create Account"}
            </Text>
            <Text className="text-zinc-400 text-lg mt-1 font-medium text-center">
              {needsConfirmation ? "We sent a link to " + email : "For people who finish things."}
            </Text>
          </View>

          {needsConfirmation ? (
            <Animated.View entering={FadeInUp.delay(200)} className="items-center">
              <View className="w-20 h-20 bg-emerald-50 rounded-full items-center justify-center mb-8">
                <View className="w-10 h-10 bg-emerald-500 rounded-full items-center justify-center">
                   <Text className="text-white font-bold">✓</Text>
                </View>
              </View>
              
              <Text className="text-zinc-500 text-center leading-relaxed text-base mb-10">
                To complete your registration, please click the verification link in your inbox.
              </Text>

              <TouchableOpacity 
                onPress={() => setNeedsConfirmation(false)}
                className="w-full py-5 rounded-[24px] bg-zinc-900 items-center justify-center mb-6 shadow-xl shadow-black/20"
              >
                <Text className="text-white font-bold text-lg">Back to Signup</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSignup}
                disabled={loading}
                className="py-2"
              >
                <Text className="text-zinc-400 font-bold text-sm">Didn't get it? <Text className="text-zinc-900">Resend</Text></Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <>
              {/* Form */}
              <View className="gap-y-5">
                <View>
                  <TextInput
                    value={fullName}
                    onChangeText={(t) => { setFullName(t); setErrorField(null); }}
                    onFocus={() => setIsFocused('name')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Full Name"
                    placeholderTextColor="#A1A1AA"
                    className={`bg-zinc-50 border rounded-[22px] px-6 py-5 text-zinc-900 text-base ${getBorderStyle('name')}`}
                  />
                  {errorField === 'name' && <Text className="text-red-500 text-[10px] font-bold mt-2 ml-4 uppercase">Name Required</Text>}
                </View>

                <View>
                  <TextInput
                    value={email}
                    onChangeText={(t) => { setEmail(t); setErrorField(null); }}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Email Address"
                    placeholderTextColor="#A1A1AA"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className={`bg-zinc-50 border rounded-[22px] px-6 py-5 text-zinc-900 text-base ${getBorderStyle('email')}`}
                  />
                  {errorField === 'email' && <Text className="text-red-500 text-[10px] font-bold mt-2 ml-4 uppercase">Invalid Email</Text>}
                </View>

                <View>
                  <View className="relative justify-center">
                    <TextInput
                      value={password}
                      onChangeText={(t) => { setPassword(t); setErrorField(null); }}
                      onFocus={() => setIsFocused('password')}
                      onBlur={() => setIsFocused(null)}
                      placeholder="Password"
                      placeholderTextColor="#A1A1AA"
                      secureTextEntry={!showPassword}
                      className={`bg-zinc-50 border rounded-[22px] px-6 py-5 text-zinc-900 text-base pr-16 ${getBorderStyle('password')}`}
                    />
                    <TouchableOpacity 
                      onPress={() => {
                        setShowPassword(!showPassword);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }} 
                      className="absolute right-6 h-full justify-center"
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={22} 
                        color="#A1A1AA" 
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <View className="mt-4 px-2 flex-row flex-wrap gap-2">
                    {passwordCriteria.map((c, i) => (
                      <View key={i} className={`px-3 py-1 rounded-full border ${c.met ? 'bg-zinc-900 border-zinc-900' : 'bg-white border-zinc-100'}`}>
                        <Text className={`text-[9px] font-bold ${c.met ? 'text-white' : 'text-zinc-300'}`}>{c.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="mt-6">
                <TouchableOpacity
                  onPress={handleSignup}
                  disabled={loading}
                  activeOpacity={0.9}
                  className={`w-full py-5 rounded-[24px] items-center justify-center ${loading ? 'bg-zinc-800' : 'bg-zinc-900 shadow-2xl shadow-black/40'}`}
                >
                  {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg tracking-tight">Create Account</Text>}
                </TouchableOpacity>

                <View className="flex-row items-center my-8">
                  <View className="flex-1 h-[0.5px] bg-zinc-100" />
                  <Text className="mx-4 text-zinc-300 font-bold text-[9px] tracking-[2px] uppercase">Quick Access</Text>
                  <View className="flex-1 h-[0.5px] bg-zinc-100" />
                </View>

                <View className="flex-row gap-4 mb-2">
                  {['Google', 'Apple'].map((p) => (
                    <TouchableOpacity key={p} className="flex-1 py-4 rounded-[20px] bg-white border border-zinc-100 flex-row items-center justify-center">
                      <Image 
                        source={
                          p === 'Google' 
                            ? require('@/assets/images/branding/logo.png') 
                            : require('@/assets/images/branding/logo.png')
                        } 
                        style={{ width: 24, height: 24, marginRight: 10 }} 
                        contentFit="contain" 
                      />
                      <Text className="text-zinc-900 font-bold text-sm">{p}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Footer */}
              <View className="mt-8 mb-10 items-center">
                <TouchableOpacity onPress={() => router.replace("/Login")}>
                  <Text className="text-zinc-400 text-sm font-medium">
                    Already have an account? <Text className="text-zinc-900 font-bold">Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpPage;