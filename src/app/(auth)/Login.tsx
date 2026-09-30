import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />

      {/* Decorative Soft Background Glows */}
      <View className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
      <View className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Brand / Logo Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-slate-900 items-center justify-center shadow-xl shadow-slate-900/20 border border-slate-700/30">
              <Ionicons name="shield-checkmark" size={28} color="#ffffff" />
            </View>

            <Text className="text-3xl font-black text-slate-900 tracking-tight mt-5 mb-1.5">
              Welcome back
            </Text>
            <Text className="text-slate-500 text-sm font-medium text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Elevated Main Card Container */}
          <View className="bg-white/80 border border-white/80 rounded-3xl p-6 shadow-2xl shadow-slate-200/80">
            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </Text>
              <View
                className={`flex-row items-center bg-slate-100/70 border rounded-2xl px-4 py-3.5 ${focusedInput === 'email'
                    ? 'border-slate-900 bg-white shadow-md shadow-slate-900/5'
                    : 'border-slate-200/80'
                  }`}
              >
                <Feather
                  name="mail"
                  size={19}
                  color={focusedInput === 'email' ? '#0f172a' : '#94a3b8'}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="name@company.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-slate-900 text-sm font-medium p-0"
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-1">
              <Text className="text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </Text>
              <View
                className={`flex-row items-center bg-slate-100/70 border rounded-2xl px-4 py-3.5 ${focusedInput === 'password'
                    ? 'border-slate-900 bg-white shadow-md shadow-slate-900/5'
                    : 'border-slate-200/80'
                  }`}
              >
                <Feather
                  name="lock"
                  size={19}
                  color={focusedInput === 'password' ? '#0f172a' : '#94a3b8'}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-slate-900 text-sm font-medium p-0"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  {showPassword ? (
                    <Feather name="eye-off" size={19} color="#64748b" />
                  ) : (
                    <Feather name="eye" size={19} color="#64748b" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="self-end py-2.5 mb-2">
              <Text className="text-slate-900 text-xs font-bold tracking-tight">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Primary Action Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center shadow-lg shadow-slate-900/25 active:bg-slate-800"
            >
              <Text className="text-white text-sm font-bold mr-2">
                Sign In
              </Text>
              <Feather name="arrow-right" size={17} color="#ffffff" />
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-slate-200" />
              <Text className="text-slate-400 text-xs font-bold px-3 uppercase tracking-widest">
                Or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-slate-200" />
            </View>

            {/* Social Logins */}
            <View className="flex-row gap-3">
              {/* Google Button */}
              <TouchableOpacity
                activeOpacity={0.75}
                className="flex-1 flex-row items-center justify-center bg-white border border-slate-200/90 rounded-2xl py-3.5 px-3 shadow-sm active:bg-slate-50"
              >
                <Text className="text-slate-900 font-black text-base mr-2">
                  G
                </Text>
                <Text className="text-slate-800 text-sm font-bold">
                  Google
                </Text>
              </TouchableOpacity>

              {/* Apple Button */}
              <TouchableOpacity
                activeOpacity={0.75}
                className="flex-1 flex-row items-center justify-center bg-white border border-slate-200/90 rounded-2xl py-3.5 px-3 shadow-sm active:bg-slate-50"
              >
                <Text className="text-slate-900 font-black text-base mr-2">
                  
                </Text>
                <Text className="text-slate-800 text-sm font-bold">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Navigation */}
          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-slate-500 text-sm font-medium">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity>
              <Text className="text-slate-900 text-sm font-black border-b border-slate-900 pb-0.5">
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}