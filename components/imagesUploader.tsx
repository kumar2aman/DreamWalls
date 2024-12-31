import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled) {
      return;
    } else if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;
    try {
      // Get the file extension
      const uriPart = selectedImage.split(".").pop();

      console.log("file update ", uriPart);

      const uri = selectedImage;

      const formData = new FormData();
      const file: File = {
        uri,
        name: `image_${Date.now()}.${uriPart}`,
        type: `image/${uriPart}`,
      } as any;

      formData.append("file", file);

      console.log("uploading images....");

      console.log("selceted image uri:", selectedImage);

      // Upload image
      //
      const { data, error } = await supabase.storage
        .from("wallpapers")
        .upload(`images/${Date.now()}.${uriPart}`, formData);

      //get uploaded Image Url

      const uploadedImagesUrl = await supabase.storage
        .from("wallpapers")
        .getPublicUrl(`${data?.path}`);

      const images = uploadedImagesUrl.data.publicUrl;

      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      await supabase.from("UserImages").insert([{ AuthorId: userId, images }]);

      if (error) {
        Alert.alert("Upload failed", error.message);
      } else {
        Alert.alert("Upload successful, We will verfiy this image and soon it will get uploaded !!!!");
      }
    } catch (error) {
      console.error("error uploading images", error);
      Alert.alert("Upload failed");
    }
  };

  return (
    <View>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default ImageUploader;
