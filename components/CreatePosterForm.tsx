import { h, w } from "@/app/styles/Dimension";
import { Theme } from "@/app/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { useAppState } from "@/app/context";
import { router } from "expo-router";

const CreatePosterForm = () => {
  const [isModal, setIsModal] = useState(false);
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");

  const { name, setName, message, setMessage, image, setImage} = useAppState();

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [_status, _requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const createPost = () => {
    router.navigate('/(screens)/frames')
  };

  const handleCamera = async () => {
    if (!status?.granted) {
       await requestPermission()
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    console.log('called.......')
    if (!_status?.granted) {
        await _requestPermission()
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ fontWeight: "bold", textAlign: "center", margin: 5 }}
              >
                YOUR PHOTO
              </Text>
              <TouchableOpacity
                onPress={() => setIsModal(true)}
                style={styles.photoContainer}
              >
                {!image ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 1,
                      borderWidth: 1,
                      borderStyle: "dashed",
                      borderRadius: 10,
                      borderColor: "#aaa",
                    }}
                  >
                    <Ionicons name="image" size={35} color="#ccc" />
                    <Text style={{ color: "#ccc", fontWeight: "bold" }}>
                      Choose Photo
                    </Text>
                  </View>
                ) : (
                  <Image style={styles.photo} source={{ uri: image }} />
                )}
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.inputContainer}>
                  <Text style={{ fontWeight: "bold", margin: 5 }}>
                    YOUR NAME
                  </Text>
                  <View style={styles.nameContainer}>
                    <TextInput
                      style={{ flex: 1 }}
                      value={name}
                      maxLength={18}
                      placeholder="Type your name"
                      onChangeText={setName}
                    />
                  </View>

                  <Text
                    style={{ margin: 5, marginTop: 25, fontWeight: "bold" }}
                  >
                    YOUR MESSAGE
                  </Text>
                  <View style={styles.messageContainer}>
                    <View style={styles.preMsgContainer}>
                      <Text>USE </Text>
                      <Ionicons name="heart" size={20} color={Theme.primary} />
                      <Text> TO </Text>
                    </View>
                    <TextInput
                      multiline
                      value={message}
                      maxLength={50}
                      placeholder="YOUR MESSAGE"
                      style={{ flex: 1, textAlignVertical: "top" }}
                      onChangeText={setMessage}
                    />
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={createPost}>
                    <View style={{ width: 24 }} />
                    <Text
                      style={{ flex: 1, color: "#fff", textAlign: "center" }}
                    >
                      Proceed
                    </Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>

      <Modal isVisible={isModal}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => setIsModal(false)}
              style={{
                position: "absolute",
                zIndex: 99,
                padding: 15,
                top: 0,
                right: 0,
              }}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <View
              style={{
                height: 80,
                justifyContent: "center",
                backgroundColor: Theme.primary,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 19, fontWeight: "bold", color: "#fff" }}>
                Choose your photo
              </Text>
              <Text style={{ color: "#fff" }}>Photo should be natural</Text>
            </View>
            <View style={{ padding: 20, paddingHorizontal: 25 }}>
              <TouchableOpacity
                style={styles.select}
                disabled={!image}
                onPress={handleCamera}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: image ? "#000" : "#aaa",
                  }}
                >
                  Edit Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.select} onPress={pickImage}>
                <Text style={{ fontSize: 17 }}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.select} onPress={handleCamera}>
                <Text style={{ fontSize: 17 }}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreatePosterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    // marginTop: 20,
    // height: 120,
    height: h * 0.22,
    // width: 150,
    aspectRatio: 3 / 2,
    alignSelf: "center",
    // elevation: 4,
    // backgroundColor: '#fff',
    backgroundColor: Theme.lightGray,
    borderRadius: 10,
    overflow: "hidden",
  },
  photo: {
    // width: 150,
    // height: 150,
    height: h * 0.22,
    aspectRatio: 3 / 2,
  },
  inputContainer: {
    margin: 15,
    // marginHorizontal: 25
    width: w * 0.8,
  },
  nameContainer: {
    height: 50,
    // elevation: 3,
    borderRadius: 10,
    paddingLeft: 15,
    // backgroundColor: "#fff"
    backgroundColor: Theme.lightGray,
  },
  messageContainer: {
    height: 80,
    flexDirection: "row",
    // elevation: 2,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    // backgroundColor: "#fff",
    backgroundColor: Theme.lightGray,
  },
  preMsgContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    // alignItems: 'flex-end',
    margin: 15,
    width: w * 0.8,
  },
  button: {
    padding: 12,
    backgroundColor: Theme.primary,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    // width: Dimensions.get('window').width * 0.4
  },
  select: {
    padding: 10,
    marginTop: 10,
  },
});
