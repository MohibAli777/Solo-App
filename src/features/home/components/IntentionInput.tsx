import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Keyboard,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type IntentionInputProps = {
    onSubmit: (intention: string) => void;
};

export default function IntentionInput({
    onSubmit,
}: IntentionInputProps) {
    const [intention, setIntention] = useState("");

    const handleSubmit = () => {
        const value = intention.trim();

        if (!value) return;

        Keyboard.dismiss();
        onSubmit(value);
    };

    return (

        <View className="flex-1 justify-center">
            <Text className="text-[44px] font-bold leading-[48px] tracking-tighter text-stone-900">
                What's the
            </Text>
            <Text className="text-[44px] font-bold leading-[48px] tracking-tighter text-stone-300">
                one thing?
            </Text>

            {/* Composer card */}
            <View
                className="mt-9 min-h-[140px] justify-between rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-lg shadow-black/5 active:scale-[0.99] active:bg-stone-50"
            >
                <TextInput
                    value={intention}
                    onChangeText={setIntention}
                    onSubmitEditing={handleSubmit}
                    placeholder="I want to focus on..."
                    placeholderTextColor="#94A3B8"
                    returnKeyType="go"
                    accessibilityLabel="What do you want to focus on?"
                    className=" text-xl leading-7 text-stone-600"
                />
                <View className="flex-row items-center justify-end">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Submit intention"
                        disabled={!intention.trim()}
                        onPress={handleSubmit}
                        className="h-10 w-10 items-center justify-center rounded-xl bg-slate-900 disabled:opacity-40"
                    >
                        <View className="h-12 w-12 items-center justify-center rounded-full bg-stone-900">
                            <Feather name="arrow-right" size={20} color="#FFFFFF" />
                        </View>
                    </Pressable>
                </View>
            </View>

            {/* Quiet secondary action */}
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Capture a thought"
                onPress={() => { }}
                className="mt-4 flex-row items-center justify-center rounded-2xl py-3 active:bg-stone-100"
            >
                <Feather name="plus" size={16} color="#78716C" />
                <Text className="ml-2 text-[15px] font-medium text-stone-500">
                    Just capture a thought
                </Text>
            </Pressable>
        </View>
    );
}