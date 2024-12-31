import React from "react";

import { View, Text, Image, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const HomePage = () => {

const router = useRouter()




  return (
    <View className="flex-1">
      <Image
        source={require("@/assets/images/background.jpeg")}
        className="h-[100%] w-[100%] absolute"
      />

      <Animated.View entering={FadeInDown.duration(600).springify()} className="flex-1">
        <LinearGradient
          className=" absolute h-[55%] w-full bottom-0 "
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View className="justify-end items-center flex-1">
          <Animated.Text
            entering={FadeInDown.duration(700).springify()}
            className="font-bold text-5xl mb-5"
          >
            Dream<Text className="text-pink-400">Walls</Text>
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.duration(800).springify()}
            className="text-xl mb-12 font-bold tracking-normal"
          >
            Inspiration Awaits Behind Every Pixel!
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(900).springify()}>
            <Pressable onPress={()=>router.push("/(tabs)")} className="mb-12  rounded-2xl bg-violet-400 p-5 px-12">
              <Text className=" font-semibold tracking-widest text-base ">
                Let's Explore
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>

      
    </View>
  );
};

export default HomePage;
