import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


interface ImageData {
  images: string;
}

const UserUploads = () => {
  const [allImages, setAllImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {



      const { data, error } = await supabase.from("UserImages").select("images").eq("boolean", true);

      if (error) {
        console.error("error while fetching image", error);
      
      } else {
        console.log("images data", data);
        setAllImages(data);
      }
    };

    fetchImages();
  }, []);

  console.log(allImages);

  return (
    <ScrollView>
    <View>
      {allImages.length > 0 ? (
        allImages.map((item: ImageData, Index: number) => {
          const imagesUri = item.images;
          return (
            <View key={Index}>
              <Image source={{ uri: imagesUri }} className="w-56 h-60" />
            </View>
          );
        })
      ) : (
        <View>
          <Text>Server Error</Text>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

export default UserUploads;
