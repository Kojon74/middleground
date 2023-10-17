import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import CustomTextInput from "../../components/CustomTextInput";
import { fonts } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";
import AuthSwitchScreen, {
  AuthScreenNames,
} from "../../components/AuthSwitchScreen";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={fonts.h1}>Welcome back!</Text>
        <CustomTextInput
          keyboardType="email-address"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          isPass
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton text="Sign in" onPress={handleSignIn} />
        <AuthSwitchScreen screenName={AuthScreenNames.SIGN_IN} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
});
