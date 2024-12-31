import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useRouter } from "expo-router";


const AllImages = ({search}:any) => {


const pixabayApi = '46570232-79e16054fd6d944feb3da8f57'

const router = useRouter()

  const [image, useImage] = useState<Array<any>>();

  const data = async () => {

    try {
        const response = await axios.get(
           `https://pixabay.com/api/?key=${pixabayApi}&per_page=50&q=${search}&image_type=all`
         );
          useImage(response.data.hits);
        
    } catch (error) {
       throw error
    }
  
  };

  useEffect(() => {
    data();
  }, [search]);

  return (
    <View className="flex flex-row flex-wrap gap-2 mx-2 mb-24 ">
      {image?.map((e) => (
        <View  key={e.id}>
          <Pressable onPress={()=> router.push({pathname:"/Images", params:{...e}})} >
         
          <Image
            className="h-60 w-40 rounded-xl"
            source={{ uri: e.webformatURL }}
          />
          </Pressable>
         
        </View>
      ))}

      {/* 
        
       <View>
        <Text>No Image was found or server error
        </Text>
       </View>
     
      */}
    </View>
  );
};

export default AllImages;
