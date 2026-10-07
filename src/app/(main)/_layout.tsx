import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f172a",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="focus"
        options={{
          title: "Focus",
          tabBarIcon: ({ color }) => (
            <Feather name="target" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="coming-soon-one"
        options={{
          title: "Soon",
          tabBarIcon: ({ color, size }) => (
            <Feather name="sparkles" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <DisabledTabButton {...props} />
          ),
        }}
      />

      <Tabs.Screen
        name="coming-soon-two"
        options={{
          title: "Soon",
          tabBarIcon: ({ color, size }) => (
            <Feather name="more-horizontal" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <DisabledTabButton {...props} />
          ),
        }}
      />
    </Tabs>
  );
}

function DisabledTabButton({
  ...props
}: React.ComponentProps<typeof import("@react-navigation/bottom-tabs").BottomTabBarButton>) {
  return (
    <import("react-native").TouchableOpacity
      {...props}
      disabled
      activeOpacity={1}
      style={[props.style, { opacity: 0.4 }]}
    />
  );
}