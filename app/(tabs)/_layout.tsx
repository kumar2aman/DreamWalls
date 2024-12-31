import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function layout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "black", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="uploadImage"
        options={{
          title: "upload",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="upload" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>

    // <Stack>
    // <Stack.Screen
    //   name='index'
    //   options={{
    //     headerShown:false,

    //   }}

    //   />

    //   <Stack.Screen
    //   name='Images'
    //   options={{
    //     headerShown:false,
    //     presentation:'transparentModal',
    //     animation:'fade'

    //   }}

    //   />
    // </Stack>
  );
}
