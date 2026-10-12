import { Tabs } from "expo-router";

import { MainTabBar } from "@/features/navigation/components/MainTabBar";

export default function MainLayout() {
  return (
    <Tabs
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="coming-soon-one"
        options={{
          title: "Soon",
        }}
      />

      <Tabs.Screen
        name="Focus"
        options={{
          title: "Focus",
        }}
      />

      <Tabs.Screen
        name="Insights"
        options={{
          title: "Insights",
        }}
      />

      <Tabs.Screen
        name="coming-soon-two"
        options={{
          title: "Soon",
        }}
      />
    </Tabs>
  );
}