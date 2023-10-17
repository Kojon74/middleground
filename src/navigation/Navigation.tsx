import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useGlobalContext } from "../context/GlobalContext";
import SignUpScreen from "../screens/SignUp/SignUpScreen";
import SignInScreen from "../screens/SignIn/SignInScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import { colors } from "../utils/colors";
import FeedScreen from "../screens/Feed/FeedScreen";
import ChatListScreen from "../screens/ChatList/ChatListScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const Navigation = () => {
  const { isLoading, isAuthenticated } = useGlobalContext();

  let screens;

  if (isLoading)
    screens = (
      <>
        <MainStack.Screen name="Splash" component={SplashScreen} />
      </>
    );
  else if (!isAuthenticated)
    screens = (
      <>
        <MainStack.Screen name="SignUp" component={SignUpScreen} />
        <MainStack.Screen name="SignIn" component={SignInScreen} />
      </>
    );
  else
    screens = (
      <>
        <MainStack.Screen name="Tabs" component={BottomTabs} />
      </>
    );

  return (
    <NavigationContainer theme={Theme}>
      <MainStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {screens}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="ChatList" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
