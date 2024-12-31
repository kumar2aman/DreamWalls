import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const Images = () => {



  const items = useLocalSearchParams();
if(!items) console.log("error")
  const filename = (items?.previewURL as String).split("/").pop();
  let imageUrl = items?.largeImageURL as string;
  const filepath = `${FileSystem.documentDirectory}${filename}`;

  //

  const handelDownloadImages = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filepath);

      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        // Save the image to the gallery
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Image saved to gallery");
        console.log("Image saved to gallery!");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <BlurView
      tint="dark"
      intensity={100}
      className="flex-1 justify-center items-center"
    >
      <View className="justify-center items-center gap-12">
        <Image
          className="h-[70%] w-80 rounded-2xl"
          source={{ uri: `${items?.largeImageURL}` }}
        />
        <Pressable
          onPress={handelDownloadImages}
          className="bg-gray-300 px-16 py-4 rounded-2xl"
        >
          <Text className="text-lg tracking-wide font-semibold">Download</Text>
        </Pressable>
      </View>
    </BlurView>
  );
};

export default Images;
