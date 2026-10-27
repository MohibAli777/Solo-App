import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader() {
    const now = new Date();
    const hour = now.getHours();
    const greeting =
        hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const dateLabel = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });
    return (
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
                onPress={() => { }}
                className="h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white active:bg-stone-100"
            >
                <Feather name="settings" size={18} color="#57534E" />
            </Pressable>
        </View>

    );
}