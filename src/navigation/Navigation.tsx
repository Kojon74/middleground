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
import { fonts } from "../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: fonts.ps,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 solid name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: "Discussion",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 solid name="comments" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 solid name="user" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
