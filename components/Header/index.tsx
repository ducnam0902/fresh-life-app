import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import styles from "./index.style";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/color";
import moment from "moment";
import { useAuthStore } from "@/store/authStore";
interface IHeader {
    link: string
}
const Header = ({link}: IHeader) => {
  const { userInfo } = useAuthStore();
  return (
    <View style={styles.header}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{ uri: userInfo?.avatar ?? "" }}
          style={styles.avatar}
          contentFit="cover"
        />
        <View>
          <Text style={styles.title}>Hello, {userInfo?.name}</Text>
          <Text style={styles.dateText}>{moment().format("dddd, MMM DD")}</Text>
        </View>
      </View>
      <Link href={link} asChild>
        <Pressable style={styles.addIcon}>
          <Ionicons name="add" size={26} color={COLORS.colors.background} />
        </Pressable>
      </Link>
    </View>
  );
};

export default Header;
