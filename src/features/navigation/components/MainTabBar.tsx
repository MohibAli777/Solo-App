import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const SPRING_CONFIG = {
  damping: 16,
  stiffness: 220,
  mass: 0.5,
};

const COLORS = {
  ink: "#0f172a",
  muted: "#94a3b8",
  white: "#ffffff",
};

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  focus?: boolean;
  disabled?: boolean;
};

const tabs: TabConfig[] = [
  { name: "index", label: "Home", icon: "home" },
  { name: "coming-soon-one", label: "Soon", icon: "clock", disabled: true },
  { name: "Focus", label: "Focus", icon: "zap", focus: true },
  { name: "Insights", label: "Insights", icon: "pie-chart" },
  { name: "coming-soon-two", label: "Soon", icon: "grid", disabled: true },
];

function TabItem({
  tab,
  isFocused,
  onPress,
}: {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
}) {
  const pressScale = useSharedValue(1);
  const activeAnim = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    activeAnim.value = withSpring(isFocused ? 1 : 0, SPRING_CONFIG);
  }, [isFocused]);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(activeAnim.value, [0, 1], [0, -3]) },
      { scale: interpolate(activeAnim.value, [0, 1], [1, 1.12]) },
    ],
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: pressScale.value * interpolate(activeAnim.value, [0, 1], [1, 1.06]) },
    ],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.9, SPRING_CONFIG);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, SPRING_CONFIG);
  };

  const handlePress = () => {
    if (tab.disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const label = (
    <Text
      className={`mt-1 text-[10.5px] tracking-tight ${
        isFocused ? "font-bold text-slate-900" : "font-semibold text-slate-400"
      }`}
    >
      {tab.label}
    </Text>
  );

  // Center button: lifted above the bar
  if (tab.focus) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className="absolute items-center justify-center"
          style={{ top: -16 }}
        >
          <Animated.View
            style={[
              centerStyle,
              {
                shadowColor: COLORS.ink,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.28,
                shadowRadius: 14,
                elevation: 12,
              },
            ]}
            className="h-[64px] w-[64px] items-center justify-center rounded-full border-4 border-white bg-slate-900"
          >
            <Feather name={tab.icon} size={30} color={COLORS.white} />
          </Animated.View>
        </Pressable>

        {/* Spacer keeps the label aligned with the other tabs */}
        <View className="h-[26px]" />
        {/* {label} */}
      </View>
    );
  }

  return (
    <Pressable
      disabled={tab.disabled}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="h-full flex-1 items-center justify-center"
      style={{ opacity: tab.disabled ? 0.35 : 1 }}
    >
      <Animated.View style={pressStyle} className="items-center justify-center">
        <Animated.View style={iconStyle} className="h-[26px] items-center justify-center">
          <Feather
            name={tab.icon}
            size={22}
            color={isFocused ? COLORS.ink : COLORS.muted}
          />
        </Animated.View>
        {label}
      </Animated.View>
    </Pressable>
  );
}

export function MainTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-0 right-0 items-center px-4">
      <View
        className="h-[74px] w-full max-w-[430px] flex-row items-center rounded-[36px] border border-slate-100 bg-white px-2"
        style={{
          shadowColor: COLORS.ink,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          elevation: 12,
        }}
      >
        {tabs.map((tab) => {
          const route = state.routes.find((r) => r.name === tab.name);
          const isFocused = state.routes[state.index]?.name === tab.name;

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route?.key ?? tab.name,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (route) {
                navigation.navigate({ name: route.name, params: route.params });
              } else {
                navigation.navigate(tab.name);
              }
            }
          };

          return (
            <TabItem
              key={tab.name}
              tab={tab}
              isFocused={isFocused}
              onPress={handlePress}
            />
          );
        })}
      </View>
    </View>
  );
}