import React, { Component, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Share,
  LayoutChangeEvent,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/app/styles/Theme";
import { h, w } from "@/app/styles/Dimension";
import { useAppState } from "../context";
import { router } from "expo-router";
import { saveImage } from "../uitls/saveImage";
import * as Sharing from "expo-sharing";

const posterBorder = 15;

interface MessageProps {
  color: string;
  firstWord: string;
  restMessage: string;
}

const Message = ({ color, firstWord, restMessage }: MessageProps) => {
  return (
    <Text
      textBreakStrategy="simple"
      style={{
        // flex: 1,
        fontSize: responsiveFontSize(2.5),
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      USE{" "}
      <Ionicons
        name="heart"
        size={responsiveFontSize(2.5)}
        color={color || Theme.primary}
      />{" "}
      TO <Text style={{ color: color || Theme.primary }}>{firstWord}</Text>{" "}
      {restMessage}
    </Text>
  );
};

const FrameViewPage = () => {
  const viewRef = useRef(null);
  const { name, message, color, image } = useAppState();

  const [state, setState] = useState({
    firstWord: "",
    restMessage: "",
    posterHeight: h,
    bgWhite: false,
    isShare: false,
  });

  const onShot = async () => {
    // viewRef.current?.capture().then((uri) => {
    //   console.log("do something with ", uri);
    //   if (uri) {
    //     saveImage(uri, router.back);
    //   }
    // });

    const localUri = await captureRef(viewRef);
    saveImage(localUri, router.back)

  };

  const onShare = () => {
    setState({ ...state, isShare: true });
    const localUri = captureRef(viewRef).then(res => {
      Sharing.shareAsync(res, {
        mimeType: "image/jpeg",
        UTI: "image/jpeg",
      }).then(() => {
        console.log('Shared success!')
      }).catch(err => {
        console.log(err, 'erro while sharing')
      })
    }).catch(err => {
      console.log(err, 'err while capturing')
    })

    // viewRef.current?.capture().then((uri) => {
    //   const options = {
    //     title: "Share your poster",
    //     type: "image/jpeg",
    //     url: uri,
    //   };
    //   Sharing.shareAsync(uri, {
    //     mimeType: "image/jpeg",
    //     UTI: "image/jpeg",
    //   })
    //     .then((res) => {
    //       console.log(res, " shared successfully");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   // Share.open(options)
    //   //   .then((res) => {
    //   //     console.log(res, "#####");
    //   //     // this.props.navigation.navigate("Home");
    //   //   })
    //   //   .catch((err: Error) => {
    //   //     console.log(err);
    //   //   });
    // });
  };

  useEffect(() => {
    // get first word from message
    var firstWord = message.split(" ")[0];

    // message without first word
    var restMessage = message.substr(message.indexOf(" ") + 1);

    setState({ ...state, firstWord, restMessage });
  }, []);

  const _posterLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setState({ ...state, posterHeight: height });
  };

  const logoHeight = state.posterHeight / 12;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: state.bgWhite ? "#fff" : "#000",
        }}
      >
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={router.back} style={{ padding: 15 }}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={state.bgWhite ? "#000" : "#fff"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setState({ ...state, bgWhite: !state.bgWhite })}
            style={{ padding: 20 }}
          >
            <Ionicons
              name="heart-half"
              size={26}
              color={state.bgWhite ? "#000" : "#fff"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, width: w * 0.8, alignSelf: "center" }}>
          <ViewShot
            ref={viewRef}
            options={{
              format: "jpg",
              quality: 0.9,
              result: state.isShare ? "data-uri" : "tmpfile",
            }}
          >
            <View
              onLayout={_posterLayout}
              style={{
                aspectRatio: 0.67,
                borderWidth: posterBorder,
                borderColor: color || Theme.primary,
              }}
            >
              <View>
                <Image
                  style={{
                    height: (state.posterHeight - posterBorder) / 2,
                  }}
                  source={{ uri: image }}
                />
              </View>

              <View style={{ flex: 1, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flex: 1 }}>
                  <Message color={color} {...state} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      textAlign: "right",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    ({name})
                  </Text>
                </View>

                <View
                  style={{
                    margin: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={require("@/assets/images/logo.png")}
                    style={{
                      height: logoHeight,
                      width: logoHeight + logoHeight,
                      marginRight: 15,
                      resizeMode: "contain",
                    }}
                  />

                  <Image
                    source={require("@/assets/images/evo.png")}
                    style={{
                      height: logoHeight,
                      width: logoHeight + logoHeight,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            </View>
          </ViewShot>
        </View>

        <View
          style={{
            width: w,
            bottom: 0,
            paddingVertical: 20,
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: state.bgWhite
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0,0,0, 0.5)",
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              width: w * 0.35,
              backgroundColor: Theme.primary,
              borderRadius: 50,
              padding: 10,
              paddingHorizontal: 20,
            }}
            onPress={onShare}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              width: w * 0.35,
              backgroundColor: Theme.primary,
              borderRadius: 50,
              padding: 10,
              paddingHorizontal: 20,
            }}
            onPress={onShot}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FrameViewPage;
