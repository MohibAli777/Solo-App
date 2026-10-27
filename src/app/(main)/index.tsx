import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { captureService } from "@/features/captures/services/capture.service";
import DailyFocusSummary from "@/features/home/components/DailyFocusSummary";
import HomeHeader from "@/features/home/components/HomeHeader";
import IntentionActionModal from "@/features/home/components/IntentionActionModal";
import IntentionInput from "@/features/home/components/IntentionInput";

export default function HomeScreen() {

  const router = useRouter();
  
  const [intention, setIntention] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (value: string) => {
    setIntention(value);
    setShowActions(true);
  };

  const handleFocus = () => {
    setShowActions(false);

    router.push({
      pathname: "/(main)/focus",
      params: { intention },
    });
  };

  const handleSaveForLater = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      await captureService.create(intention);

      setShowActions(false);
      setIntention("");

      Alert.alert("Saved", "Your thought is safely in your inbox.");
    } catch {
      Alert.alert(
        "Couldn't save",
        "Your thought hasn't been saved. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-stone-50 px-6 pt-16 pb-10">

      {/* Home Header */}
      <HomeHeader />

      {/* Hero */}
      <IntentionInput onSubmit={handleSubmit} />

      {/* Today */}
      <DailyFocusSummary
        focusMinutes={0}
        completedSessions={0}
      />

      <IntentionActionModal
        visible={showActions}
        intention={intention}
        onClose={() => setShowActions(false)}
        onFocus={handleFocus}
        onSaveForLater={handleSaveForLater}
      />
    </View>
  );
}