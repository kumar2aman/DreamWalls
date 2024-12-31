import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import AllImages from "@/components/imagesGrid";



















const HomePage = () => {
    const [text, setText] = useState<string>("");
  
    console.log(text);
  
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
  
    return (
      <View style={{ paddingTop }}>
        <View>
          <Text className="font-bold text-4xl ml-2">
            Dream<Text className="text-pink-400">Walls</Text>
          </Text>
        </View>
  
        <View>
          <ScrollView contentContainerStyle={{ gap: 15 }}>
            {/* searchBar    */}
            <View className="flex-row  mt-4 mx-5 justify-between  p-1 mb-4  border rounded-xl border-gray-400 bg-slate-200">
              <View>
                <AntDesign
                  name="search1"
                  style={{ padding: 8 }}
                  size={24}
                  color="black"
                />
              </View>
  
              <TextInput
                onChangeText={(e) => setText(e)}
                className="flex-1 
          rounded-xl"
                placeholder="new wallpaper"
              />
            </View>
          </ScrollView>
        </View>
  
        <ScrollView>
          
          <AllImages search={text} />
        </ScrollView>
  
  
  
  
  
      </View>
    );
  };
  
  export default HomePage;
  