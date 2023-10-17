import { StatusBar, StyleSheet } from "react-native";
import { GlobalProvider } from "./src/context/GlobalContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
