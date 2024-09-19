import { PermissionsAndroid, Platform, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

export async function saveImage(tag, callback) {
  // if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //   console.log("no permission");
  //   return;
  // }

  const response = await MediaLibrary.requestPermissionsAsync(true);
  if (!response.granted) return;
  
  MediaLibrary.saveToLibraryAsync(tag)
    .then((res) => {
      console.log(res, " image saved success");

      showAlert(
        "Poster Saved Successfully!",
        "Your Poster has been saved successfully. You can view it in Gallery",
        callback
      );
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
}

export const showAlert = (title, msg, callBack) => {
  Alert.alert(title, msg, [
    { text: "CENCEL", style: "cancel" },
    { text: "OK", onPress: () => callBack() },
  ]);
};
