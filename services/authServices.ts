import { SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import { supabase } from "../utils/supabase";

const authServices = {
  // Authentication service functions would be defined here
  signInWithId: async (id: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: id,
    });
    if (error) {
      throw error;
    }
    return data;
  },
  checkSignUpUser: async (email: string) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email);
    if (error) {
      throw error;
    }
    return data?.length === 0;
  },
  getUserByEmail: async (email: string) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email);
    if (error) {
      throw error;
    }
    return data;
  },
  insertUser: async (userData: SignInSuccessResponse) => {
    const { data, error } = await supabase
      .from("Users")
      .insert({
        name: userData.data.user.name,
        email: userData.data.user.email,
        avatar: userData.data.user.photo,
      })
      .select();
    if (error) {
      throw error;
    }
    return data;
  },
};

export default authServices;
