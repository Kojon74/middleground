import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { auth, db } from "../../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import { fonts } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";
import AuthSwitchScreen, {
  AuthScreenNames,
} from "../../components/AuthSwitchScreen";

const SignUpScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = async () => {
    if (isFormValid()) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "users", cred.user.uid), {
        dateCreated: Timestamp.fromDate(new Date()),
        username,
      });
      updateProfile(cred.user, { displayName: username });
    }
  };

  const isFormValid = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={fonts.h1}>Create an account</Text>
        <CustomTextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
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
        <CustomTextInput
          isPass
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error && <Text style={fonts.error}>{error}</Text>}
        <CustomButton text="Sign up" onPress={handleSignUp} />
        <AuthSwitchScreen screenName={AuthScreenNames.SIGN_UP} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
});
