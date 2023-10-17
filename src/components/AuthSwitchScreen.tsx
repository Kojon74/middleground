import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../utils/fonts";

enum AuthScreenNames {
  SIGN_UP = "SignUp",
  SIGN_IN = "SignIn",
}

type Props = { screenName: string };

const AuthSwitchScreen = ({ screenName }: Props) => {
  const navigation = useNavigation<any>();

  const text =
    screenName === AuthScreenNames.SIGN_UP
      ? "Have an account? Sign in"
      : "Don't have an account? Sign up";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.replace(
          screenName === AuthScreenNames.SIGN_UP
            ? AuthScreenNames.SIGN_IN
            : AuthScreenNames.SIGN_UP
        )
      }
    >
      <Text style={[fonts.p, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AuthSwitchScreen;
export { AuthScreenNames };

const styles = StyleSheet.create({ text: { textAlign: "center" } });
