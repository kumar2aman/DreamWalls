import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface ImageData {
  id: number; // Assuming you have an identifier for each image
  images: string;
}

const Adminlogin = (session: { session: Session }) => {
  const [images, setImages] = useState<ImageData[]>();

  useEffect(() => {
    if (session) FetchImages();
  }, [session]);

  async function FetchImages() {
    const { data, error } = await supabase
      .from("UserImages")
      .select("id, images");
    if (error) {
      Alert.alert("admin cannot get images");
    } else {
      setImages(data);
    }
  }

  async function AllowImages(imageId: number) {
    const { data, error } = await supabase
      .from("UserImages")
      .update({ boolean: true })
      .eq("id", imageId);
    if (error) {
      console.log("kuch error haa at admin panel", error);
    } else {
      Alert.alert("image get uploaded 🙃");
    }
  }

  async function DeleteImage(imageId: number) {
    const { data, error } = await supabase
      .from("UserImage")
      .delete()
      .eq("id", imageId);
  }

  return (
    <ScrollView>
      <View>
        {images?.map((item: ImageData) => {
          return (
            <View key={item.id} className="mt-5">
              <ScrollView>
                <View className="flex-row gap-4 ml-1 ">
                  <Image source={{ uri: item.images }} className="w-56 h-64 rounded-lg" />
                  <View>
                    <View className=" h-10 w-20 bg-blue-400 mt-4  justify-center rounded-xl">
                      <Pressable onPress={() => AllowImages(item.id)}>
                        <Text className="text-center text-base font-semibold">
                          Allow
                        </Text>
                      </Pressable>
                    </View>

                    <View className="bg-red-600 mt-16 h-10 rounded-xl justify-center items-center">
                      <Pressable onPress={() => DeleteImage(item.id)}>
                        <Text className="text-base font-semibold">Delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          );
        })}
        {/* <Text>heelllooo world</Text> */}
      </View>
    </ScrollView>
  );
};

export default Adminlogin;

const AllData = () => {};
