import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const now = new Date();
const hour = now.getHours();
const greeting =
  hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
const dateLabel = now.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-stone-50 px-6 pt-16 pb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[13px] font-medium uppercase tracking-widest text-stone-400">
            {dateLabel}
          </Text>
          <Text className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
            {greeting}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          onPress={() => {}}
          className="h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white active:bg-stone-100"
        >
          <Feather name="settings" size={18} color="#57534E" />
        </Pressable>
      </View>

      {/* Hero */}
      <View className="flex-1 justify-center">
        <Text className="text-[44px] font-bold leading-[48px] tracking-tighter text-stone-900">
          What's the
        </Text>
        <Text className="text-[44px] font-bold leading-[48px] tracking-tighter text-stone-300">
          one thing?
        </Text>

        {/* Composer card */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Choose what you want to focus on"
          onPress={() => {}}
          className="mt-9 min-h-[140px] justify-between rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-lg shadow-black/5 active:scale-[0.99] active:bg-stone-50"
        >
          <Text className="text-xl leading-7 text-stone-300">
            I want to focus on…
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Feather name="target" size={15} color="#A8A29E" />
              <Text className="ml-2 text-sm text-stone-400">One at a time</Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-full bg-stone-900">
              <Feather name="arrow-right" size={20} color="#FFFFFF" />
            </View>
          </View>
        </Pressable>

        {/* Quiet secondary action */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Capture a thought"
          onPress={() => {}}
          className="mt-4 flex-row items-center justify-center rounded-2xl py-3 active:bg-stone-100"
        >
          <Feather name="plus" size={16} color="#78716C" />
          <Text className="ml-2 text-[15px] font-medium text-stone-500">
            Just capture a thought
          </Text>
        </Pressable>
      </View>

      {/* Today */}
      <View className="flex-row rounded-3xl border border-stone-200/80 bg-white py-5">
        <View className="flex-1 px-5">
          <Text className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Focused today
          </Text>
          <Text className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            0
            <Text className="text-base font-medium text-stone-400"> min</Text>
          </Text>
        </View>
        <View className="w-px bg-stone-200" />
        <View className="flex-1 px-5">
          <Text className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Sessions
          </Text>
          <Text className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            0
          </Text>
        </View>
      </View>
    </View>
  );
}