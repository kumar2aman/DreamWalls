import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function Account({ session }: { session: Session }) {
  const [username, setUsername] = useState<string | null>();
  const [admin, setAdmin] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const router = useRouter();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    if (!session.user.id) {
      console.log("no data is found");
      return;
    }

    setTimeout(async () => {
      const { data, error } = await supabase
        .from("UserData")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setUsername(data.username);
      }
    }, 1000);

    const userId = session.user.id;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (data) {
      // Check if the role is 'admin'
      const adminStatus = data && data.role === "admin";
      setAdmin(adminStatus);
    }
  }

  return (
    <View style={{ paddingTop }}>
      <ScrollView>

    
      <View>
        <Text className="font-bold text-4xl ml-2 ">
          Dream<Text className="text-pink-400">Walls</Text>
        </Text>
      </View>
      <View className="flex-col gap-y-5 mt-1 justify-center items-center mb-10">
        <View>
          <Image
            className="rounded-full h-[80px] w-[80px] bg-center"
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </View>
        <View>
          <Text className="font-bold text-lg text-center">
            {username ? `Hello, ${username}` : "Loading..."}
          </Text>
        </View>
      </View>

      <View className="flex-col items-center gap-4 rounded-xl">
        <View className="flex-row border h-16 w-72 rounded-lg justify-center items-center gap-x-2">
          <Pressable>
            <Text className="text-center font-bold text-xl text-gray-700">
              Uploaded Images
            </Text>
          </Pressable>
        </View>

        <View className="border h-16 w-72 rounded-lg p-3 justify-center">
          <Pressable>
            <Text className="text-center font-bold text-xl">
              About DreamWalls
            </Text>
          </Pressable>
        </View>
        {admin ? (
        <View className="border h-12 w-72 rounded-lg p-3 justify-center">
          <Pressable onPress={()=> router.push("/adminDashboard")}>
          <Text className="text-center text-black font-bold">Admin Dashboard 🥸</Text>
          </Pressable>
          
        </View>
      ) : null}
      </View>

   

      <View className="flex-col items-center rounded-xl mt-24">
        <View className="border h-16 w-72 justify-center items-center">
          <Pressable onPress={() => supabase.auth.signOut()}>
            <Text className="text-center font-bold text-xl text-gray-700">
              Logout {"-->"}
            </Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
