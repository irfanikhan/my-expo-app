import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { h, w } from "../styles/Dimension";
import { Theme } from "../styles/Theme";

const AboutPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <AppBar isBack title="About" {...this.props} /> */}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: w * 0.05,
        }}
      >
        <View>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              marginVertical: 15,
              height: 100,
              width: w * 0.7,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <View>
            <Text
              style={{
                lineHeight: 22,
                marginTop: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Create Your Own Poster
            </Text>

            <Text style={{ lineHeight: 30, marginTop: 15, fontSize: 17 }}>
              Make your poster now and share it on your social networks and
              website, or print it out and display it in your schools, offices,
              clinics and hospitals. The posters let you add your own photo and
              a short statement about your commitment to heart health. Plus you
              can enter all of your posters into our awards.
            </Text>

            <Text
              style={{
                lineHeight: 22,
                marginTop: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              World Heart Day
            </Text>

            <Text style={{ lineHeight: 30, marginTop: 15, fontSize: 17 }}>
              We are living in unprecedented times. The COVID-19 pandemic has
              shone a spotlight on the healthcare profession, national
              healthcare systems and our individual responsibilities – for our
              own health and for the vulnerable in society.
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: h * 0.1,
            marginVertical: 20,
          }}
        >
          <Image
            style={{ flex: 1, margin: 10, height: 50 }}
            resizeMode="contain"
            source={require("@/assets/images/lowplat.png")}
          />
          <View style={{ width: 1, backgroundColor: Theme.primary }} />
          <Image
            style={{ flex: 1, margin: 10, height: 50 }}
            resizeMode="contain"
            source={require("@/assets/images/evo.png")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutPage;
