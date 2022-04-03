import { StatusBar } from "expo-status-bar";
import { FirebaseError } from "firebase/app";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Context from "../context/Context";
import { signIn, signUp, auth } from "../firebase";
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signIn");
  const [loading, setLoading] = useState(false);
  const {
    theme: { colors },
  } = useContext(Context);

  // console.log(auth);
  async function handlePress() {
    try {
      setLoading(true);
      if (mode === "signUp") {
        await signUp(email, password);
        setLoading(false);
      }
      if (mode === "signIn") {
        await signIn(email, password);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "home",
            },
          ],
        });
      }
      setLoading(false);
    } catch (e) {
      Alert.alert("Error", "An Error Occurred!");

      setLoading(false);
    }
  }
  return (
    <SafeAreaView
      style={{
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <StatusBar backgroundColor="#fff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ minHeight: "100%" }}
      >
        <View
          style={{
            marginTop: 50,
            paddingHorizontal: 30,
            // width: 400,
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: colors.foreground,
              fontSize: 24,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            Welcome to Whatsapp
          </Text>
          <Image
            source={require("../assets/welcome-img.png")}
            style={{ width: 180, height: 180, alignSelf: "center" }}
            resizeMode="cover"
          />
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
                // width: 200,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={{
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
                // width: "100%",
                marginTop: 20,
              }}
            />
            <View style={{ marginTop: 20 }}>
              {loading ? (
                <ActivityIndicator color={colors.foreground} />
              ) : (
                <Button
                  title={mode === "signUp" ? "Sign Up" : "Sign in"}
                  disabled={!password || !email}
                  color={colors.secondary}
                  onPress={handlePress}
                />
              )}
            </View>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() =>
                mode === "signUp" ? setMode("signIn") : setMode("signUp")
              }
            >
              <Text style={{ color: colors.primary }}>
                {mode === "signUp"
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
