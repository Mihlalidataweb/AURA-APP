import { Tabs } from "expo-router";
import { Home, HelpCircle, MessageCircle, MapPin } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00ffff",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#00ffff",
          borderTopWidth: 1,
          shadowColor: "#00ffff",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Self-Help",
          tabBarIcon: ({ color }) => <HelpCircle color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Support",
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: "Tech Track",
          tabBarIcon: ({ color }) => <MapPin color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
