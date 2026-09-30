import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { router } from "expo-router";
import { appStorage } from "@/lib/storage";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: "1",
    title: "One Task. Full Focus.",
    description:
      "Forget endless to-do lists. Choose one meaningful task, eliminate distractions, and give it your complete attention.",
    buttonText: "Continue",
    image: require("@/assets/images/illus1.png"),
  },
  {
    id: "2",
    title: "Finish Before You Move On.",
    description:
      "Real progress comes from completing what matters. Build momentum one finished task at a time.",
    buttonText: "Get Started",
    image: require("@/assets/images/illus1.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    scrollX.value = contentOffset;

    const index = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = async () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
      return;
    }

    await appStorage.setCompletedOnboarding(true);

    router.replace("/(auth)/Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-between">

      {/* 1. TOP HERO LOGO (Fixed Anchor Point above slider) */}
      {/* <View className="items-center pt-6 h-28 justify-center">
        <Image
          source={require('@/assets/images/branding/logo.png')}
          className="w-24 h-24"
          resizeMode="contain"
          alt="Solo Logo"
        />
      </View> */}

      {/* 2. MIDDLE CONTENT (Fluid Gesture Swiping Container) */}
      <View className="flex-1 justify-center">
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
        >
          {ONBOARDING_DATA.map((item) => (
            <View
              style={{ width: SCREEN_WIDTH }}
              className="px-8 justify-center"
              key={item.id}
            >
              {/* Premium image container frame */}
              <View className="w-full aspect-[4/3] justify-center items-center mb-10">
                <Image
                  source={item.image}
                  className="w-full h-full"
                  resizeMode="cover"
                  alt={item.title}
                />
              </View>

              {/* Text Composition */}
              <View className="items-center gap-5 px-2">
                <Text className="text-[38px] font-black text-zinc-900 text-center tracking-tight leading-[46px]">
                  {item.title}
                </Text>
                <Text className="text-[15px] text-zinc-400 font-normal text-center tracking-wide leading-7">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>

      {/* 3. BOTTOM ACTIONS (Dynamic Progress + Interactive Pill Button) */}
      <View className="px-10 pb-10 gap-8">

        {/* Fluid Dynamic Progress Indicators */}
        <View className="flex-row justify-center items-center gap-2.5">
          {ONBOARDING_DATA.map((_, index) => {
            const dotStyle = useAnimatedStyle(() => {
              // Smooth width expansion maps explicitly to scroll position
              const width = interpolate(
                scrollX.value,
                [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                [8, 32, 8],
                Extrapolation.CLAMP
              );

              // Seamlessly dim out inactive dots
              const opacity = interpolate(
                scrollX.value,
                [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
                [0.2, 1, 0.2],
                Extrapolation.CLAMP
              );

              return {
                width,
                opacity,
              };
            });

            return (
              <Animated.View
                key={index}
                style={dotStyle}
                className="h-1.5 rounded-full bg-zinc-950"
              />
            );
          })}
        </View>

        {/* Action Call Button */}
        <TouchableOpacity
          className="w-full h-16 bg-zinc-950 rounded-full justify-center items-center active:opacity-90 shadow-xl shadow-zinc-950/10"
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-bold tracking-wider uppercase">
            {ONBOARDING_DATA[currentIndex].buttonText}
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}