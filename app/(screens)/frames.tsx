import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  LayoutChangeEvent,
} from "react-native";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/app/styles/Theme";
import { router } from "expo-router";
import { useAppState } from "../context";

const COLORS = [
  "red",
  "#0cbb06",
  "#ff4f00",
  "deepskyblue",
  "#ffd300",
  "purple",
];

const FramesPage = (props: any) => {
  const { name, message, color, image, setColor } = useAppState();
  const [state, setState] = useState({
    images: [],
    isPreview: false,
    ph: 0,
    firstWord: "",
    restMessage: "",
  });

  console.log(image.uri, '.........uri.........')
  const chooseColor = (color: string) => {
    setColor(color);
    router.navigate('./frame')
    // navigation.navigate("FrameView", {
    //   name: name,
    //   message: message,
    //   image: image,
    //   color: color,
    // });
  };

  useEffect(() => {
    // get first word from message
    var firstWord = message.split(" ")[0];

    // message without first word
    var restMessage = message.substr(message.indexOf(" ") + 1);

    setState({ ...state, firstWord, restMessage });
  }, []);

  const postLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setState({ ...state, ph: height });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <AppBar isBack title="Choose Frame" {...this.props} /> */}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "#fff",
            paddingBottom: 20,
          }}
        >
          {COLORS.map((item, i) => {
            return (
              <View key={i}>
                <View style={{ alignSelf: "center", marginTop: 15 }}>
                  <TouchableOpacity
                    onPress={() => chooseColor(item)}
                    onLayout={postLayout}
                    style={{
                      height: Dimensions.get("window").height * 0.4,
                      aspectRatio: 9 / 12,
                      borderWidth: 15,
                      borderColor: item || Theme.primary,
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: (state.ph - 15) / 2,
                      }}
                      source={{ uri: image }}
                    />

                    <View style={{ flex: 1, padding: 10 }}>
                      <Text
                        textBreakStrategy="simple"
                        style={{
                          fontSize: responsiveFontSize(1.7),
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        USE{" "}
                        <Ionicons
                          name="heart"
                          size={13}
                          color={item || Theme.primary}
                        />{" "}
                        TO{" "}
                        <Text style={{ color: item || Theme.primary }}>
                          {state.firstWord}
                        </Text>{" "}
                        {state.restMessage}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: responsiveFontSize(1.5),
                          textAlign: "right",
                        }}
                      >
                        ({name})
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 5,
                    backgroundColor: "#eee",
                    marginTop: 15,
                  }}
                />
              </View>
            );
          })}
        </ScrollView>

        <Modal
          isVisible={state.isPreview}
          style={{ padding: 0, margin: 0 }}
          coverScreen
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "#fff",
            }}
          >
            <ImageViewer useNativeDriver imageUrls={state.images} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                margin: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  padding: 15,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Theme.primary,
                }}
                // onPress={saveImage}
              >
                <Text style={{ color: "#fff", alignSelf: "center" }}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  padding: 15,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Theme.primary,
                }}
                onPress={() =>
                  setState({ ...state, isPreview: !state.isPreview })
                }
              >
                <Text style={{ color: "#fff", alignSelf: "center" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default FramesPage;
