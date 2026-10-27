import { Text, View } from "react-native";

type DailyFocusSummaryProps = {
    focusMinutes: number;
    completedSessions: number;
};

export default function DailyFocusSummary({
    focusMinutes,
    completedSessions,
}: DailyFocusSummaryProps) {
    return (

        <View className="mb-28 flex-row rounded-3xl border border-stone-200/80 bg-white py-5">
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
  );
}