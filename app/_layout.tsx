import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function Layout() {  // Capitalized for convention
  return (
   <Stack>
  
  <Stack.Screen
  name="(homePage)"
  options={{
    headerShown:false
  }}
  
  />


<Stack.Screen
  name="(tabs)"
  options={{
    headerShown:false
  }}
  
  />


<Stack.Screen
  name="adminDashboard"
  options={{
    headerShown:false
  }}
  
  />





<Stack.Screen
  name="Images"
  options={{
    headerShown:false
  }}
  
  />

   </Stack>
  );
}