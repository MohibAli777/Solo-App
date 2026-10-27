import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

type IntentionActionModalProps = {
  visible: boolean;
  intention: string;
  onClose: () => void;
  onFocus: () => void;
  onSaveForLater: () => void;
};

export default function IntentionActionModal({
  visible,
  intention,
  onClose,
  onFocus,
  onSaveForLater,
}: IntentionActionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable
          accessibilityLabel="Close options"
          className="flex-1"
          onPress={onClose}
        />

        <View className="rounded-t-3xl bg-white px-6 pb-10 pt-7">
          <View className="mb-5 h-1 w-10 self-center rounded-full bg-slate-200" />

          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            YOUR INTENTION
          </Text>

          <Text className="mt-3 text-2xl font-semibold text-slate-900">
            {intention}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={onFocus}
            className="mt-7 min-h-14 flex-row items-center justify-center rounded-2xl bg-slate-900 px-5"
          >
            <Feather name="target" size={18} color="#FFFFFF" />
            <Text className="ml-3 font-semibold text-white">
              Focus on it
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onSaveForLater}
            className="mt-3 min-h-14 flex-row items-center justify-center rounded-2xl border border-slate-200 px-5"
          >
            <Feather name="bookmark" size={18} color="#334155" />
            <Text className="ml-3 font-semibold text-slate-700">
              Keep it for later
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}